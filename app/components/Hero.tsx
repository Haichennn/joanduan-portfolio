import ParticleHaichen from "./ParticleHaichen";
import CompositionalReading from "./CompositionalReading";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[var(--base)]">
      {/* Layer 0 — AI Vision Evolution background (three visual textures) */}
      <div className="absolute inset-0 grid grid-cols-3 z-0 pointer-events-none overflow-hidden">

        {/* Segment 1 — CNN era: pixelated mosaic */}
        <div className="relative">
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `
                linear-gradient(to right, var(--ink) 1px, transparent 1px),
                linear-gradient(to bottom, var(--ink) 1px, transparent 1px)
              `,
              backgroundSize: "14px 14px",
            }}
          />
          <div className="absolute inset-0 opacity-[0.10] grid grid-cols-[repeat(auto-fill,14px)] grid-rows-[repeat(auto-fill,14px)]">
            {Array.from({ length: 40 }).map((_, i) => {
              const colors = ["var(--ink)", "var(--ink)", "var(--ink)", "var(--accent)"];
              const color = colors[i % colors.length];
              const top = (i * 37) % 90;
              const left = (i * 53) % 95;
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    width: "14px",
                    height: "14px",
                    top: `${top}%`,
                    left: `${left}%`,
                    backgroundColor: color,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Segment 2 — Midjourney era: soft warm vignette spotlight under HAICHEN */}
        <div className="relative era-midjourney">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 500px 350px at 50% 50%, #6B3F1F 0%, #5A3825 35%, #2A1F14 70%, transparent 100%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-50 mix-blend-multiply"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 30%, var(--ink) 0.5px, transparent 1px),
                radial-gradient(circle at 75% 70%, var(--ink) 0.5px, transparent 1px),
                radial-gradient(circle at 50% 20%, var(--ink) 0.4px, transparent 0.8px),
                radial-gradient(circle at 10% 80%, var(--ink) 0.4px, transparent 0.8px),
                radial-gradient(circle at 90% 40%, var(--ink) 0.4px, transparent 0.8px)
              `,
              backgroundSize: "3px 3px, 4px 4px, 5px 5px, 6px 6px, 7px 7px",
            }}
          />
        </div>

        {/* Segment 3 — Claude Vision era: geometric guides + attention rect */}
        <div className="relative">
          <div className="absolute inset-0 opacity-[0.12]">
            <div className="absolute top-1/4 left-0 right-0 h-px bg-[var(--ink)]" />
            <div className="absolute top-2/4 left-0 right-0 h-px bg-[var(--ink)]" />
            <div className="absolute top-3/4 left-0 right-0 h-px bg-[var(--ink)]" />
            <div className="absolute left-1/4 top-0 bottom-0 w-px bg-[var(--ink)]" />
            <div className="absolute left-2/4 top-0 bottom-0 w-px bg-[var(--ink)]" />
            <div className="absolute left-3/4 top-0 bottom-0 w-px bg-[var(--ink)]" />
          </div>
          <div
            className="absolute era-claude-focus opacity-[0.35]"
            style={{
              top: "20%",
              left: "15%",
              width: "100px",
              height: "60px",
              border: "1px solid var(--accent)",
            }}
          />
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
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--accent)]">
          joanduan.dev <span className="text-[var(--accent)]/70">·</span> v0.3
        </p>
      </div>

      {/* Bottom-left: ML pipeline signature */}
      <div className="absolute bottom-16 left-6 md:bottom-16 md:left-10 z-20">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--mute)]">
          NOW <span className="text-[var(--accent)]/70">·</span> ingest <span className="text-[var(--accent)]/70">·</span> learn <span className="text-[var(--accent)]/70">·</span> ship
        </p>
      </div>

      {/* Compositional reading trigger — sits in segment 3 zone, just above timeline labels */}
      <div className="absolute bottom-16 left-0 right-0 z-20 grid grid-cols-3 pointer-events-none px-8">
        <div></div>
        <div></div>
        <div className="flex justify-center">
          <CompositionalReading />
        </div>
      </div>

      {/* Timeline labels — Joan's personal-growth arc, one per background segment */}
      <div className="absolute bottom-6 left-0 right-0 z-10 grid grid-cols-3 pointer-events-none px-8">
        <div className="flex justify-center">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--mute)]/70">
            <span className="text-[var(--accent)]/60 mr-2">·</span>perception
          </span>
        </div>
        <div className="flex justify-center">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--mute)]/70">
            <span className="text-[var(--accent)]/60 mr-2">·</span>comprehension
          </span>
        </div>
        <div className="flex justify-center">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--mute)]/70">
            <span className="text-[var(--accent)]/60 mr-2">·</span>composition
          </span>
        </div>
      </div>
    </section>
  );
}
