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
            <span aria-hidden="true">– </span>EXPERIENCE<span aria-hidden="true"> –</span>
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--ink)] leading-[1.1] tracking-tight">
            Where the resume lives.
          </h2>
        </header>

        <div className="space-y-12">
          <article className="pl-6 md:pl-8 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--mute)] mb-2">
              2026 – Present
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-[var(--ink)] mb-2 leading-tight">
              Intern, Quality Management Digitalization
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--mute)] mb-6">
              BMW Group · Munich
            </p>

            <ul className="space-y-3 mb-6">
              <li className="font-sans text-base text-[var(--ink)]/85 leading-relaxed flex gap-3">
                <span className="text-[var(--accent-small)] flex-shrink-0">—</span>
                <span>Own the end-to-end cleansing of large, heterogeneous production reporting data: identify erroneous and inconsistent records, trace their root causes (including faulty calculation logic in the legacy solution), correct them and migrate the clean data from SharePoint into the internal platform.</span>
              </li>
              <li className="font-sans text-base text-[var(--ink)]/85 leading-relaxed flex gap-3">
                <span className="text-[var(--accent-small)] flex-shrink-0">—</span>
                <span>Transformed a grown, rule-less Excel solution that produced incorrect results as data volume increased into a fixed, standardized data format with defined validation rules, making the internal platform scalable and maintainable in the long term.</span>
              </li>
              <li className="font-sans text-base text-[var(--ink)]/85 leading-relaxed flex gap-3">
                <span className="text-[var(--accent-small)] flex-shrink-0">—</span>
                <span>Built a digital workflow on the platform so stakeholder meetings work from one consistent, validated data basis instead of manually compiled Excel reports, making these meetings more efficient.</span>
              </li>
              <li className="font-sans text-base text-[var(--ink)]/85 leading-relaxed flex gap-3">
                <span className="text-[var(--accent-small)] flex-shrink-0">—</span>
                <span>Developer and administrator responsible for the platform in production use: clarify requirements directly with management, order coordination and shop-floor users, translate between business and technical language, and analyze and fix issues reported by users.</span>
              </li>
              <li className="font-sans text-base text-[var(--ink)]/85 leading-relaxed flex gap-3">
                <span className="text-[var(--accent-small)] flex-shrink-0">—</span>
                <span>Currently building a barcode scanning tool for 100% sorting inspections that replaces manual Excel capture (database layer with PL/SQL business logic on the test environment, frontend prototype with handheld scanner integration).</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--mute)]">
                Oracle APEX
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--mute)]">
                · Oracle Database
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--mute)]">
                · PL/SQL
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--mute)]">
                · SQL
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--mute)]">
                · Angular
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--mute)]">
                · TypeScript
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--mute)]">
                · SharePoint
              </span>
            </div>

            <a
              href="/projects/ivi-defect-triage"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-small)] border-b border-[var(--accent)] pb-0.5 hover:gap-3 transition-all duration-200 cursor-pointer"
            >
              A side project this work inspired
              <span>→</span>
            </a>
          </article>

          <article className="pl-6 md:pl-8 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--mute)] mb-2">
              2024 – 2025
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-[var(--ink)] mb-2 leading-tight">
              Co-founder of Content Operations
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--mute)] mb-6">
              1.6M-follower creator channel · Bilibili / Douyin
            </p>

            <ul className="space-y-3 mb-6">
              <li className="font-sans text-base text-[var(--ink)]/85 leading-relaxed flex gap-3">
                <span className="text-[var(--accent-small)] flex-shrink-0">—</span>
                <span>
                  Grew creator channel from obscurity to 1.6M followers across
                  Bilibili and Douyin
                </span>
              </li>
              <li className="font-sans text-base text-[var(--ink)]/85 leading-relaxed flex gap-3">
                <span className="text-[var(--accent-small)] flex-shrink-0">—</span>
                <span>
                  Lifted per-video engagement from sub-10K to 200K+ likes
                  through data-driven content iteration
                </span>
              </li>
              <li className="font-sans text-base text-[var(--ink)]/85 leading-relaxed flex gap-3">
                <span className="text-[var(--accent-small)] flex-shrink-0">—</span>
                <span>
                  Directed end-to-end video production (editing, cinematography,
                  post-production) across 200+ videos
                </span>
              </li>
              <li className="font-sans text-base text-[var(--ink)]/85 leading-relaxed flex gap-3">
                <span className="text-[var(--accent-small)] flex-shrink-0">—</span>
                <span>
                  Built and ran fan community across group chats and DMs;
                  managed audience feedback loops feeding into content strategy
                </span>
              </li>
              <li className="font-sans text-base text-[var(--ink)]/85 leading-relaxed flex gap-3">
                <span className="text-[var(--accent-small)] flex-shrink-0">—</span>
                <span>
                  Owned engagement analytics; translated audience signals into
                  editorial and production decisions
                </span>
              </li>
              <li className="font-sans text-base text-[var(--ink)]/85 leading-relaxed flex gap-3">
                <span className="text-[var(--accent-small)] flex-shrink-0">—</span>
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
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-small)] border-b border-[var(--accent)] pb-0.5 hover:gap-3 transition-all duration-200 cursor-pointer"
            >
              An afterthought project this experience sparked
              <span>→</span>
            </a>
          </article>

          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--mute)]/40 italic pl-6 md:pl-8">
            Open to 6-month internships in Munich from March 2027.
          </p>
        </div>
      </div>
    </section>
  );
}
