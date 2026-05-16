import type { ReactNode } from "react";

type LabItem = {
  id: string;
  title: string;
  oneLiner: string;
  metrics: { label: string; value: string }[];
  tools: string[];
  status: "live" | "in-progress" | "roadmap";
  year: string;
  liveUrl?: string;
  codeUrl?: string;
  note?: ReactNode;
};

const items: LabItem[] = [
  {
    id: "pc-insurance-dashboard",
    title: "P&C Insurance Analytics Dashboard",
    oneLiner:
      "An interactive 4-view dashboard on French Motor TPL (Charpentier 2014) — surfacing where a €234M-exposure portfolio actually loses money: 6 unprofitable regions, the 18-25 driver cohort, and a healthy BonusMalus retention curve.",
    metrics: [
      { label: "Policies", value: "678K" },
      { label: "Claims", value: "25K" },
      { label: "Views", value: "4" },
    ],
    tools: ["Python", "pandas", "Plotly"],
    status: "live",
    year: "2026.05",
    liveUrl: "https://insurance-dashboard-site.vercel.app",
  },
];

function isExternal(url: string) {
  return url.startsWith("http");
}

function extAttrs(url: string) {
  return isExternal(url)
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
}

function StatusDot({ status }: { status: LabItem["status"] }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink)]/70">
        <span className="text-[var(--accent)]">●</span> LIVE
      </span>
    );
  }
  if (status === "in-progress") {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink)]/70">
        <span className="text-[var(--accent)] animate-pulse">●</span> IN PROGRESS
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--mute)]">
      <span className="text-[var(--ink)]/40">○</span> ROADMAP
    </span>
  );
}

function LabCard({ item }: { item: LabItem }) {
  return (
    <article className="group border border-[var(--ink)]/10 bg-[var(--base)] p-6 md:p-7 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
          DATA / ANALYTICS
        </p>
        <StatusDot status={item.status} />
      </div>

      <h3 className="font-display text-xl md:text-2xl text-[var(--ink)] tracking-tight leading-snug mb-3">
        {item.title}
      </h3>

      <p className="font-sans text-sm text-[var(--ink)]/70 leading-relaxed mb-5">
        {item.oneLiner}
      </p>

      <div className="grid grid-cols-3 gap-3 border-t border-b border-[var(--ink)]/10 py-4 mb-5">
        {item.metrics.map((m) => (
          <div key={m.label}>
            <p className="font-display text-lg text-[var(--ink)] leading-none mb-1.5">
              {m.value}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--mute)]">
              {m.label}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {item.tools.map((t) => (
          <span
            key={t}
            className="inline-flex items-center px-2 py-0.5 border border-[var(--ink)]/15 font-mono text-[10px] text-[var(--ink)]/70"
          >
            {t}
          </span>
        ))}
      </div>

      {item.note && <div className="mb-5">{item.note}</div>}

      <div className="mt-auto flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--mute)]">
          {item.year}
        </span>
        {item.status === "live" && (
          <div className="flex gap-5">
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                {...extAttrs(item.liveUrl)}
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
              >
                View →
              </a>
            )}
            {item.codeUrl && (
              <a
                href={item.codeUrl}
                {...extAttrs(item.codeUrl)}
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
              >
                Code →
              </a>
            )}
          </div>
        )}
        {item.status === "in-progress" && (
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--mute)]">
            Building →
          </span>
        )}
        {item.status === "roadmap" && (
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--mute)]">
            Planned
          </span>
        )}
      </div>
    </article>
  );
}

export default function DataLab() {
  return (
    <section
      id="data-lab"
      className="px-6 md:px-12 pt-8 md:pt-12 pb-20 md:pb-24"
    >
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-[var(--ink)]/10 pt-16 md:pt-20">
          <header className="mb-12 md:mb-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--mute)] mb-5">
              — DATA LAB —
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--ink)] leading-[1.1] tracking-tight mb-4">
              Smaller experiments.
            </h2>
            <p className="font-sans text-sm md:text-base text-[var(--mute)] leading-relaxed max-w-xl">
              Focused analytical notebooks and dashboards — narrower in scope
              than the projects above, but built end-to-end on real data.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {items.map((item) => (
              <LabCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
