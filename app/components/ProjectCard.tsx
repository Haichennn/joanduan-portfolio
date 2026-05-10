import type { ReactNode } from "react";

type Status = "live" | "in-progress" | "roadmap";

type Props = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  status: Status;
  year: string;
  liveUrl?: string;
  codeUrl?: string;
  anchor: string;
  visual: ReactNode;
  isFirst: boolean;
};

function isExternal(url: string) {
  return url.startsWith("http");
}

function extAttrs(url: string) {
  return isExternal(url)
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
}

function StatusChip({ status }: { status: Status }) {
  const base =
    "absolute top-4 right-4 bg-[var(--base)] border border-[var(--ink)]/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] rounded-full";

  if (status === "live") {
    return (
      <span className={base}>
        <span className="text-[var(--accent)]">●</span>{" "}
        <span className="text-[var(--ink)]">LIVE</span>
      </span>
    );
  }
  if (status === "in-progress") {
    return (
      <span className={base}>
        <span className="text-[var(--accent)] animate-pulse">●</span>{" "}
        <span className="text-[var(--ink)]">IN PROGRESS</span>
      </span>
    );
  }
  return (
    <span className={base}>
      <span className="text-[var(--ink)]/40">○</span>{" "}
      <span className="text-[var(--mute)]">ROADMAP</span>
    </span>
  );
}

export default function ProjectCard({
  title,
  category,
  description,
  tags,
  status,
  year,
  liveUrl,
  codeUrl,
  anchor,
  visual,
  isFirst,
}: Props) {
  return (
    <article
      id={anchor}
      className={
        isFirst ? "" : "border-t border-[var(--ink)]/10 pt-24 md:pt-32"
      }
    >
      <div className="relative aspect-[16/9] bg-[var(--base)] border border-[var(--ink)]/15 overflow-hidden mb-10">
        {visual}
        <StatusChip status={status} />
      </div>

      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
        {category}
      </p>

      <h3 className="font-display text-3xl md:text-4xl text-[var(--ink)] tracking-tight leading-tight mb-5">
        {title}
      </h3>

      <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-8 max-w-2xl">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-10">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-3 py-1 border border-[var(--ink)]/15 font-mono text-[11px] text-[var(--ink)]/70"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-baseline">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--mute)]">
          {year}
        </span>

        {status === "live" && (
          <div className="flex gap-6">
            {liveUrl && (
              <a
                href={liveUrl}
                {...extAttrs(liveUrl)}
                className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
              >
                View →
              </a>
            )}
            {codeUrl && (
              <a
                href={codeUrl}
                {...extAttrs(codeUrl)}
                className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
              >
                Code →
              </a>
            )}
          </div>
        )}

        {status === "in-progress" && (
          <a
            href={`#${anchor}`}
            className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--mute)] hover:text-[var(--accent)] transition-colors"
          >
            Building →
          </a>
        )}

        {status === "roadmap" && (
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--mute)]">
            Planned
          </span>
        )}
      </div>
    </article>
  );
}
