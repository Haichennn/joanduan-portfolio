"use client";

import { useState, useEffect } from "react";

const sections = [
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "interview", label: "INTERVIEW" },
];

export default function SideNav() {
  const [activeId, setActiveId] = useState<string>("about");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibilityMap = new Map<string, number>();

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibilityMap.set(id, entry.intersectionRatio);
          });
          let maxId = activeId;
          let maxRatio = 0;
          visibilityMap.forEach((ratio, sectionId) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              maxId = sectionId;
            }
          });
          if (maxRatio > 0) setActiveId(maxId);
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [activeId]);

  function handleClick(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6">
      {sections.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <span
              className={
                isActive
                  ? "h-px transition-all duration-200 w-6 bg-[var(--accent)]"
                  : "h-px transition-all duration-200 w-3 bg-[var(--mute)]/40 group-hover:w-6 group-hover:bg-[var(--ink)]"
              }
            />
            <span
              className={
                isActive
                  ? "font-mono text-[10px] uppercase tracking-[0.3em] transition-colors duration-200 text-[var(--ink)]"
                  : "font-mono text-[10px] uppercase tracking-[0.3em] transition-colors duration-200 text-[var(--mute)] group-hover:text-[var(--ink)]"
              }
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
