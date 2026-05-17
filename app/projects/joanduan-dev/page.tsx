import Link from "next/link";

export default function JoanduanDevPage() {
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
            joanduan.dev
          </h1>
          <p className="font-sans text-lg md:text-xl text-[var(--ink)]/75 leading-relaxed max-w-2xl">
            A self-built portfolio in a week — brand identity, code, copy, and ship. The site you are reading is the project.
          </p>

          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                Role
              </p>
              <p className="font-sans text-sm text-[var(--ink)]">
                Designer + Developer
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                Timeline
              </p>
              <p className="font-sans text-sm text-[var(--ink)]">
                1 week · May 2026
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                Stack
              </p>
              <p className="font-sans text-sm text-[var(--ink)]">
                Next.js 16 · Tailwind v4 · TypeScript · Vercel
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                Status
              </p>
              <p className="font-sans text-sm text-[var(--accent)]">● Live</p>
            </div>
          </div>
        </header>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6">
            Why build it myself.
          </h2>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            Most portfolios are template-shaped. Mine couldn&apos;t be — the work I want to do sits at the intersection of business thinking and engineering taste, and a template would smooth out exactly the edges that matter.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            So I treated the portfolio itself as a Wirtschaftsinformatik problem: brand decisions, code decisions, copy decisions, deployment decisions — all the same project, all needing to land together.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            What&apos;s underneath.
          </h2>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            Fraunces serif paired with Inter sans. A four-color system: ivory, near-black, caramel, mute. Tailwind v4 with CSS variables. Inline SVG schematics for each project card — black line work, one caramel highlight per visual, never decoration.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            The Projects section got rebuilt once: first version came out too decorative (“girly handbook” was the verdict). Second version went Swiss-editorial. The taste lives in what got removed, not what got added.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            What I&apos;m taking from it.
          </h2>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            Brand work and engineering work are the same work. The decision to use Fraunces over Georgia, the decision to use SVG over PNG, the decision to call a section “What I&apos;m working on” instead of “Selected Work” — none of these are decoration. They&apos;re the same thinking: making something legible to the person on the other side.
          </p>
          <blockquote className="border border-[var(--accent)] p-6 italic text-[var(--ink)]/70 my-8 font-display text-lg leading-relaxed">
            Sustainability and accuracy are most important. I&apos;m not here to participate in competition. I&apos;m here to do real work.
          </blockquote>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            This portfolio is the first place I tried to hold that thesis end-to-end.
          </p>
        </section>

        <div className="mt-32 pt-12 border-t border-[var(--ink)]/10">
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
