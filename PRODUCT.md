# Product

## Register

brand

## Users

**Primary audience (one portfolio, two adjacent lanes — both read the same site):**

**Lane A — Tech & AI startups.** Recruiters and hiring managers at AI-native startups and growth-stage tech companies, evaluating Joan for Werkstudent or Praktikum roles in data, AI, digital product, or design-engineering. Reads the site looking for: craft signal, evidence of having actually built things, comfort with ambiguity, technical fluency without engineer-bro affect. Will tolerate (and reward) opinion and aesthetic distinctiveness.

**Lane B — Tech consulting & DAX in-house digital teams.** Recruiters and hiring managers at strategy/digital consulting (Accenture, Capgemini, Deloitte Digital) and DAX in-house digital units (BMW, Allianz, SAP, Siemens, Bosch). Evaluating Joan for Werkstudent, Praktikum, or graduate roles in digital strategy, UIUX, or business-information-systems work. Reads the site looking for: maturity, polish, communication clarity, evidence of structured thinking. Will reject anything that reads as art-school self-indulgent or technically frivolous.

**Critical design constraint:** the same surface must be credible to BOTH reads simultaneously. The base layer (typography, spacing, hairline scaffolding, mono micro-labels, editorial copy) stays restrained and polished — passes the consulting/DAX read. Two prominent technical moments carry the AI signal for the startup read: **(1)** the Hero particle state machine paired with the Compositional Reading modal feedback loop, and **(2)** the Interview Me RAG chat. The per-project custom data visualizations in Projects and Data Lab carry the analytical signal for both audiences simultaneously.

**Secondary visitor:** peer designers, design leads, and potential collaborators who recognize considered craft. They amplify reach by sharing the link and remembering the name.

**Context of use:** desktop browser during a hiring evaluation (laptop, often muted by default), or mobile during an evening recall ("what was that portfolio I saw earlier"). Always discretionary attention — the visitor chose to be here, and can leave at any moment.

**Job-to-be-done:** confirm that Joan thinks carefully, builds sustainably, and would do real work. Distinguish her from the dozens of CS-template and SaaS-cream portfolios that arrived in the same recruiting pipeline — without sliding into the opposite failure mode of art-school portfolio aesthetics that disqualify her for consulting and DAX roles.

## Product Purpose

Joan's personal portfolio at `joanduan.dev`. The portfolio's purpose is to convert recruiter attention into outreach (email, LinkedIn message, Calendly booking) by demonstrating — not asserting — that the author is a designer-developer-analyst of unusual editorial sensibility, with the work to back it.

**Success:** a recruiter or collaborator closes the tab thinking *"this person is rare"* and reaches out. Memorability and reachout-rate are the dual signals; craft is the mechanism that produces both.

**What it is NOT:** an exhaustive case-study repository. A resume mirror. A blog. A SaaS landing for a fictional product. A "modern minimalist" template.

## Information Architecture

The portfolio is a single scrolling surface with **six top-level sections in fixed order**, plus a **right-side sticky sidebar** that persists across all sections. The canonical IA is locked and reflects what is built in v0.3.

### Top-level sections (in order)

#### 1. Hero

Background canvas: 12,000-particle system implementing the "AI Vision Evolution" concept with three choreographed states (Perception, Comprehension, Composition).

Center typographic stack, in order top to bottom:

- Mono kicker: `HELLO, I'M HAICHEN.`
- Giant Fraunces serif wordmark: `HAICHEN` (first name only — deliberate restraint). Particle reveal on mount: particles disperse from random positions and coalesce into the typographic form. Particles colored in Burnt Sienna. Soft elliptical glow behind the wordmark for legibility against the noise canvas.
- Three-line intent copy, centered:
  - "Building things that make sense to the people who actually use them."
  - "Trying to think clearly when most things compete for attention."
  - "Quietly obsessed with details most people skip."
- Three pillar chips, mono in Burnt Sienna, square-bracket flanked: `[BUILDER]  [CREATOR-LITERATE]  [AI-NATIVE]`

Top-right lockup: `JOANDUAN.DEV · V0.3` in mono, **Burnt Sienna** (not mute gray). This is the v0.3 refinement applied to bookend the composition vertically against the pillar chips at the bottom — resolving the upper-two-thirds warmth deficit identified by the Compositional Reading modal.

Bottom strip, mono micro-labels arranged in three columns:

- left: `NOW · INGEST · LEARN · SHIP` over `· PERCEPTION`
- center: `· COMPREHENSION`
- right: `SEE HOW THIS PAGE READS ITSELF →` over `· COMPOSITION`

The right arrow is a button. On click, it opens the Compositional Reading modal described below.

#### 2. About

Section heading: en-dash flanked `– ABOUT –`.
Title: `Probare et Aedificare.` Subtitle: `To prove, and to build.`

Seven chapters: `THE MOVE`, `THE VOICE`, `THE CLIMB`, `THE PIVOT`, `THE BRIDGE`, `CURIOSITIES`, `THE BELIEF`.

TUM ID Badge component on the right (sticky on desktop): lanyard mark on top, badge below with photo, `DESIGNER · ENGINEER · ANALYST` role row, `B.SC. INFORMATION SYSTEMS` credential row, `DOUBLE-TAP TO FLIP` instruction. Badge has stacked shadows, parallax tilt on cursor movement, flip animation on double-tap.

The TUM ID Badge **IS** the earned layered exception per Elevation doctrine. It is the only component on the site permitted to use shadows and 3D treatment.

#### 3. Experience

Section heading: en-dash flanked `– EXPERIENCE –`.
Title: `Where the resume lives.`

Editorial timeline format. Per entry: mono date range left rail, serif role title, mono subtitle (channel / org / context), outcome bullets with Burnt Sienna em-dash leaders, mono skill tag row, optional afterthought-project link with arrow.

First entry: Co-founder of Content Operations, 1.6M-follower creator channel (Bilibili / Douyin).

Closing line: `MORE TO COME, CURRENTLY LOOKING FOR INTERNSHIP ROLES`.

#### 4. Projects

Section heading: en-dash flanked `– PROJECTS –`.
Title: `What I'm working on.`
Subtitle: `Seven projects. Two live, one in progress, four on the roadmap.`

Seven entries. Each entry pairs a **custom data visualization preview** with the project description. Per entry layout:

- Custom viz container with status badge in a corner pill: `LIVE` / `IN PROGRESS` / `BUILDING` / `PLANNED` / `ROADMAP`
- Category tag in Burnt Sienna: e.g. `ENGINEERING / FRONTEND`, `DATA / ANALYTICS`, `AI / AUTOMATION`, `DATA / FORECASTING`, `AI / RESEARCH`, `AI / NLP`
- Serif project title
- Body copy
- Stack chip row (mono, hairline-framed)
- Date stamp + `VIEW` / `CODE` / `DEMO` links with arrows

Project list: joanduan.dev, WayBack, Creator Economy Analytics, AI Sales Workflow CLI, Industrial Sales Forecasting, AI Vision Evolution, NLP on Creator Comments.

#### 5. Data Lab

Section heading: en-dash flanked `– DATA LAB –`.
Title: `Smaller experiments.`
Subtitle: `Focused analytical notebooks and dashboards, narrower in scope than the projects above, but built end-to-end on real data.`

Entries are **compact cards** (smaller than Projects entries). The scope axis (featured vs smaller experiments) is what differentiates Projects from Data Lab — not a build-vs-analysis axis. Currently one entry: P&C Insurance Analytics Dashboard (678K policies, 25K claims, 4 views, hairline-divided stat row, mono stack tags, date, `LIVE` badge, `VIEW` link).

#### 6. Interview Me

Section heading: en-dash flanked `– INTERVIEW ME –`.
Title: `Curious about something I haven't covered?`
Body: `Ask. I've trained a model on my background to answer, in my voice, with my reasoning. Try it like a 5-minute screening call.`

Suggested-prompt chips (4 default, hairline-framed). Free text input with single send icon-button — **the one allowed filled affordance on the site**. Closing line in mono: `LIKED WHAT I SAID? REACH OUT AT haic.duan@gmail.com` with the email in Burnt Sienna.

**Implementation:** RAG-powered. Voyage AI embeddings on a ground-truth corpus of Joan's real work and writing. Claude API streaming for generation. Production guardrails: rate-limit handling, budget controls, adversarial-tested hallucination guards, graceful fallback to direct email contact.

### Right-side sticky sidebar (persists across all sections)

**Section nav**, mono with em-dash prefix:

- `— ABOUT`
- `— EXPERIENCE`
- `— PROJECTS`
- `— DATA LAB`
- `— INTERVIEW`

**Audio affordance**, mono in Burnt Sienna, sits above CONTACT block:

`♪ READY · HOVER ME`

Behavior: hover activates ambient Web Audio. Mouse-leave does NOT stop audio (let it breathe). Click on the label toggles audio off. Tab title gains a speaker icon when audio is active. Audio defaults to OFF on page load. State persists across in-page navigation but resets on full reload.

**Contact block**, mono with em-dash both sides as a block opener:

`— CONTACT —`

Below, hairline-divided rows:

- mail icon · `haic.duan@gmail.com` · [copy icon]
- in icon · LinkedIn
- gh icon · GitHub
- cal icon · Book 20 min

### Hero features (not separate IA sections)

**A. Particle state machine.** The 12K-particle canvas cycles through three states tied to the AI Vision Evolution narrative: Perception, Comprehension, Composition. Cycle is triggered manually by clicking `SEE HOW THIS PAGE READS ITSELF →` in Hero bottom-right. Each state shifts particle distribution, density, and color to suggest the conceptual phase.

**B. Compositional Reading modal — second technical moment of the site.** Linked from the same `SEE HOW THIS PAGE READS ITSELF →` affordance. Opens a centered, ivory-background modal overlay (NOT a separate route) that closes the AI Vision Evolution feedback loop by performing a compositional reading of the Hero page itself.

Modal layout:

- Close icon top-right (×)
- Mono kicker: `· COMPOSITIONAL READING`
- Serif title: `joanduan.dev — hero (v0.3)`
- Hairline horizontal rule below title
- Two-column body:
  - **Left column:** hairline-bordered thumbnail of the Hero page itself. Caption below in mono: `INPUT · SCREENSHOT`.
  - **Right column:** sectioned bulleted analysis. Each section heading mono with leading mid-dot. Body bullets serif with leading em-dash leaders in Burnt Sienna. Sections: `· COMPOSITIONAL STRUCTURE`, `· COLOR HIERARCHY`, `· SUGGESTED REFINEMENT` (with `[✓ APPLIED]` chip in Burnt Sienna hairline). Closes with `↳ V0.3 LOCKUP PROMOTED TO CARAMEL` in mono Burnt Sienna.

Footer of modal, mono micro-label centered: `· THE PAGE READS ITSELF · FEEDBACK LOOP CLOSED`.

**Conceptual function:** the modal demonstrates the AI workflow (perceive, comprehend, compose) on the page itself. The refinement is actually applied to the underlying Hero (the V0.3 lockup in Burnt Sienna is visible evidence). The loop closes. This is the second technical moment of the site after Interview Me.

### Em-dash and divider conventions (do not conflate)

The site uses **five distinct em-dash / en-dash patterns**, each with a specific role. Conflating them is a design error.

**(a) Section heading in body content:** en-dash flanked. Format: `– SECTION –`. Example: `– ABOUT –` above the `Probare et Aedificare.` title.

**(b) Right sidebar nav:** em-dash prefix only. Format: `— SECTION`. Examples: `— ABOUT`, `— EXPERIENCE`, `— PROJECTS`.

**(c) Right sidebar CONTACT block opener:** em-dash flanked. Format: `— BLOCK —`. Example: `— CONTACT —`, signaling that contact rows follow below.

**(d) Bullet leaders in body copy** (Experience outcomes, Compositional Reading modal analysis): leading em-dash in Burnt Sienna.

**(e) Inline em-dashes in prose:** NOT used in body copy. Default to commas, parentheses, or semicolons. This is a brand-prose constraint distinct from the design-element conventions above.

## Brand Personality

**Three-word personality:** Editorial. Patient. Distinctive.

**Voice anchor (from `ABOUT_DRAFT.md`):**

> "Editorial woman who writes code."
>
> "Sustainability and accuracy are the most important. I'm not here to participate in competition. I'm here to do real work."

**Tone:** long-form when appropriate, declarative when not. Climber framing (the project is a steep track she chose, not a sprint to win). Evidence before flourish — every claim sits next to its demonstration. The portfolio rewards the slow read and survives the fast scan.

**Emotional goal for the visitor:** competence with restraint. The visitor should feel: *this person notices things I don't, and would build the thing I haven't asked for yet.*

## Anti-references

**SaaS-cream Linear/Vercel/Notion clone.** Explicitly rejected lane. Specifically rules out:

- Gradient orbs, animated gradient blur backgrounds
- Big rounded primary buttons as a hero affordance
- Hero headlines of the form "Build the future" / "Launch your X" / "The X for Y"
- Fake dashboard screenshots in the hero or marketing sections
- Purple-pink gradients on white
- Centered hero with two buttons and a feature grid
- "Made with Next.js" template-y feel — the framework should disappear, not announce itself
- Generic 8px-rounded card grids representing projects

This is the default lane an AI code assistant will pull a Next.js + Tailwind portfolio toward. The PRODUCT.md anti-reference exists so every design decision can check itself against it: *is this drifting toward SaaS-cream? rework.*

## Design Principles

1. **Craft IS the resume.** Every typographic decision, every interaction, every line of CSS is a working sample of how the author thinks. The visitor leaves knowing how Joan works, not what she claims.

2. **Patience beats performance.** No "look at me" peacocking — no autoplay video, no scroll-jacked drama, no animated counters, no popups, no autoplaying audio. The portfolio earns attention by being readable, not by demanding it.

3. **Evidence over assertion.** Don't write "skilled in design"; show a designed object that proves it. Every claim has a demonstration adjacent to it. The About section is itself a designed artifact. The Compositional Reading modal IS the proof of how Joan thinks about visual composition. The Interview Me RAG chat IS the proof that she can ship a real LLM feature.

4. **Distinct doesn't mean loud.** Distinctiveness comes from restraint and considered choices, not from maximalist effects. A 65–75ch column of well-typeset Fraunces beats any custom WebGL background — except where the WebGL itself IS the substantive engineering moment (the Hero particle canvas).

5. **Built for the slow read AND the fast scan.** The portfolio works in 15 seconds (recruiter triage) AND in 15 minutes (designer-collaborator deep read). Both audiences receive a coherent surface — the difference is only how deep they go.

6. **Restrained base, earned technical moments.** The portfolio runs on two read-layers in parallel. The base layer (typography, spacing, color, navigation, copy) stays restrained, mature, and polished — credible to a DAX or consulting recruiter scanning for "would this person represent us at a client meeting." Two prominent technical moments — **(1)** the Hero particle state machine + Compositional Reading modal feedback loop, and **(2)** the Interview Me RAG chat — demonstrate engineering and design depth, credible to an AI-startup recruiter scanning for "can this person actually build." Per-project custom data visualizations in Projects and Data Lab carry analytical signal for both audiences simultaneously. Every technical moment must pass the test *"does this read as substantive engineering or as decorative novelty?"* — if the answer is the latter, cut it.

## Accessibility & Inclusion

**Standard:** WCAG 2.2 AA, baseline commitment for every page.

### Hero

- **`prefers-reduced-motion: reduce`:** particle reveal replaced by an immediate composed wordmark. Particle state machine replaced by a static end-state. No state transitions animate. Parallax disabled on TUM ID Badge (flip animation still triggerable by double-tap since it is user-initiated).
- **Ambient Web Audio:** **NEVER autoplays.** Requires explicit hover on the `♪ READY · HOVER ME` affordance. Mute affordance is always visible via the same label (click toggles off). State respects user choice.

### Compositional Reading modal

- Traps focus when open. Escape key closes. Background page is inert during open state. Modal title is the first focusable element.
- **`prefers-reduced-motion: reduce`:** modal opens with opacity transition only, no scale or slide animation.

### Semantic DOM

- The wordmark `HAICHEN` must exist as a semantic `<h1>` in the **initial server-rendered HTML**. Do not gate it on JS load. Particle animation is visual enhancement only. **Test: view-source must contain `<h1>HAICHEN</h1>`. Disable JS in DevTools and confirm the name remains readable.**
- All section headings use proper `<h2>` elements. The mono `– SECTION –` treatment is presentational (via `::before` / `::after` pseudo-elements or `aria-hidden` spans). **Screen readers should read "About", not "dash dash about dash dash".**

### Color contrast

- Burnt Sienna `#A0673E` on Ivory `#FAF8F5`: approximately 4.8:1 contrast — passes WCAG AA for normal text.
- For small text **below 18pt regular or 14pt bold** (pillar chips, micro-labels, version lockup, em-dash bullet leaders, all the small mono structural typography), darken to **`#8C5836`** to retain AA. Use this variant wherever Burnt Sienna would otherwise fall below WCAG AA at small sizes.

### Keyboard navigation

- Every interactive element reachable by Tab in logical order. Visible `:focus-visible` indicator on every focusable element. No keyboard traps (except the Compositional Reading modal, which intentionally traps focus while open).
- Interview Me input is keyboard-submittable (Enter key) in addition to the send icon-button.

### Reader compatibility

- The editorial copy (About chapters, Experience outcomes, Compositional Reading analysis) must read coherently in linear screen-reader order. No decorative-but-illegible custom typography that breaks for assistive tech.
- The Interview Me chat is announced via `aria-live` so screen readers receive streamed responses.
