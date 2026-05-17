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
            A context-aware re-finding web app for tourists — surfacing the places you saved at the moment they become relevant, by translating a 2017 research paper&apos;s evaluation framework into UI signals users can actually read.
          </p>

          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                Role
              </p>
              <p className="font-sans text-sm text-[var(--ink)]">
                Sole Frontend Developer, 2-person team
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
                React 19 · Vite · Tailwind · Leaflet · TypeScript
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
            Travelers save dozens of places — restaurants, museums, viewpoints — but forget what they saved by day three. The challenge isn&apos;t discovering new places. It&apos;s re-finding saved ones at the right moment, based on context (location, time, recent activity).
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            The deeper problem isn&apos;t memory — it&apos;s <em>trust</em>. Users won&apos;t act on a recommendation they don&apos;t understand. The 2017 paper we&apos;re adapting (Sappelli et al.) defines four evaluation criteria for recommendation quality, but only measures them offline. My job: make those four criteria visible inside the live product, without academic jargon.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            Four decisions that shaped the build.
          </h2>

          <div className="space-y-10 mt-10">
            <div className="border-l border-[var(--ink)]/15 pl-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Decision 01 — Paper criteria as UI signals
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                Built an Explanation Breakdown component that surfaces the paper&apos;s four §4 evaluation criteria as plain-English signals on every recommendation: <em>Right here</em> (context relevance, §4.3), <em>Good time of day</em> (document relevance, §4.4), <em>Likely your next stop</em> (action prediction, §4.5), <em>Worth revisiting</em> (diversity, §4.6). A methodology modal — opened via &ldquo;How we picked these signals&rdquo; — explicitly cites paper sections and acknowledges where my client-side proxies extend the paper&apos;s framework.
              </p>
            </div>

            <div className="border-l border-[var(--ink)]/15 pl-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Decision 02 — Composite signal gate for proactive notifications
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                The W4 brief requires <em>proactive</em> recommendations — surfacing items without explicit user query. Naive single-threshold approaches either spam in dense areas or stay silent. I built a composite-signal evaluator: CIA score must clear a minimum bar <em>and</em> at least one of {`{proximity, time-of-day fit, under-surfaced}`} must fire. The gate mirrors the paper&apos;s &ldquo;no single criterion captures quality&rdquo; argument from §4.
              </p>
            </div>

            <div className="border-l border-[var(--ink)]/15 pl-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Decision 03 — The paper&apos;s comparison, made interactive
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                The paper&apos;s core contribution is comparing three methods (CBR / JITIR / CIA) under shared context. The original UI only let users switch one at a time — the comparison was invisible. I shipped a Method Comparison view: three columns side-by-side, three context presets (Morning at Marienplatz, Afternoon at Englischer Garten, Evening at Hauptbahnhof). Switching context rearranges all three rankings visibly. The paper&apos;s central comparison becomes a live, interactive surface.
              </p>
            </div>

            <div className="border-l border-[var(--ink)]/15 pl-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Decision 04 — Independent components as ownership architecture
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                Mid-project, working rhythms across the team diverged. Rather than escalate or mirror the pattern, I redesigned my contribution surface: every new paper-faithful feature ships as a self-contained component under <code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">frontend/src/components/</code> — one author per file, paper-section-cited commit messages, explicit ownership boundaries documented in writing. The architecture itself became the coordination mechanism. Ownership stayed legible regardless of working rhythm.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            What I&apos;m taking from it.
          </h2>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            Translating research into product isn&apos;t about implementing the algorithm — it&apos;s about making the <em>evaluation framework</em> legible. The four signals, the composite gate, the side-by-side comparison: each is a UI artifact that lets a non-technical user (or a recruiter, or a compliance reviewer) read what the system is actually optimizing for. Same pattern works for any AI surface that needs to be legible to people who don&apos;t read the source paper.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            The second lesson was structural: architectural decisions can substitute for difficult conversations. When file ownership is self-evident from the codebase, coordination becomes lower-stakes. I&apos;d treat that as a Week 1 design choice on the next project, not a Week 5 response.
          </p>
          <blockquote className="border border-[var(--accent)] p-6 italic text-[var(--ink)]/70 my-8 font-display text-lg leading-relaxed">
            &ldquo;Did you talk to five users?&rdquo; is the question I want to ask of every product I touch from now on.
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
            Four decisions in detail. Code snippets from the composite signal gate. Real screenshots from the working prototype. Reflection on what I&apos;d do differently.
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
