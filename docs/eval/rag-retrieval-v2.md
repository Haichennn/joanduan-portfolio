# Interview Me: RAG Retrieval Evaluation v2

**Date**: 2026-09-26  
**System**: joanduan.dev Interview Me chat (RAG-powered)  
**Config version**: `v2-17-chunks`  
**Ground truth version**: `v1-2026-05-24` (unchanged)  
**KB size**: 17 chunks (9 projects, 1 experience, 4 skills, 3 reflections)  
**Query set**: same 17 hand-labeled queries across 3 personas  
**Embedding model**: voyage-3 (1024-dim)  
**Retrieval**: cosine similarity, top-5  
**Compared against**: `scripts/eval/results/eval-v1-baseline-2026-05-24T20-45-54-940Z.json` (15 chunks)  
**This run**: `scripts/eval/results/eval-v2-17-chunks-2026-09-26T15-43-49-028Z.json`

All results in this doc refer to the knowledge base as embedded on 2026-09-26; the IVI chunk text was later corrected (overlap 0.112 instead of 0.116, cost wording) and not re-evaluated.

---

## TL;DR

**Headline (ground truth v2, 21 queries):** Hit@1 81.0%, Hit@5 95.2% (20 of 21 queries have a relevant chunk in the top 5), MRR 0.873. This is a small, self-labeled test set, so these numbers are indicative, not a benchmark. Details in "Results with ground truth v2".

**Under ground truth v1 (17 queries), comparing knowledge base versions:** Recall@3 fell from 85.3% to 82.4% and Recall@5 from 89.2% to 84.3%. Recall@1 (52.0%) and MRR (0.887) did not change. The whole drop comes from two recruiter queries, Q15 and Q17; the other 15 queries have identical per-query metrics.

The two drops have different causes:

- **Q15**: the new `experience-bmw-group-internship` chunk entered the top-5 at 0.3190 and pushed out the ground-truth chunk `skill-tech-business-bridge`, which scored 0.3187 in v1. The margin is 0.0003, smaller than the run-to-run variation of up to 0.0013 observed later, so this change may be noise.
- **Q17**: no new chunk overtook a ground-truth chunk. The rewritten `reflection-team-fit` chunk scored lower for this query and dropped out of the top-5.

Neither case shows a clear retrieval regression. Both involve ground-truth labels that were written for the 15-chunk knowledge base. The ground truth now looks outdated in a few places (see "Ground truth v2 (applied)" at the end), but that is a hypothesis this run cannot prove.

Separately, Q14 ("What's the top thing you've built recently?") does not retrieve the most recent project, `project-ivi-defect-triage`, in its top-5. That is a real retrieval gap, but it did not change any metric, because the ground truth does not list that chunk.

---

## What changed between runs

**Knowledge base (15 to 17 chunks)**

- Added `project-ivi-defect-triage`.
- Added `experience-bmw-group-internship` (new chunk type `experience`).
- Rewrote the texts of `reflection-team-fit`, `skill-llm-integration` and `project-agi-pipeline`.
- All other chunk texts are unchanged.

**Unchanged**

- Ground truth: `v1-2026-05-24`, same 17 queries, same relevant labels, same expected-to-fail flag on Q13.
- Eval script scoring logic, embedding model, top-k.

This paragraph compares the v1 baseline run (2026-05-24) with the `v2-17-chunks` run (2026-09-26, 15:43 UTC). Between those two runs, scores for chunks whose text did not change are almost identical. Of 52 score pairs for such chunks that appear in both top-5 lists, 50 are identical (for example `project-wayback` scores 0.3278 on Q1 in both). The other two, both on Q12, differ by up to 0.00042.

A later pair of runs on the same knowledge base shows more variation. The `v2-17-chunks` run and the `v2-17-chunks-gt2` run (16:04 UTC) used the same `knowledge-base-embedded.json` (last written before the 15:43 run finished). Yet on Q5, Q16 and Q17, every shared score differs, by up to 0.0013. The eval script requests a fresh query embedding from the Voyage API on every run and caches nothing. Because the shifts are per query, not per chunk, the likely source is small variation in the returned query embeddings. This was inferred from the script and the file timestamps, not tested.

So run-to-run noise of up to about 0.0013 has to be assumed. Differences smaller than that, including the Q15 case below, cannot be attributed to the knowledge base changes with confidence.

**Note on a third result file.** `eval-v1-baseline-2026-09-26T15-41-49-401Z.json` is an earlier 17-chunk run from the same day, written before the run label option existed. It has the same aggregates and the same rankings as the v2 run. Its only differences are the `project-agi-pipeline` scores on Q3, Q9 and Q12 (up to 0.0046 apart), which fits with that chunk being re-embedded after a text edit between the two runs. This doc uses the v2 file.

---

## Aggregate results

### Overall (n = 17, including expected-to-fail)

| Metric | v1 (15 chunks) | v2 (17 chunks) |
|---|---|---|
| Recall@1 | 52.0% | 52.0% |
| Recall@3 | 85.3% | 82.4% |
| Recall@5 | 89.2% | 84.3% |
| MRR | 0.887 | 0.887 |

### Excluding expected-to-fail (n = 16)

| Metric | v1 (15 chunks) | v2 (17 chunks) |
|---|---|---|
| Recall@1 | 52.1% | 52.1% |
| Recall@3 | 87.5% | 84.4% |
| Recall@5 | 91.7% | 86.5% |
| MRR | 0.880 | 0.880 |

### By persona

| Persona | n | R@1 v1 / v2 | R@3 v1 / v2 | R@5 v1 / v2 | MRR v1 / v2 |
|---|---|---|---|---|---|
| HR | 8 | 54.2% / 54.2% | 91.7% / 91.7% | 91.7% / 91.7% | 0.917 / 0.917 |
| Technical | 5 | 70.0% / 70.0% | 90.0% / 90.0% | 90.0% / 90.0% | 1.000 / 1.000 |
| Recruiter | 4 | 25.0% / 25.0% | 66.7% / 54.2% | 83.3% / 62.5% | 0.688 / 0.688 |

Percentages are rounded to one decimal, as in the v1 doc. Persona values are macro-averages of the per-query values in each result file.

---

## Per-query changes

Only two queries changed in any metric (R@1, R@3, R@5 or RR).

### Q15 (recruiter): "Why should we hire you for an AI internship?"

Relevant: `skill-llm-integration`, `skill-tech-business-bridge`, `reflection-why-i-build`

| Metric | v1 | v2 |
|---|---|---|
| R@1 | 0 | 0 |
| R@3 | 0 | 0 |
| R@5 | 0.667 | 0.333 |
| RR | 0.25 | 0.25 |

| Rank | v1 | v2 |
|---|---|---|
| 1 | reflection-team-fit (0.4927) | reflection-team-fit (0.5097) |
| 2 | reflection-why-wirtschaftsinformatik (0.3996) | reflection-why-wirtschaftsinformatik (0.3996) |
| 3 | project-repolens (0.3365) | project-repolens (0.3365) |
| 4 | **reflection-why-i-build (0.3347)** | **reflection-why-i-build (0.3347)** |
| 5 | **skill-tech-business-bridge (0.3187)** | experience-bmw-group-internship (0.3190) |

- **Entered**: `experience-bmw-group-internship` at rank 5.
- **Left**: `skill-tech-business-bridge`, a ground-truth chunk.
- **Explanation**: `skill-tech-business-bridge` did not change, and it scored 0.3187 in v1. The new internship chunk scores 0.3190, so it takes rank 5 by 0.0003. This is a new chunk ranking above a ground-truth chunk by a very small margin. **The margin is smaller than the observed run-to-run variation (up to 0.0013), so the Q15 change may be noise rather than an effect of the new chunk.** Two points weigh in opposite directions. The three chunks whose text did not change and that appear in both top-5 lists (`reflection-why-wirtschaftsinformatik`, `project-repolens`, `reflection-why-i-build`) score identically in both runs, which suggests Q15's query embedding did not drift in this pair. But the v2 score of `skill-tech-business-bridge` is not in the result file, so the 0.0003 margin compares a v1 score with a v2 score. The rewritten `reflection-team-fit` stays at rank 1 with a slightly higher score. `skill-llm-integration` (also relevant, also rewritten) is not in the top-5 in either run.

### Q17 (recruiter): "Tell me about a project where you had to navigate teamwork challenges"

Relevant: `project-wayback`, `reflection-team-fit`

| Metric | v1 | v2 |
|---|---|---|
| R@1 | 0.5 | 0.5 |
| R@3 | 1 | 0.5 |
| R@5 | 1 | 0.5 |
| RR | 1 | 1 |

| Rank | v1 | v2 |
|---|---|---|
| 1 | **project-wayback (0.3566)** | **project-wayback (0.3566)** |
| 2 | **reflection-team-fit (0.3256)** | skill-llm-integration (0.3283) |
| 3 | skill-llm-integration (0.3246) | project-repolens (0.3061) |
| 4 | project-repolens (0.3061) | experience-bmw-group-internship (0.3033) |
| 5 | reflection-why-i-build (0.2949) | reflection-why-i-build (0.2949) |

- **Entered**: `experience-bmw-group-internship` at rank 4.
- **Left**: `reflection-team-fit`, a ground-truth chunk.
- **Explanation**: in v2, `reflection-team-fit` scores below 0.2949 (the rank-5 score); the result file does not record its exact score. Even without the new internship chunk, it would still be outside the top-3, because `skill-llm-integration` (0.3283) and `project-repolens` (0.3061) outscore it. So the cause is the rewrite of `reflection-team-fit`, not the added chunk. **Margin against the same noise threshold:** `reflection-team-fit` falls from 0.3256 (rank 2) to below 0.2949, and the v2 rank-3 score is 0.3061. So for Recall@3 it is at least 0.0112 below the cutoff, several times the observed variation of up to 0.0013. The Recall@3 change is therefore unlikely to be noise. For the Recall@5 change, the result file only shows that the chunk is below the rank-5 score of 0.2949, so its margin there cannot be determined. Q17 is also one of the queries whose scores shifted between the 15:43 and 16:04 runs (by up to 0.0013), without any change in ranking. The rewrite focuses on role type, company type and availability. Neither the old nor the new text describes a project with teamwork challenges.

### Queries with unchanged metrics but changed top-5 lists

These did not move any metric, but they show where the new or rewritten chunks now surface:

- `project-ivi-defect-triage` enters the top-5 as a non-relevant chunk in Q2 (rank 4), Q4 (rank 4), Q9 (rank 4), Q11 (rank 4), Q12 (rank 3) and Q13 (rank 2, score 0.4639).
- `experience-bmw-group-internship` enters the top-5 as a non-relevant chunk in Q3 (rank 3), Q6 (rank 5), Q15 and Q17.
- `reflection-team-fit` scores lower after the rewrite on several queries. Q8, where it is the only relevant chunk, goes from 0.4943 to 0.4221 but stays at rank 1. Q5 goes from rank 2 to rank 5.
- Q14 swaps `reflection-team-fit` at rank 5 for `project-wayback` at rank 4. `project-ivi-defect-triage` is not in its top-5 (the rank-5 score is 0.3578).

---

## Interpretation

What the per-query comparison supports:

1. **The drop is confined to two recruiter queries.** HR and technical persona metrics are identical. R@1 and MRR did not change, so no query lost its top-ranked relevant chunk.
2. **Q15 is a new chunk displacing a ground-truth chunk, by 0.0003, which is within observed run-to-run variation and may be noise.** Whether the internship chunk is relevant to "Why should we hire you for an AI internship?" is debatable. It is an internship, but its content is data and platform work, not AI. A margin this small also means any small text edit to either chunk could flip the result back.
3. **Q17 is a rewritten chunk losing similarity, not a new chunk ranking above.** The label `reflection-team-fit` for a question about "a project where you had to navigate teamwork challenges" is weak for both the old and the new text, because the chunk is a preference statement, not a project.
4. **Several labels look outdated relative to the knowledge base.** `project-ivi-defect-triage` ranks second on Q13, a question about evaluating retrieval quality, and its content is a retrieval evaluation study. `reflection-team-fit` ranks first on Q15 and contains a section on what I would commit to if hired. Neither chunk is labeled relevant. This did not cause the drop, but it means the v1 labels no longer describe what an ideal answer would use.

**Hypothesis, not a proven conclusion:** the v2 numbers mostly reflect a ground truth written for a 15-chunk knowledge base, not a worse retriever. Testing this needs a revised ground truth, evaluated against both knowledge base versions if possible, and the revision must be justified on chunk content, not on which labels make the numbers go up.

**Genuine retrieval gap:** Q14 ("What's the top thing you've built recently?") does not retrieve `project-ivi-defect-triage`, the most recent project in the knowledge base (dated September 2026), in its top-5. `reflection-why-i-build` still ranks first at 0.4988, the same abstract-query pattern the v1 doc described in Finding 2. This gap is invisible in the v1 ground truth because the chunk did not exist when the labels were written.

---

## Reproducibility

```bash
npm run eval:retrieval -- --label v2-17-chunks
```

Outputs `scripts/eval/results/eval-v2-17-chunks-<timestamp>.json`. Without `--label`, the run label defaults to the ground truth's `config_version` (`v1-baseline`).

---

## Ground truth v2 (applied)

**Status**: applied on 2026-09-26 as a new file, [`scripts/eval/ground-truth-v2.json`](../../scripts/eval/ground-truth-v2.json) (version `v2-2026-09-26`, config version `v2-gt2`, 21 queries). The v1 file `scripts/eval/ground-truth.json` is unchanged and remains the default for `npm run eval:retrieval`.

This section was first written as a proposal, before any eval ran against it. Each change is justified on chunk content. Several of them move the metrics in either direction; that is a consequence, not the reason.

**Results under ground truth v1 and v2 are not directly comparable.** The query set, the relevant labels and the expected-to-fail handling all differ. Every comparison between knowledge base versions has to use the same ground truth.

**Scoring side effect of four relevant chunks.** Recall@k divides by the number of relevant chunks. Q14 and Q15 now have four relevant chunks each, so their Recall@1 can be at most 0.25 and their Recall@3 at most 0.75, even with perfect ranking. In v1, no query had more than three relevant chunks. The scoring logic is unchanged; this only affects how the Q14 and Q15 numbers should be read.

### Changes to existing queries

**Q13: "How do you approach evaluating retrieval quality in a RAG system?"**
- **Add `project-ivi-defect-triage`: yes.** The chunk is a retrieval evaluation study: a raw-text control, a saturated Recall@3, overlap and margin as the discriminating metrics, and a documented mistake of evaluating on the wrong similarity path. An ideal answer on how I evaluate retrieval quality would draw on it.
- **Remove `expected_to_fail`: yes.** The flag's note says the KB has no chunk on RAG evaluation. That is no longer true in substance: `project-ivi-defect-triage` covers retrieval evaluation methodology, and `skill-llm-integration` now describes the custom retrieval evaluation (ground truth set, Recall@k, MRR). There is still no chunk on the Interview Me eval pipeline in detail, so the query may still underperform. It should be scored normally, though, not excluded.
- **Remove `project-joanduan-dev`: yes (applied).** The chunk only mentions Interview Me as a placeholder being upgraded to RAG and contains no evaluation content.

**Q14: "What's the top thing you've built recently?"**
- **Add `project-ivi-defect-triage`: yes.** It is the most recent project in the knowledge base (September 2026), finished and public, and describes a pipeline and a tool-use agent that were built. "Top" is subjective, but an honest answer to "recently" would include it. This will likely lower Q14's recall, because the chunk is not in the current top-5. That is the correct way to surface the gap.
- **Do not add `experience-bmw-group-internship`.** The tool described there is still in development, and the chunk's own notes restrict answers to its stated facts. It is not a "thing I built" in the sense of this query.

**Q15: "Why should we hire you for an AI internship?"**
- **Add `reflection-team-fit`: yes.** The chunk contains "What I want to contribute", "What I'm committing to if you hire me" and availability. That is direct material for a "why hire you" answer, and it already ranks first.
- **Add `experience-bmw-group-internship`: no.** The query is about an AI internship. The chunk describes data cleansing, migration and platform work with Oracle APEX and PL/SQL, and contains no AI or ML work. It is useful background for a general "why hire you" question, but labeling it relevant here would reward retrieval of a chunk that does not answer the AI part.

**Q17: "Tell me about a project where you had to navigate teamwork challenges"**
- **Add `experience-bmw-group-internship`: no.** The chunk describes clarifying requirements with management, order coordination and shop-floor users, which is stakeholder work, not a teamwork challenge. It is also restricted to its stated facts, so an answer built on it could not go into any challenge in detail.
- **Keep `reflection-team-fit`: no, remove it (applied).** Order of events: the Q17 drop was observed first, in the v2 run under ground truth v1 (R@3 and R@5 from 1 to 0.5). The label was removed afterwards, in ground truth v2. The justification rests on chunk content only: the query asks for a project with teamwork challenges, and the chunk is a preference statement about roles, company types and availability that contains no project or challenge. The old text did not describe a teamwork challenge either. This change raises Q17's metrics, which is why the order of events is stated here.

### New queries covering the new chunks

| ID | Persona | Query | Relevant chunks |
|---|---|---|---|
| Q18 | technical | Have you ever run a controlled experiment on an embedding retrieval pipeline? | project-ivi-defect-triage |
| Q19 | hr | What are you working on in your current internship? | experience-bmw-group-internship |
| Q20 | technical | Have you worked with Oracle databases or PL/SQL? | experience-bmw-group-internship |
| Q21 | recruiter | What industry experience do you have? | experience-bmw-group-internship |

- **Q18** avoids the project name and the words "duplicate" and "symptom", so it tests whether the ablation content is found from a methodology question, not from a keyword match.
- **Q19** is the most likely real question about the new experience entry.
- **Q20** tests retrieval of the internship chunk from a technology question. The Oracle stack appears only in that chunk.
- **Q21** was added because the recruiter persona had only four queries and was the weakest group in both runs, so one more recruiter query makes that group less dependent on single queries.

Persona counts in ground truth v2: HR 9 (Q1 to Q8, Q19), technical 7 (Q9 to Q13, Q18, Q20), recruiter 5 (Q14 to Q17, Q21). No query is flagged as expected to fail, so the "excluding expected-to-fail" aggregate will equal the overall aggregate.

### Run command

```bash
npm run eval:retrieval -- --label v2-17-chunks-gt2 --ground-truth scripts/eval/ground-truth-v2.json
```

---

## Metric note: Hit@k

Recall@k divides the number of relevant chunks in the top k by the total number of relevant chunks. A query with 3 relevant chunks therefore has a Recall@1 of at most 0.33, and a query with 4 relevant chunks at most 0.25, even when the top-ranked chunk is relevant. In ground truth v2, Q14 and Q15 have four relevant chunks each. This makes Recall@1 a poor answer to the simple question "is the top result relevant?".

**Hit@k** is 1 if at least one relevant chunk is in the top k, else 0, averaged over queries. It is not capped by the number of relevant chunks. Hit@1 is the share of queries whose first retrieved chunk is relevant.

Hit@1, Hit@3 and Hit@5 were added to `scripts/eval/eval-retrieval.ts` **before** the ground truth v2 run, as additional fields. Recall@k and MRR are computed, named and reported exactly as before, so they stay comparable with earlier runs. The earlier result files do not contain Hit@k.

---

## Results with ground truth v2

**Result file**: `scripts/eval/results/eval-v2-17-chunks-gt2-2026-09-26T16-04-45-178Z.json`  
**Config version**: `v2-17-chunks-gt2`  
**Ground truth version**: `v2-2026-09-26` (21 queries)  
**KB size**: 17 chunks

These numbers are not comparable with the ground truth v1 tables above. The query set, the labels and the expected-to-fail handling differ.

### Overall (n = 21)

| Metric | v2 knowledge base (17 chunks), ground truth v2 |
|---|---|
| Recall@1 | 55.2% |
| Recall@3 | 86.1% |
| Recall@5 | 87.3% |
| MRR | 0.873 |
| Hit@1 | 81.0% |
| Hit@3 | 95.2% |
| Hit@5 | 95.2% |

No query in ground truth v2 is flagged as expected to fail, so the "excluding expected-to-fail" aggregate in the result file is identical to the table above.

### By persona

| Persona | n | R@1 | R@3 | R@5 | MRR | Hit@1 | Hit@3 | Hit@5 |
|---|---|---|---|---|---|---|---|---|
| HR | 9 | 48.1% | 92.6% | 92.6% | 0.870 | 77.8% | 100.0% | 100.0% |
| Technical | 7 | 78.6% | 100.0% | 100.0% | 1.000 | 100.0% | 100.0% | 100.0% |
| Recruiter | 5 | 35.0% | 55.0% | 60.0% | 0.700 | 60.0% | 80.0% | 80.0% |

Hit@k per persona comes from `aggregate_by_persona_hit` in the result file. Recall@k and MRR per persona are macro-averages of the per-query values.

### Per-query notes

**Q21 (recruiter): "What industry experience do you have?"** This is the only query with no relevant chunk in the top 5 (Recall@k, Hit@k and RR all 0). Top 5: `reflection-team-fit` (0.3281), `skill-creator-economy-ops` (0.3017), `skill-tech-business-bridge` (0.2960), `reflection-why-wirtschaftsinformatik` (0.2849), `project-pc-insurance-dashboard` (0.2775).

- *Labeling issue, noticed after seeing the results.* The ground truth lists only `experience-bmw-group-internship`. But the creator channel co-founder role is also industry experience, and `skill-creator-economy-ops` ranks second. The label is arguably incomplete. Ground truth v2 was **not** changed after the run. This is a candidate fix for a future ground truth version, and it has to be judged on chunk content, knowing it would raise Q21's metrics.
- *Retrieval gap either way.* `experience-bmw-group-internship` is not in the top 5. That stays a genuine retrieval gap whether or not the label is extended.

**Q19 (hr): "What are you working on in your current internship?"** `reflection-team-fit` ranks first (0.4357) and the relevant `experience-bmw-group-internship` second (0.4098). Hypothesis: the team-fit chunk mentions internships repeatedly (roles, availability, commitments), which pulls it toward a query containing "internship". Not tested.

**Q1 (hr): "Tell me about your WayBack project"** A query that names the project directly ranks `project-wayback` third (0.3278), behind `reflection-why-i-build` (0.3729) and `skill-tech-business-bridge` (0.3507). This is the same result as in both earlier runs. It is likely a limitation of embedding-only retrieval, which does not reward exact name matches the way a lexical method does. Hybrid retrieval (BM25 plus embeddings) is a possible future improvement; it has not been tested.

**Q14 (recruiter): "What's the top thing you've built recently?"** `project-ivi-defect-triage`, now labeled relevant, is still not in the top 5 (the rank-5 score is 0.3578). Recall@3 and Recall@5 are 0.5 because two of four relevant chunks are retrieved. Hit@3 and Hit@5 are 1, and Hit@1 is 0.

**Frequently retrieved chunks (possible "hub" chunks).** `reflection-why-i-build` appears in the top 5 of 11 of the 21 queries and ranks first on Q1 and Q14, where it is not relevant. It is not the only chunk with this pattern: `skill-llm-integration` appears in the top 5 of 13 queries, `project-repolens` in 11 and `reflection-team-fit` in 10. `reflection-team-fit` ranks first on Q19 and Q21, where it is not relevant. Hypothesis: generic, thesis-style chunks match many abstract queries. Chunk length may contribute. Several chunks are between about 800 and 950 words, and the knowledge base ranges from 648 words (`experience-bmw-group-internship`) to 1,222 words (`project-repolens`). But `reflection-why-i-build` is one of the shorter chunks at 745 words, so length alone does not explain its pattern. Word counts are from `app/lib/knowledge-base-embedded.json`, not from the result file. Not tested.

**Recruiter is still the weakest persona** under both ground truth versions: lowest R@1, R@3, R@5 and MRR under v1, and lowest on every metric under v2 (Hit@1 60.0%, Hit@5 80.0%).

**Run-to-run score variation.** For queries shared with the `v2-17-chunks` run (Q1 to Q17), all rankings are identical. On some queries, however, scores for chunks whose text did not change differ from that run by up to 0.0013. So small score differences between runs do occur. The 0.0003 margin reported for Q15 above is smaller than this variation, so that particular rank order should not be treated as stable. See "What changed between runs" for the likely source (fresh query embeddings on every run).

### Re-run after the IVI chunk edit

**Result file**: `scripts/eval/results/eval-v2-17-chunks-gt2-ivi-link-2026-09-26T16-19-11-871Z.json`  
**Config version**: `v2-17-chunks-gt2-ivi-link`  
**Ground truth version**: `v2-2026-09-26` (unchanged)

After the run above, the text of `project-ivi-defect-triage` was edited. The problem sentence was softened, and a paragraph was added stating that it is an independent side project inspired by the internship, built on fully synthetic data. The knowledge base was then re-embedded. The internship chunk only received a new honesty note; its text did not change.

**Result: no measurable effect on retrieval.** All aggregate and per-persona metrics are identical to the tables above, and no query's top-5 ranking changed.

Scores of `project-ivi-defect-triage` on the queries where it appears in the top 5:

| Query | Before edit | After edit | Change |
|---|---|---|---|
| Q2 | 0.3178 | 0.3161 | -0.0017 |
| Q4 | 0.2933 | 0.2936 | +0.0004 |
| Q9 | 0.2328 | 0.2272 | -0.0055 |
| Q11 | 0.3196 | 0.3234 | +0.0038 |
| Q12 | 0.2185 | 0.2220 | +0.0035 |
| Q13 (relevant) | 0.4639 | 0.4573 | -0.0066 |
| Q18 (relevant) | 0.5883 | 0.5838 | -0.0045 |

Most of these changes exceed the run-to-run variation of up to about 0.0013, so they are attributable to the text edit. None is large enough to change a rank. The chunk stays at rank 2 on Q13 and rank 1 on Q18, and it is still not in the top 5 on Q14.

For chunks whose text did not change, scores again differ only on Q5, Q16 and Q17, by up to 0.00126. These are the same three queries that drifted between the 15:43 and 16:04 runs. This is consistent with the inference that the variation comes from those queries' embeddings, but it is still not proven.

---

## Possible next steps (not implemented)

1. **Hybrid retrieval.** Combine BM25 with the current embeddings so exact names (Q1) and specific terms get lexical credit. Evaluate on ground truth v2 with a new config version.
2. **Review chunk length and generic chunks.** Check whether frequently retrieved chunks (`reflection-why-i-build`, `skill-llm-integration`, `reflection-team-fit`) crowd out specific ones, for example by testing shorter or more focused versions against the same ground truth.
3. **A future ground truth version addressing Q21.** Decide on chunk content whether creator-economy experience counts as relevant industry experience for Q21, and record that the issue was found after the v2 run.
4. **Quantify run-to-run variation.** Repeat the eval several times on the same knowledge base and ground truth. Report the spread of scores and metrics, so it is clear which differences between configurations are larger than noise.
5. **Cache query embeddings.** Store each query's embedding (keyed by query text and model) and reuse it across runs, so runs on the same knowledge base are reproducible. Then score differences come only from knowledge base or retrieval changes.
