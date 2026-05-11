import Link from "next/link";

export default function WayBackPage() {
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
            ENGINEERING / FRONTEND
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-[var(--ink)] tracking-tight leading-[1.05] mb-8">
            WayBack
          </h1>
          <p className="font-sans text-lg md:text-xl text-[var(--ink)]/75 leading-relaxed max-w-2xl">
            A context-aware re-finding web app for tourists — surfacing the places you saved at the moment they become relevant, with AI explanations users can trust.
          </p>

          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                Role
              </p>
              <p className="font-sans text-sm text-[var(--ink)]">
                Frontend Lead, 2-person team
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                Timeline
              </p>
              <p className="font-sans text-sm text-[var(--ink)]">
                10 weeks · April – June 2026
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                Context
              </p>
              <p className="font-sans text-sm text-[var(--ink)]">
                TUM Practical Lab · Recommendation Systems
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                Stack
              </p>
              <p className="font-sans text-sm text-[var(--ink)]">
                React 19 · Vite · Tailwind · Leaflet · Claude API
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                Status
              </p>
              <p className="font-sans text-sm text-[var(--accent)]">
                ● Live · prototype phase
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-[0.15em]">
            <a
              href="https://wayback-beige.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
            >
              Live demo →
            </a>
            <span className="text-[var(--mute)]">
              Code · available on request
            </span>
          </div>
        </header>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6">
            The premise.
          </h2>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            Travelers save dozens of places — restaurants, museums, viewpoints — but forget what they saved by day three. The challenge isn&apos;t discovering new places. It&apos;s re-finding saved ones at the right moment, based on context.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            Our 10-week goal: build a working prototype that implements three academic ranking methods, then make them legible enough that users actually trust the recommendations.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            Three decisions that shaped the build.
          </h2>

          <div className="space-y-10 mt-10">
            <div className="border-l border-[var(--ink)]/15 pl-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Decision 01 — Picking the right AI for the moment
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                Claude Haiku at 100 tokens for an inline place description, not GPT-4 at 500 tokens. AI integration isn&apos;t “use the most powerful model” — it&apos;s choosing the right cost / latency / quality point for the specific moment.
              </p>
            </div>

            <div className="border-l border-[var(--ink)]/15 pl-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Decision 02 — Making algorithms legible
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                Backend returns reason codes like{" "}
                <code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">
                  nearby_and_recent_save
                </code>
                . Frontend translates: “180m away · saved 6 days ago.” A five-pattern mapping layer that scales — same architecture works for a recommendation algorithm, a risk score, or a fraud classifier.
              </p>
            </div>

            <div className="border-l border-[var(--ink)]/15 pl-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Decision 03 — Designing for partial backend
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                Co-authored a 5-page API contract with my partner before either of us wrote implementation code. Loading / empty / error states wired into every endpoint from day one, not retrofitted. At the demo, several endpoints were still catching up — the frontend held.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            What I&apos;m taking from it.
          </h2>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            Technical implementation and business thinking aren&apos;t separate phases — they&apos;re the same thinking. Choosing Haiku over GPT-4 was a cost-per-user decision, not a latency one. Designing reason-codes was about whether users would trust the algorithm, not UI text. Every technical call was a product call.
          </p>
          <blockquote className="border-l-2 border-[var(--accent)] pl-6 italic text-[var(--ink)]/70 my-8 font-sans">
            “Did you talk to five users?” is the question I want to ask of every product I touch from now on.
          </blockquote>
        </section>

        <section className="my-16 p-10 border border-[var(--ink)]/15">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
            FULL CASE STUDY
          </p>
          <h3 className="font-display text-2xl md:text-3xl text-[var(--ink)] tracking-tight leading-tight mb-4">
            The 10-week version — with screenshots, code, and the decision trail.
          </h3>
          <p className="font-sans text-base text-[var(--ink)]/75 leading-relaxed mb-6 max-w-xl">
            Three decisions in detail. The reason-code mapping table. Real screenshots from the working prototype. Reflection on what I&apos;d do differently.
          </p>
          <a
            href="https://hammerhead-shroud-dfb.notion.site/d23dbce17d1b42f2a70595a01c9a9c66?v=35ab994f958b805d971b000cce266f82"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm uppercase tracking-[0.15em] text-[var(--ink)] hover:text-[var(--accent)] transition-colors inline-block"
          >
            Read the full case study on Notion →
          </a>
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
