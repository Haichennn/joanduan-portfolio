# Interview Me — RAG Retrieval Evaluation: Baseline v1

**Date**: 2026-05-24  
**System**: joanduan.dev Interview Me chat (RAG-powered)  
**Config version**: `v1-baseline`  
**Ground truth version**: `v1-2026-05-24`  
**KB size**: 15 chunks (8 projects, 4 skills, 3 reflections)  
**Query set**: 17 hand-labeled queries across 3 personas  
**Embedding model**: voyage-3 (1024-dim)  
**Retrieval**: cosine similarity, top-5  

---

## TL;DR

Built a retrieval evaluation pipeline on a hand-labeled 17-query ground truth set. Baseline Recall@5 is **89.2%**, MRR is **0.887** — within the typical range of well-tuned small-KB RAG systems on public benchmarks.

The headline finding is the **gap between Recall@1 (52%) and Recall@5 (89%)**: relevant chunks are almost always in the top-5, but ranking is unreliable in the top-1 position. This is a re-ranking problem, not a recall problem.

The second finding is **persona variance**: technical-interviewer queries (with strong keyword anchors like project names) achieve R@1 = 70%, while recruiter queries (abstract synthesis like "top thing you've built") drop to R@1 = 25%. This is the kind of retrieval gap a single aggregate metric would have hidden.

---

## Methodology

### Ground truth construction

Each query was hand-labeled with up to 3 "relevant" chunk IDs — chunks an ideal answer should draw on. Labels reflect my judgment as both the KB author and the system's intended user. Queries were grouped into three personas to surface persona-conditional retrieval behavior:

- **HR / interviewer** (n=8): general background questions ("Tell me about your X project", "Why did you choose Y")
- **Technical interviewer** (n=5): implementation depth questions ("How did you handle malformed JSON", "Walk me through your agent orchestration")
- **Recruiter** (n=4): synthesis questions ("Top thing built", "Why hire you")

One query (Q13: "How do you approach evaluating retrieval quality in a RAG system?") was deliberately included as an **expected-to-fail** case — the KB has no dedicated chunk for the RAG evaluation infrastructure itself yet. Including this query exercises the system's gap-surfacing behavior.

### Metrics

- **Recall@k** = (number of relevant chunks in top-k) / (total relevant chunks). Reported at k = 1, 3, 5.
- **MRR (Mean Reciprocal Rank)** = mean of 1/rank, where rank is the position of the first relevant chunk in the retrieval. 0 if no relevant chunk in top-5.
- All metrics are macro-averaged across queries (each query contributes equally regardless of how many relevant chunks it has).

### Retrieval flow

Identical to the production `app/api/interview-me/route.ts` flow:

1. Embed query via Voyage `voyage-3` with `input_type: 'query'`.
2. Compute cosine similarity against pre-embedded chunks in `knowledge-base-embedded.json` (also `voyage-3`, `input_type: 'document'`).
3. Sort descending, take top-5.

No re-ranking, no MMR, no metadata filtering. This is the simplest possible RAG retrieval — establishing a clean baseline before introducing any optimization.

---

## Aggregate results

### Overall (n = 17, including expected-to-fail)

| Metric | Value |
|---|---|
| Recall@1 | 52.0% |
| Recall@3 | 85.3% |
| Recall@5 | 89.2% |
| MRR | 0.887 |

### Excluding expected-to-fail (n = 16)

| Metric | Value |
|---|---|
| Recall@1 | 52.1% |
| Recall@3 | 87.5% |
| Recall@5 | 91.7% |
| MRR | 0.880 |

The expected-to-fail query did not pull aggregate metrics down significantly — it actually scored RR = 1.00 because `skill-llm-integration` (a generalist chunk) is in the relevant set and happens to be retrieved first. The "failure" is more subtle: the other ground-truth chunk (`project-joanduan-dev`) is absent from top-5. See Q13 in the per-query section.

### By persona

| Persona | n | R@1 | R@3 | R@5 | MRR |
|---|---|---|---|---|---|
| HR | 8 | 54.2% | 91.7% | 91.7% | 0.917 |
| Technical | 5 | **70.0%** | 90.0% | 90.0% | **1.000** |
| Recruiter | 4 | **25.0%** | 66.7% | 83.3% | **0.688** |

Technical queries dominate; recruiter queries lag by a wide margin on R@1.

---

## Findings

### Finding 1: Recall@1 to Recall@5 gap is the central failure mode

Recall@5 of 89% means the right chunk is *almost always* in the candidate set. Recall@1 of 52% means the ranking within that candidate set is roughly a coin flip. For a streaming RAG chat where the top retrieval has the largest influence on the LLM's first-line answer, this is the most user-visible failure pattern.

**This is a re-ranking problem, not a retrieval recall problem.** A second-stage re-ranker (e.g. Voyage's reranker, or an LLM-as-judge re-rank on the top-5) is the natural next experiment.

### Finding 2: Recruiter queries are the worst-served persona

Recruiter queries dropped to R@1 = 25% and MRR = 0.69. Inspection (Q14, Q15) shows the failure pattern: abstract synthesis queries ("What's the top thing you've built recently?", "Why should we hire you?") have no strong keyword anchor to a single project or skill, so the embedding gets pulled toward general reflection chunks (`reflection-why-i-build`, `reflection-team-fit`) instead of the concrete projects an ideal answer would draw from.

This is a known limitation of single-vector cosine retrieval — **vague, high-level queries retrieve vague, high-level chunks** even when the user's information need is specific. Possible mitigations: (a) query expansion (use the LLM to rephrase abstract queries into multiple concrete sub-queries before retrieving), (b) hybrid retrieval (combine dense embeddings with sparse BM25), (c) prompt-engineered query rewriting at the API layer.

### Finding 3: Project chunks lose to reflection / skill chunks on direct project queries

Q1 ("Tell me about your WayBack project") retrieved `project-wayback` at rank 3, behind `reflection-why-i-build` (0.373) and `skill-tech-business-bridge` (0.351). The project chunk scored 0.328.

The likely cause: project chunks are STAR-structured narratives (~1500 tokens) optimized for downstream LLM answer quality. Reflection and skill chunks are denser, more thesis-statement-heavy, and contain higher per-token thematic relevance. Cosine similarity rewards the denser format.

This is a **chunk design vs. retrieval trade-off**: the format that gives the LLM the best raw material for an answer is not the format that gets retrieved first. Two responses are possible: re-engineer chunks toward higher topical density, or add a re-ranker that compensates. The latter preserves the answer-quality wins of long-form chunks while fixing retrieval order, which is the path I'd test first.

### Finding 4: KB gap on RAG evaluation surfaced cleanly

Q13 ("How do you approach evaluating retrieval quality in a RAG system?") retrieved `skill-llm-integration` at rank 1 — a generalist chunk that mentions LLM application work but contains no specific content on retrieval evaluation. The system "answered" the query by reaching for the nearest available chunk, which masks the fact that the KB has no actual content on the evaluation pipeline itself.

This is precisely the failure mode the labeled set is designed to catch. **Without ground-truth labeling, this query would have looked like a success in production logs** (the LLM would generate something plausible from the generalist chunk). With ground truth, the missing-content gap is visible.

Action item: add a `skill-rag-evaluation` chunk to the KB describing this evaluation work, then re-run the eval. Expected outcome: Q13 R@3 jumps from 50% to 100%, aggregate Recall@3 rises by ~3 percentage points.

---

## Next experiments (post-baseline)

Listed in priority order. Each comes with the metric movement I expect — concrete predictions on a labeled baseline are the value of having the eval pipeline in the first place.

1. **Add the missing `skill-rag-evaluation` chunk.** Closes Q13 specifically; raises aggregate Recall@3 by ~3pp. Highest-ROI fix because KB additions also benefit downstream LLM answer quality, not just retrieval metrics.

2. **Second-stage re-ranker (Voyage reranker on top-5).** Expected to lift Recall@1 from 52% to 70-80% with no change to Recall@5. Directly addresses Finding 1. Adds ~150ms latency in the hot path; logged via `config_version` for A/B comparison against the no-rerank baseline.

3. **Query rewriting for recruiter persona.** When a query is detected as abstract / synthesis-shaped, expand it into 2-3 concrete sub-queries via LLM rewriting before retrieval. Expected to lift recruiter R@1 from 25% toward HR's 54%. Addresses Finding 2.

4. **LLM-as-judge faithfulness eval.** Beyond retrieval, evaluate whether the assistant's generated response is grounded in the retrieved chunks (no hallucinated facts). Requires labeling the *responses*, not just the retrieval. Complementary metric to recall.

5. **Chunking strategy A/B.** Test current STAR-format chunks vs. denser one-paragraph summaries of each project. Addresses Finding 3. Tradeoff between answer-quality wins and retrieval-order wins; the eval pipeline lets me actually measure both sides.

Each experiment will be tagged with a new `config_version` value (`v2-rerank-voyage`, `v3-query-rewrite-recruiter`, etc.) and logged through the production `conversations` table, so live traffic also contributes to the comparison data.

---

## Reproducibility

Run the eval:
```bash
npm run eval:retrieval
```

Outputs:
- Console: per-query retrieval traces + aggregate metrics
- `scripts/eval/results/eval-v1-baseline-<timestamp>.json`: full per-query results with retrieved chunks, similarity scores, and computed metrics

Source:
- Ground truth: `scripts/eval/ground-truth.json`
- Eval script: `scripts/eval/eval-retrieval.ts`
- KB: `app/lib/knowledge-base-raw.ts` (source) → `app/lib/knowledge-base-embedded.json` (embedded)

Cost per full eval run: ~$0.0005 (17 Voyage API calls).

---

## Acknowledgments

This evaluation is a personal RAG infrastructure project for joanduan.dev's Interview Me chat. The methodology follows standard information retrieval practices (Recall@k, MRR) on a manually labeled small-domain query set. The KB content describes my own portfolio and is hand-authored.
