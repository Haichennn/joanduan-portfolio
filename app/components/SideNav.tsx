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
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
  }

  return (
    <>
      {/* Desktop SideNav — right edge, vertical (unchanged) */}
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

      {/* Mobile hamburger trigger — top-right corner */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 right-5 z-[60] md:hidden w-10 h-10 flex items-center justify-center bg-[var(--base)]/85 backdrop-blur-md border border-[var(--ink)]/10 font-mono text-[var(--accent)] text-base cursor-pointer transition-all"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-[var(--base)]/95 backdrop-blur-md flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <nav
            className="flex flex-col gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            {sections.map(({ id, label }) => {
              const isActive = activeId === id;
              return (
                <button
                  key={id}
                  onClick={() => handleClick(id)}
                  className="group flex items-center gap-4 cursor-pointer"
                >
                  <span
                    className={
                      isActive
                        ? "h-px transition-all duration-200 w-8 bg-[var(--accent)]"
                        : "h-px transition-all duration-200 w-4 bg-[var(--mute)]/40"
                    }
                  />
                  <span
                    className={
                      isActive
                        ? "font-mono text-base uppercase tracking-[0.3em] transition-colors duration-200 text-[var(--accent)]"
                        : "font-mono text-base uppercase tracking-[0.3em] transition-colors duration-200 text-[var(--mute)]"
                    }
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
