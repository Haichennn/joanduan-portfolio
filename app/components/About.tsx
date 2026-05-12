"use client";

import React, { useState, useRef, useEffect } from "react";

const chapters = [
  {
    title: "THE MOVE",
    paragraphs: [
      "Five cities, three languages, two school systems before I turned 18 — Shenzhen, London, Paris, Frankfurt, Munich.",
      "Mandarin at home, English across continents, German learned by immersion. I learned to read environments faster than I learned grammar. That's still how I work.",
    ],
  },
  {
    title: "THE VOICE",
    paragraphs: [
      "I grew up impulsive — quick to opinion, slow to proof. Then I moved to a country where every sentence has to carry its own evidence. It rewires you. Mine got rewired.",
      "Now: I notice patterns first, name them last. Quality travels further than volume. The best ideas in a room are the ones nobody's made simple yet — and made true.",
    ],
  },
  {
    title: "THE CLIMB",
    paragraphs: [
      "I keep picking the harder track. High school, university, every choice between an easier path and a steeper one — I go steeper. Not for the view. For the legs you build climbing it.",
      "Here I'm surrounded by people years ahead of me on the curve. I'm not intimidated — I'm calibrating. The point of climbing isn't to be the tallest. It's to keep finding harder mountains.",
    ],
  },
  {
    title: "THE PIVOT",
    paragraphs: [
      "I chose Wirtschaftsinformatik because the bridge between business analysis and code is where the real problems live. Pure tech misses the why. Pure business misses the how.",
      "I'd rather build the bridge than guard one shore.",
    ],
  },
  {
    title: "THE BRIDGE",
    paragraphs: [
      "My mother is an engineering designer. She designs hardware — conferencing systems and the equipment deployed in meeting rooms around the world.",
      "I grew up watching her work. Drawing on the screen, running the meeting, making the call. Every product she shipped did two things: contributed to the business, and got used by real people in real rooms.",
      "She does this in mechanical engineering. I want to do it in computer science. Different stack, same kind of work — sustainable products that create value for the business and the people who use it.",
    ],
  },
  {
    title: "CURIOSITIES",
    paragraphs: [
      "Things I'm exploring beyond the day-to-day: product strategy, human-computer interaction, applied AI in everyday tools. Different pace, different scale — but every one of them is on its way to becoming work, not staying as wishlist.",
    ],
  },
  {
    title: "THE BELIEF",
    paragraphs: [
      "The best technology is the kind you forget you're using — because it works the way you already think. The worst makes you translate yourself before it understands you.",
      "The work, for me, is closing that gap.",
    ],
  },
];

function Chapter({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-8">
        {title}
      </h3>
      <div className="space-y-6">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="font-sans text-base md:text-lg text-[var(--ink)]/80 leading-relaxed"
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

function IDBadge() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setHasEntered(true), 150)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10
    setTilt({ x, y })
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 })
  }

  function handleDoubleClick() {
    setIsFlipped(!isFlipped)
  }

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center"
      style={{ perspective: '1500px' }}
    >
      {/* V-shaped lanyard with metal clip */}
      <svg width="200" height="170" viewBox="0 0 200 170" className="block mx-auto -mb-4 relative z-10">
        <polygon points="22,0 40,0 108,128 92,128" fill="var(--ink)" />
        <polygon points="160,0 178,0 108,128 92,128" fill="var(--ink)" />
        <rect x="78" y="126" width="44" height="14" fill="#9a9a9a" stroke="#444" strokeWidth="0.5" />
        <line x1="78" y1="133" x2="122" y2="133" stroke="#444" strokeWidth="0.5" />
        <circle cx="100" cy="155" r="6" fill="none" stroke="#666" strokeWidth="2" />
      </svg>

      {/* Card with entrance + sway animation wrapper */}
      <div
        className={`relative transition-all duration-700 ease-out ${
          hasEntered ? 'badge-swing' : 'opacity-0 -translate-y-32'
        }`}
        style={{ transformOrigin: 'top center' }}
      >
        {/* Card with flip + parallax */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onDoubleClick={handleDoubleClick}
          className="relative cursor-pointer select-none"
          style={{
            width: '260px',
            height: '420px',
            transformStyle: 'preserve-3d',
            transform: `rotateY(${isFlipped ? 180 : 0}deg) rotateX(${tilt.y}deg) rotateZ(${tilt.x * 0.3}deg)`,
            transition: 'transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)',
          }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 flex flex-col"
            style={{
              backfaceVisibility: 'hidden',
              background: '#FCFAF5',
              boxShadow: `
                0 1px 0 rgba(0,0,0,0.04) inset,
                0 -1px 0 rgba(0,0,0,0.06) inset,
                0 2px 4px rgba(0,0,0,0.04),
                0 12px 24px -6px rgba(0,0,0,0.18),
                0 24px 48px -12px rgba(0,0,0,0.12)
              `,
            }}
          >
            {/* Punch hole at very top */}
            <div className="w-full flex justify-center pt-3 pb-1">
              <div
                className="w-10 h-2 rounded-full"
                style={{
                  background: 'rgba(0,0,0,0.12)',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.25)',
                }}
              />
            </div>

            {/* Caramel TUM band */}
            <div className="w-full bg-[var(--accent)] py-2 px-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--base)] text-center">
                TUM · CIT
              </p>
            </div>

            {/* Photo — dominant, ~55% of card height */}
            <div className="flex-1 w-full flex items-center justify-center px-4 pt-0 pb-2">
              <img
                src="/me.jpg"
                alt="Haichen Duan"
                className="w-full h-full object-cover"
                style={{
                  maxWidth: '210px',
                  maxHeight: '230px',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
              />
            </div>

            {/* Name + caption block */}
            <div className="px-5 pt-3 pb-4 text-center">
              <div className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] leading-tight">
                Haichen Duan
              </div>
              <div className="mt-2 font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--accent)]">
                Designer · Engineer · Analyst
              </div>
              <div className="my-3 mx-auto w-8 h-px bg-[var(--accent)]" />
              <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-[var(--mute)]">
                B.Sc. Information Systems
              </div>
              <div className="mt-3 font-mono text-[8px] tracking-[0.15em] uppercase text-[var(--mute)] opacity-60">
                Double-tap to flip
              </div>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 flex flex-col"
            style={{
              backfaceVisibility: 'hidden',
              background: '#FCFAF5',
              transform: 'rotateY(180deg)',
              boxShadow: `
                0 1px 0 rgba(0,0,0,0.04) inset,
                0 -1px 0 rgba(0,0,0,0.06) inset,
                0 2px 4px rgba(0,0,0,0.04),
                0 12px 24px -6px rgba(0,0,0,0.18),
                0 24px 48px -12px rgba(0,0,0,0.12)
              `,
            }}
          >
            {/* Punch hole */}
            <div className="w-full flex justify-center pt-3 pb-1">
              <div
                className="w-10 h-2 rounded-full"
                style={{
                  background: 'rgba(0,0,0,0.12)',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.25)',
                }}
              />
            </div>

            {/* Caramel TUM band */}
            <div className="w-full bg-[var(--accent)] py-2 px-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--base)] text-center">
                TUM · WIRTSCHAFTSINFORMATIK
              </p>
            </div>

            {/* Contact heading */}
            <div className="px-5 pt-6 pb-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent)] mb-1">
                Contact
              </p>
              <p className="font-display text-xl text-[var(--ink)] tracking-tight mb-4">
                Haichen Duan
              </p>
              <div className="w-12 h-px bg-[var(--accent)] mb-6" />
            </div>

            {/* Icons row */}
            <div className="flex-shrink-0 flex items-start justify-center gap-6 px-5">
              <a
                href="https://github.com/Haichennn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[var(--ink)]/70 hover:text-[var(--accent)] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/haichen-duan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[var(--ink)]/70 hover:text-[var(--accent)] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.339 18.337v-8.59H5.667v8.59h2.672zM7.003 8.574a1.548 1.548 0 100-3.096 1.548 1.548 0 000 3.096zm11.335 9.763v-4.706c0-2.385-.513-4.22-3.302-4.22-1.342 0-2.24.736-2.606 1.434h-.037V9.747h-2.566v8.59h2.671v-4.25c0-1.122.214-2.208 1.604-2.208 1.371 0 1.388 1.282 1.388 2.28v4.178h2.848z"/>
                </svg>
              </a>
              <a
                href="mailto:haichen.duan@tum.de"
                aria-label="Email"
                className="text-[var(--ink)]/70 hover:text-[var(--accent)] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </a>
            </div>

            {/* Location */}
            <div className="px-5 pt-6 pb-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent)] mb-2">
                Location
              </p>
              <p className="font-sans text-sm text-[var(--ink)]">
                Munich, DE
              </p>
            </div>

            {/* Footer */}
            <div className="w-full px-5 pb-5 mt-auto flex flex-col items-center">
              <div className="w-8 h-px bg-[var(--accent)] mb-3" />
              <p className="font-[family-name:var(--font-display)] italic text-sm text-[var(--accent)] text-center">
                Probare et Aedificare.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
          <div className="md:col-span-2 space-y-20 md:space-y-24 order-2 md:order-1">
            <header className="mb-24 md:mb-32">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--mute)] mb-6 md:mb-8">
                — ABOUT —
              </p>
              <h2 className="font-display text-5xl md:text-6xl text-[var(--ink)] leading-[1.05] tracking-tight">
                Probare<br />et Aedificare.
              </h2>
              <p className="font-sans text-base md:text-lg text-[var(--mute)] italic mt-6 max-w-xl">
                To prove, and to build.
              </p>
            </header>

            {chapters.map((c, i) => (
              <Chapter key={i} title={c.title} paragraphs={c.paragraphs} />
            ))}
          </div>

          <div className="md:col-span-1 order-1 md:order-2 flex justify-center md:justify-start md:sticky md:top-20 md:self-start">
            <IDBadge />
          </div>
        </div>
      </div>
    </section>
  );
}
