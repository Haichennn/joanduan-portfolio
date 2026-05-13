"use client";

import { useState } from "react";
import Image from "next/image";

const ANALYSIS = {
  image: "/demo-case/hero-v0-3.png",
  title: "joanduan.dev — hero (v0.3)",
  sections: [
    {
      label: "compositional structure",
      bullets: [
        "Focal point is the stippled HAICHEN wordmark, in deliberate tension with the darker central column framing the tagline.",
        "Hierarchy descends by scale: oversized serif wordmark, mono greeting, body tagline, bracketed tags as a terminal cadence.",
        "Three-zone horizontal grid keyed to the footer labels — the scattered translucent squares on the left function as a literal illustration of the 'perception' zone, not ambient texture.",
      ],
    },
    {
      label: "color hierarchy",
      bullets: [
        "88% ivory ground · 8% ink (typography, wordmark stipple) · 3% mute gray (nav, micro-labels) · 1% caramel (tags, ABOUT underline).",
        "Technically balanced for minimalist editorial, but tonally unbalanced for the stated 'warm terminal' brand — caramel clusters in one horizontal band at the bottom.",
        "The upper two-thirds carries no warm anchor — reads closer to monastic-Swiss than to the warmth the brand claims.",
      ],
    },
    {
      label: "suggested refinement",
      applied: true,
      appliedNote: "v0.3 lockup promoted to caramel",
      bullets: [
        "Promote a single element above the fold into caramel — specifically the JOANDUAN.DEV · V0.3 lockup in the top-right.",
        "Accent color now bookends the composition vertically instead of concentrating in one band — resolves the warmth deficit without adding a fifth token.",
      ],
    },
  ],
};

export default function CompositionalReading() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--mute)]/70 hover:text-[var(--accent)] hover:underline underline-offset-4 decoration-[var(--accent)]/40 transition-colors duration-300 pointer-events-auto cursor-pointer"
      >
        see how this page reads itself →
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6 py-8 bg-[var(--ink)]/40 backdrop-blur-sm pointer-events-auto"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-[var(--base)] max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-[var(--ink)]/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 font-mono text-xs text-[var(--mute)] hover:text-[var(--ink)] transition-colors"
              aria-label="close"
            >
              ✕
            </button>

            <div className="px-8 py-10 md:px-12 md:py-14">
              <div className="mb-8 pb-6 border-b border-[var(--ink)]/8">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--mute)]/70">
                  · compositional reading
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-[var(--ink)] mt-2">
                  {ANALYSIS.title}
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div className="relative">
                  <div className="relative aspect-[16/10] border border-[var(--ink)]/10 overflow-hidden bg-[var(--ink)]/5">
                    <Image
                      src={ANALYSIS.image}
                      alt="hero v0.3 screenshot"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--mute)]/60 mt-2">
                    input · screenshot
                  </div>
                </div>

                <div className="flex flex-col gap-8">
                  {ANALYSIS.sections.map((section, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--ink)]/80">
                          · {section.label}
                        </div>
                        {section.applied && (
                          <span className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 border border-[var(--accent)]/40 text-[var(--accent)] bg-[var(--accent)]/5">
                            ✓ applied
                          </span>
                        )}
                      </div>
                      <ul className="flex flex-col gap-2">
                        {section.bullets.map((bullet, j) => (
                          <li
                            key={j}
                            className="font-display text-sm leading-relaxed text-[var(--ink)]/85 pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[var(--mute)]/50"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      {section.appliedNote && (
                        <div className="mt-3 pl-4 font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--accent)]/80">
                          ↳ {section.appliedNote}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-[var(--ink)]/8 font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--mute)]/60">
                · the page reads itself · feedback loop closed
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
