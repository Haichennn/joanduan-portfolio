import Link from "next/link";
import type { ReactNode } from "react";

import { VisualScoreSeparation } from "../../components/Projects";

const paragraph =
  "font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl";
const code = "font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5";
const label =
  "font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3";

function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto my-10 border border-[var(--ink)]/15">
      <table className="w-full min-w-[480px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[var(--ink)]/15">
            {columns.map((c) => (
              <th
                key={c}
                scope="col"
                className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] font-normal px-4 py-3"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-[var(--ink)]/10 last:border-b-0"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={
                    j === 0
                      ? "font-sans text-sm text-[var(--ink)] px-4 py-3"
                      : "font-mono text-sm text-[var(--ink)]/75 px-4 py-3 whitespace-nowrap"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function IviDefectTriagePage() {
  return (
    <main className="bg-[var(--base)] min-h-screen">
      <article className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <div className="mb-16">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--mute)] hover:text-[var(--accent)] transition-colors"
          >
            ← back to projects
          </Link>
        </div>

        <header className="mb-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
            AI / RESEARCH
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-[var(--ink)] tracking-tight leading-[1.05] mb-6">
            IVI Defect Triage
          </h1>
          <p className="font-display text-2xl md:text-3xl text-[var(--ink)]/85 italic tracking-tight leading-snug mb-8 max-w-2xl">
            Does symptom normalization improve duplicate detection?
          </p>
          <p className="font-sans text-lg md:text-xl text-[var(--ink)]/75 leading-relaxed max-w-2xl">
            A controlled ablation study on whether normalizing noisy defect reports into one-sentence symptom summaries improves embedding-based duplicate detection, extended into a full triage pipeline and a tool-use agent.
          </p>
          <p className="font-sans text-base text-[var(--ink)]/60 leading-relaxed max-w-2xl mt-6">
            Inspired by my internship experience; built in my own time on fully synthetic data, without any internal data, code or processes.
          </p>

          <div className="mt-12 space-y-8">
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                  Role
                </p>
                <p className="font-sans text-sm text-[var(--ink)]">
                  Solo · Study design, data, pipeline, evaluation
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                  Status
                </p>
                <p className="font-sans text-sm text-[var(--accent)]">
                  ● Finished · public repository
                </p>
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                Stack
              </p>
              <p className="font-sans text-sm text-[var(--ink)] leading-relaxed">
                Python · Anthropic API (tool use) · Voyage AI · NumPy
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-[0.15em]">
            <a
              href="https://github.com/Haichennn/symptom-normalization-retrieval"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
            >
              GitHub →
            </a>
          </div>
        </header>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6">
            The question.
          </h2>
          <p className={paragraph}>
            Does normalizing noisy defect reports into one-sentence symptom summaries improve embedding-based duplicate detection?
          </p>
          <p className={paragraph}>
            Defect reports of this kind can contain a lot of noise unrelated to the defect (bench names, software versions, test case IDs, colleague names). My hypothesis was that this shared noise inflates vector similarity between unrelated tickets. Two reports written on the same bench, against the same software version, look alike to an embedding model even when they describe completely different defects.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            The approach.
          </h2>
          <p className={paragraph}>
            Each report is reduced to one German sentence describing only the symptom and the affected function: max 20 words, no bench, software version, date or names. Retrieval runs on these summaries; retrieval on the raw report text is the control.
          </p>
          <p className={paragraph}>
            Embeddings are asymmetric voyage-3: corpus documents are embedded with <code className={code}>input_type=document</code>, incoming tickets with <code className={code}>input_type=query</code>. Similarity is cosine.
          </p>
          <p className={paragraph}>
            The dataset is 40 fully synthetic German tickets generated with a fixed seed. 5 components (Navigation, Voice Assistant, Connectivity, Media, Display), 8 tickets each, severities S1 to S4, split into 20 corpus and 20 test tickets. 8 true duplicate pairs are split across corpus and test set and written with different wording, length and interaction path; five of them mix English technical terms into one side. 4 hard negative pairs come from the same component and describe different defects. All texts contain deliberate noise.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            What the retrieval study shows.
          </h2>

          <DataTable
            columns={["Mode", "Recall@3", "Overlap", "Median margin"]}
            rows={[
              ["summary", "8/8", "0.023", "0.256"],
              ["raw report", "8/8", "0.112", "0.126"],
            ]}
          />

          <div className="space-y-10 mt-10">
            <div className="border-l border-[var(--ink)]/15 pl-6">
              <p className={label}>Finding 01 · Recall@3 is saturated</p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                With 20 corpus tickets, the top 3 already cover 15% of the corpus. Both modes reach 8/8, so the metric does not discriminate between them.
              </p>
            </div>

            <div className="border-l border-[var(--ink)]/15 pl-6">
              <p className={label}>Finding 02 · Separability is the real difference</p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                In neither mode does an absolute score threshold separate duplicates from non-duplicates. But the overlap between the two score ranges is about five times smaller with summaries.
              </p>
            </div>
          </div>

          <div className="relative aspect-[16/9] bg-[var(--base)] border border-[var(--ink)]/15 overflow-hidden my-10">
            <VisualScoreSeparation />
          </div>

          <div className="space-y-10">
            <div className="border-l border-[var(--ink)]/15 pl-6">
              <p className={label}>Finding 03 · The margin carries the signal</p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                A margin criterion (top1 minus top2, threshold about 0.18) detects 7/8 duplicates with 0/12 false alarms on summaries, versus 2/8 on raw text. With a true duplicate there is exactly one very similar ticket; with a new defect, candidate scores sit close together.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            From study to pipeline.
          </h2>
          <p className={paragraph}>
            The retrieval finding becomes the middle of a triage flow with four fixed steps:
          </p>
          <ul className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed space-y-3 max-w-2xl list-none pl-0 mb-6">
            <li>
              <code className={code}>classify</code>: one Claude call returns component, severity and symptom summary.
            </li>
            <li>
              <code className={code}>retrieve</code>: Voyage embeddings on the summaries, cosine search.
            </li>
            <li>
              <code className={code}>judge</code>: a statistical margin threshold as pre-filter, then an LLM check of the top candidate.
            </li>
            <li>
              <code className={code}>create_ticket</code>: a local CSV row plus a notification log line.
            </li>
          </ul>
          <p className={paragraph}>
            Classification on the 20 test tickets: component accuracy 18/20, severity exact 10/20, within one level 18/20. Both misclassifications sit on rule boundaries.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            Gold summaries overstate the result.
          </h2>
          <p className={paragraph}>
            The retrieval study uses hand-written summaries. With automatically generated summaries, the median duplicate margin drops from 0.256 to 0.178.
          </p>
          <p className={paragraph}>
            The consistency of hand-written summaries is a property of the annotation, not of the method. The retrieval study is therefore an upper bound, not the performance to expect from the running system.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            Calibrating the right stage.
          </h2>
          <p className={paragraph}>
            Three ways to set the margin threshold of the judge step:
          </p>

          <DataTable
            columns={["Variant", "Threshold", "Precision", "Recall", "F1"]}
            rows={[
              ["D1 carried over", "0.18", "1.00", "0.38", "0.55"],
              ["D2 calibrated for zero false alarms", "0.20", "1.00", "0.38", "0.55"],
              ["D3 calibrated for F1 plus LLM filter", "0.08", "1.00", "0.75", "0.86"],
            ]}
          />

          <p className={paragraph}>
            In a two-stage design the statistical stage should collect candidates broadly and the LLM stage should filter. A false alarm costs the tester one look; a missed duplicate creates a duplicate ticket.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            Fixed pipeline versus tool-use agent.
          </h2>

          <DataTable
            columns={["Metric", "Pipeline", "Agent"]}
            rows={[
              ["Component accuracy", "90%", "95%"],
              ["Severity accuracy (exact)", "50%", "55%"],
              ["Duplicate precision", "1.00", "1.00"],
              ["Duplicate recall", "0.38", "1.00"],
              ["Duplicate F1", "0.55", "1.00"],
              ["API calls per ticket", "1.15", "3.90"],
              ["Cost per ticket (USD)", "0.0028 (estimated)", "0.0509 (measured)"],
            ]}
          />

          <p className="font-mono text-[11px] text-[var(--mute)] leading-relaxed -mt-6 mb-10 max-w-2xl">
            Pipeline duplicate rows use the zero-false-alarm threshold 0.20. At the D3 operating point the pipeline reaches precision 1.00, recall 0.75, F1 0.86 at 1.5 API calls per ticket.
          </p>

          <p className={paragraph}>
            The agent has three tools: <code className={code}>search_similar_tickets</code>, <code className={code}>get_ticket_details</code> and <code className={code}>create_ticket</code>, with a maximum of 8 calls per ticket and a median of 4. When it is unsure, it reformulates the search or looks up the full text, which lets it find the two pairs every threshold misses.
          </p>
          <p className={paragraph}>
            The price is more than 10x the cost per ticket (0.051 USD vs. under 0.005 USD for the pipeline) and decisions that are less reproducible.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            Three mistakes I corrected.
          </h2>

          <div className="space-y-8 mt-10">
            <div className="border-l border-[var(--ink)]/15 pl-6">
              <p className={label}>Mistake 01 · Symmetric instead of asymmetric similarity</p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                I first judged separability on document-to-document similarity, which suggested full separability. The real query-to-document path scores 0.15 to 0.20 lower. Lesson: evaluate on the same path the system uses.
              </p>
            </div>

            <div className="border-l border-[var(--ink)]/15 pl-6">
              <p className={label}>Mistake 02 · Label leakage in an agent tool</p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                <code className={code}>search_similar_tickets</code> initially returned component and severity of the candidates, exposing gold labels. After removing them, agent component accuracy dropped from 100% to 95%. Only the 95% is comparable.
              </p>
            </div>

            <div className="border-l border-[var(--ink)]/15 pl-6">
              <p className={label}>Mistake 03 · Unsuitable calibration criterion</p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                Zero false alarms at the statistical stage optimizes the wrong stage and gives away recall (0.38 versus 0.75).
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            Limitations.
          </h2>
          <ul className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed space-y-3 max-w-2xl list-none pl-0">
            <li>
              <em>Self-made data.</em> I created the data and the gold annotation, so the study measures whether retrieval reproduces the construction intent, not performance on real tickets.
            </li>
            <li>
              <em>Text length.</em> The texts (60 to 160 words) are longer than real tickets on purpose.
            </li>
            <li>
              <em>Small sample.</em> 8 positive pairs give wide confidence intervals: the Clopper-Pearson lower bound is about 0.63 at 8/8 and about 0.47 at 7/8.
            </li>
            <li>
              <em>Not a deployed system.</em> No UI, no real ticketing integration.
            </li>
          </ul>
        </section>

        <section className="mt-24 pt-12 border-t border-[var(--ink)]/10">
          <div className="flex flex-wrap gap-x-12 gap-y-4 mb-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                Code
              </p>
              <a
                href="https://github.com/Haichennn/symptom-normalization-retrieval"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
              >
                github.com/Haichennn/symptom-normalization-retrieval
              </a>
              <p className="font-sans text-sm text-[var(--ink)]/75 mt-1">
                Full reproduction steps in the README.
              </p>
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
              Stack
            </p>
            <p className="font-sans text-sm text-[var(--ink)]/75 leading-relaxed">
              Python · Anthropic API (tool use) · Voyage AI · NumPy
            </p>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--mute)] mt-10">
            Haichen Duan
          </p>
        </section>

        <div className="mt-20 pt-12 border-t border-[var(--ink)]/10">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
          >
            ← back to all projects
          </Link>
        </div>
      </article>
    </main>
  );
}
