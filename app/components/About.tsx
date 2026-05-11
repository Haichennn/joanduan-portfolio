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
      "In 2025 I helped run operations for a 1.6M-follower content creator — analytics, community management, video production. I watched the comment data tell truths her audiences would never say to her face.",
      "That's the work I want to keep doing: building the back-end that lets the front-line breathe.",
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
                TUM · CIT
              </p>
            </div>

            {/* Body content */}
            <div className="px-5 pt-5 pb-6 h-full flex flex-col">
              <div>
                <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--accent)]">
                  Contact
                </div>
                <div className="mt-2 flex flex-col gap-1 text-[12px] text-[var(--ink)] leading-snug">
                  <a href="mailto:haic.duan@gmail.com" className="hover:text-[var(--accent)] transition-colors">
                    haic.duan@gmail.com
                  </a>
                  <a href="https://github.com/Haichennn" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                    github.com/Haichennn
                  </a>
                  <a href="https://www.linkedin.com/in/haichen-duan-6689192a7/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                    in/haichen-duan
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--accent)]">
                  Location
                </div>
                <div className="mt-1.5 text-[13px] text-[var(--ink)]">
                  Munich, DE
                </div>
              </div>

              <div className="mt-auto flex flex-col items-center gap-3">
                <div className="w-8 h-px bg-[var(--accent)]" />
                <div className="font-[family-name:var(--font-display)] italic text-[15px] text-[var(--accent)] leading-snug text-center">
                  Probare et Aedificare.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-24 md:py-48 px-6 bg-[var(--base)]">
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
