import ParticleHaichen from "./ParticleHaichen";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[var(--base)]">
      {/* Layer 0 — AI Vision Evolution background (three segments) */}
      <div className="absolute inset-0 grid grid-cols-3 z-0">
        {/* Segment 1 — CNN (placeholder block) */}
        <div className="relative flex items-end justify-start p-6 bg-gradient-to-br from-[var(--ink)]/[0.04] to-[var(--ink)]/[0.08]">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--mute)]/50">
            01 · CNN
          </span>
        </div>

        {/* Segment 2 — Midjourney (placeholder block) */}
        <div className="relative flex items-end justify-center p-6 bg-gradient-to-br from-[var(--accent)]/[0.04] to-[var(--accent)]/[0.10]">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--mute)]/50">
            02 · MIDJOURNEY
          </span>
        </div>

        {/* Segment 3 — Claude Vision (placeholder block) */}
        <div className="relative flex items-end justify-end p-6 bg-gradient-to-br from-[var(--ink)]/[0.06] to-[var(--ink)]/[0.10]">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--mute)]/50">
            03 · CLAUDE VISION
          </span>
        </div>
      </div>

      {/* Layer 0.5 — Soft veil so HAICHEN reads clearly over background */}
      <div className="absolute inset-0 bg-[var(--base)]/55 z-[1]" />

      {/* Layer 1 — Main heading (plain text for now; particles come in Phase B) */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <p className="font-mono text-[12px] tracking-[0.05em] uppercase text-[var(--mute)]">
          Hello, I&apos;m Haichen.
        </p>
        <div className="mt-6 w-full max-w-6xl">
          <ParticleHaichen />
        </div>
        <div className="mt-8 max-w-none">
          <p className="font-sans text-[18px] leading-[1.6] text-[var(--ink)] md:whitespace-nowrap">
            Building things that make sense to the people who actually use them.
          </p>
          <p className="font-sans text-[18px] leading-[1.6] text-[var(--ink)] md:whitespace-nowrap">
            Trying to think clearly when most things compete for attention.
          </p>
          <p className="font-sans text-[18px] leading-[1.6] text-[var(--ink)] md:whitespace-nowrap">
            Quietly obsessed with details most people skip.
          </p>
        </div>

        {/* Tagline footer */}
        <div className="flex items-center justify-center gap-10 md:gap-12 mt-16">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--accent)]">
            [BUILDER]
          </span>
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--accent)]">
            [CREATOR-LITERATE]
          </span>
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--accent)]">
            [AI-NATIVE]
          </span>
        </div>
      </div>

      {/* Layer 2 — Floating status labels */}
      {/* Top-right: version tag */}
      <div className="absolute top-6 right-6 md:top-8 md:right-10 z-20">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--mute)]">
          joanduan.dev <span className="text-[var(--accent)]/70">·</span> v0.3
        </p>
      </div>

      {/* Bottom-left: ML pipeline signature */}
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-10 z-20">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--mute)]">
          NOW <span className="text-[var(--accent)]/70">·</span> ingest <span className="text-[var(--accent)]/70">·</span> learn <span className="text-[var(--accent)]/70">·</span> ship
        </p>
      </div>
    </section>
  );
}
