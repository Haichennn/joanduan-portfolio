"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Calendar } from "lucide-react";

function MailIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function LinkedinIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.339 18.337v-8.59H5.667v8.59h2.672zM7.003 8.574a1.548 1.548 0 100-3.096 1.548 1.548 0 000 3.096zm11.335 9.763v-4.706c0-2.385-.513-4.22-3.302-4.22-1.342 0-2.24.736-2.606 1.434h-.037V9.747h-2.566v8.59h2.671v-4.25c0-1.122.214-2.208 1.604-2.208 1.371 0 1.388 1.282 1.388 2.28v4.178h2.848z" />
    </svg>
  );
}

function GithubIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function CalendarIcon({ size = 12 }: { size?: number }) {
  return <Calendar size={size} strokeWidth={1.8} aria-hidden="true" />;
}

const contactLinks: {
  Icon: (props: { size?: number }) => React.JSX.Element;
  label: string;
  href: string;
  external: boolean;
}[] = [
  {
    Icon: LinkedinIcon,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/haichen-duan-6689192a7/",
    external: true,
  },
  {
    Icon: GithubIcon,
    label: "GitHub",
    href: "https://github.com/Haichennn",
    external: true,
  },
  {
    Icon: CalendarIcon,
    label: "Book 20 min",
    href: "https://calendly.com/haic-duan/intro-chat",
    external: true,
  },
];

function EmailLine({
  size,
  textClass,
  onAnyClick,
}: {
  size: number;
  textClass: string;
  onAnyClick?: () => void;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText("haic.duan@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API can fail in non-secure contexts (e.g. http) — silently no-op
    }
  }

  return (
    <div className="flex items-center gap-3 text-[var(--mute)]">
      <a
        href="mailto:haic.duan@gmail.com"
        aria-label="Open mail app to email Joan"
        onClick={onAnyClick}
        className="flex-shrink-0 hover:text-[var(--ink)] transition-colors"
      >
        <MailIcon size={size} />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={
          copied ? "Email address copied" : "Copy email address to clipboard"
        }
        className="group flex items-center gap-2 hover:text-[var(--ink)] transition-colors cursor-pointer"
      >
        <span className={`${textClass} group-hover:underline`}>
          {copied ? "Copied ✓" : "haic.duan@gmail.com"}
        </span>
        {copied ? (
          <Check
            size={size}
            strokeWidth={2}
            className="flex-shrink-0 text-[var(--accent)]"
            aria-hidden="true"
          />
        ) : (
          <Copy
            size={size}
            strokeWidth={1.8}
            className="flex-shrink-0 opacity-70 group-hover:opacity-100"
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
}

const sections = [
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "data-lab", label: "DATA LAB" },
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

        {/* CONTACT block — visually separated from nav above */}
        <div className="flex items-center gap-3 mt-12 md:mt-16">
          <span className="h-px w-3 bg-[var(--accent)]/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
            CONTACT
          </span>
          <span className="h-px w-3 bg-[var(--accent)]/60" />
        </div>
        <EmailLine
          size={10}
          textClass="font-mono text-[9px] tracking-tight"
        />
        {contactLinks.map(({ Icon, label, href, external }) => (
          <a
            key={href}
            href={href}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            className="group flex items-center gap-3 text-[var(--mute)] hover:text-[var(--ink)] transition-colors"
          >
            <span className="flex-shrink-0">
              <Icon size={10} />
            </span>
            <span className="font-mono text-[9px] tracking-tight group-hover:underline">
              {label}
            </span>
          </a>
        ))}
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

            {/* Mobile CONTACT block — visually separated from nav above */}
            <div className="flex items-center gap-3 mt-8">
              <span className="h-px w-4 bg-[var(--accent)]/60" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent)]">
                CONTACT
              </span>
              <span className="h-px w-4 bg-[var(--accent)]/60" />
            </div>
            <EmailLine
              size={14}
              textClass="font-mono text-sm tracking-tight"
              onAnyClick={() => setIsOpen(false)}
            />
            {contactLinks.map(({ Icon, label, href, external }) => (
              <a
                key={href}
                href={href}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-3 text-[var(--mute)] hover:text-[var(--ink)] transition-colors"
              >
                <span className="flex-shrink-0">
                  <Icon size={14} />
                </span>
                <span className="font-mono text-sm tracking-tight group-hover:underline">
                  {label}
                </span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
