"use client";

export default function Experience() {
  function handleRelatedProjectClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const el = document.querySelector(
      '[data-project-slug="creator-economy-analytics"]'
    );
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      const projectsSection = document.getElementById("projects");
      if (projectsSection)
        projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section id="experience" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 md:mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--mute)] mb-6 md:mb-8">
            — EXPERIENCE —
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--ink)] leading-[1.1] tracking-tight">
            Where the resume lives.
          </h2>
        </header>

        <div className="space-y-12">
          <article className="border-l-2 border-[var(--accent)] pl-6 md:pl-8 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--mute)] mb-2">
              2024 — 2025
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-[var(--ink)] mb-2 leading-tight">
              Co-founder of Content Operations
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--mute)] mb-6">
              1.6M-follower creator channel · Bilibili / Douyin
            </p>

            <ul className="space-y-3 mb-6">
              <li className="font-sans text-base text-[var(--ink)]/85 leading-relaxed flex gap-3">
                <span className="text-[var(--accent)] flex-shrink-0">—</span>
                <span>
                  Grew creator channel from obscurity to 1.6M followers across
                  Bilibili and Douyin
                </span>
              </li>
              <li className="font-sans text-base text-[var(--ink)]/85 leading-relaxed flex gap-3">
                <span className="text-[var(--accent)] flex-shrink-0">—</span>
                <span>
                  Lifted per-video engagement from sub-10K to 200K+ likes
                  through data-driven content iteration
                </span>
              </li>
              <li className="font-sans text-base text-[var(--ink)]/85 leading-relaxed flex gap-3">
                <span className="text-[var(--accent)] flex-shrink-0">—</span>
                <span>
                  Directed end-to-end video production (editing, cinematography,
                  post-production) across 200+ videos
                </span>
              </li>
              <li className="font-sans text-base text-[var(--ink)]/85 leading-relaxed flex gap-3">
                <span className="text-[var(--accent)] flex-shrink-0">—</span>
                <span>
                  Built and ran fan community across group chats and DMs;
                  managed audience feedback loops feeding into content strategy
                </span>
              </li>
              <li className="font-sans text-base text-[var(--ink)]/85 leading-relaxed flex gap-3">
                <span className="text-[var(--accent)] flex-shrink-0">—</span>
                <span>
                  Owned engagement analytics; translated audience signals into
                  editorial and production decisions
                </span>
              </li>
              <li className="font-sans text-base text-[var(--ink)]/85 leading-relaxed flex gap-3">
                <span className="text-[var(--accent)] flex-shrink-0">—</span>
                <span>
                  Two-person operational team — full content stack ownership
                  from ideation through publish
                </span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--mute)]">
                Video production
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--mute)]">
                · Community management
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--mute)]">
                · Audience analytics
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--mute)]">
                · Content strategy
              </span>
            </div>

            <a
              href="#projects"
              onClick={handleRelatedProjectClick}
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] border-b border-[var(--accent)] pb-0.5 hover:gap-3 transition-all duration-200 cursor-pointer"
            >
              An afterthought project this experience sparked
              <span>→</span>
            </a>
          </article>

          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--mute)]/40 italic pl-6 md:pl-8">
            More to come — currently looking for internship roles.
          </p>
        </div>
      </div>
    </section>
  );
}
