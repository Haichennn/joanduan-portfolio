---
name: joanduan.dev
description: Personal portfolio of Haichen "Joan" Duan — editorial typographic register, single warm-earth accent, restrained chrome with two earned technical moments (Hero particle state machine + Compositional Reading modal, and Interview Me RAG chat).
colors:
  ink: "#1A1A1A"
  base: "#FAF8F5"
  accent: "#A0673E"
  accent-small: "#8C5836"
  mute: "#8B8B8B"
  grid-line: "rgba(0, 0, 0, 0.06)"
  badge-paper: "#FCFAF5"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw, 3.75rem)"
    fontWeight: 400
    lineHeight: "1.05"
    letterSpacing: "-0.01em"
  display-xl:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(4rem, 14vw, 12rem)"
    fontWeight: 400
    lineHeight: "0.95"
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: "1.15"
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: "1.6"
  body-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.6"
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: "1"
    letterSpacing: "0.3em"
  label-micro:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: "1"
    letterSpacing: "0.2em"
rounded:
  none: "0px"
  pill: "9999px"
spacing:
  hairline: "1px"
  micro: "4px"
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "48px"
  xl: "96px"
  section: "192px"
components:
  nav-link-active:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "0"
  nav-link-rest:
    textColor: "{colors.mute}"
    typography: "{typography.label}"
    padding: "0"
  nav-link-rule-active:
    backgroundColor: "{colors.accent}"
    width: "24px"
    height: "1px"
  nav-link-rule-rest:
    backgroundColor: "{colors.mute}"
    width: "12px"
    height: "1px"
  audio-toggle:
    textColor: "{colors.accent}"
    typography: "{typography.label-micro}"
    padding: "0"
  badge-card:
    backgroundColor: "{colors.badge-paper}"
    textColor: "{colors.ink}"
    typography: "{typography.headline}"
    width: "260px"
    height: "420px"
  badge-band:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.base}"
    typography: "{typography.label-micro}"
    padding: "8px 12px"
  status-pill-live:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.base}"
    typography: "{typography.label-micro}"
    padding: "4px 10px"
    rounded: "{rounded.pill}"
  category-tag:
    textColor: "{colors.accent-small}"
    typography: "{typography.label-micro}"
    padding: "0"
  interview-send-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.base}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
---

# Design System: joanduan.dev

## 1. Overview

**Creative North Star: "The Working Notebook"**

Decision rule for ambiguous design calls: *"what would a field notebook do?"* Notebooks are flat, quiet, evidence-in-margins, page-as-thinking-record. Mono micro-labels function as marginalia. Hairlines function as ruler-drawn dividers. The page is a record of thinking, not a billboard.

The system is overwhelmingly cream and ink, with a single warm-earth accent — Burnt Sienna — that appears only where the page itself wants to point: active nav state, hover hairlines, the TUM ID band, pillar chips, em-dash bullet leaders, the v0.3 lockup top-right, the Compositional Reading kicker. The accent never covers more than ~10% of any screen surface.

The site holds two read-layers in parallel. The **base layer** stays restrained, mature, and polished — credible to the consulting / DAX recruiter (per `PRODUCT.md` §Users). Two **earned technical moments** carry the AI-startup craft signal: **(1)** the Hero particle state machine paired with the Compositional Reading modal feedback loop, and **(2)** the Interview Me RAG chat. The per-project custom data visualizations in Projects and Data Lab carry analytical signal for both audiences simultaneously.

This system explicitly rejects the **SaaS-cream Linear/Vercel/Notion clone** lane named in `PRODUCT.md`: no gradient orbs, no animated gradient blur, no fake dashboard screenshots, no "Build the future" hero copy, no big rounded primary buttons, no purple-pink gradients, no centered-hero-with-two-buttons-and-feature-grid. The framework disappears; the page does not announce its stack.

**Information Architecture (locked, per `PRODUCT.md` §IA):** six top-level sections in fixed order — Hero / About / Experience / Projects / Data Lab / Interview Me — plus a right-side sticky sidebar (section nav + audio affordance + CONTACT block) that persists across all sections.

**Key Characteristics:**

- Hairline + mono-label as the primary structural vocabulary (not boxes, not cards)
- Single warm-earth accent (Burnt Sienna `#A0673E`, darkened to `#8C5836` for small text below WCAG AA threshold)
- Fraunces serif reserved exclusively for display moments — never for body or label work
- Flat by default; one earned layered exception (the TUM ID Badge)
- Two earned technical moments (Hero particles + Compositional Reading modal; Interview Me RAG chat); both pass the substantive-engineering test
- 65–75ch body line length cap; layout breathes via spacing, not boxes
- Five em-dash / en-dash conventions, never conflated (see §6)

## 2. Colors

A restrained palette: tinted neutrals plus one warm-earth accent with a darkened small-text variant. The system is overwhelmingly cream and ink; color is a structural cue, not a tonal mood.

### Primary

- **Burnt Sienna** (`#A0673E`): The single signature accent. Used on hairlines, mono micro-labels at large-enough sizes, pillar chips, hover transitions, the TUM ID Badge band, single-data-point highlights in project viz previews, the `JOANDUAN.DEV · V0.3` lockup top-right of Hero, the Compositional Reading modal kicker and `FEEDBACK LOOP CLOSED` line, em-dash bullet leaders in Experience and the Compositional Reading modal, the email line in Interview Me closing copy. Contrast on Ivory `#FAF8F5`: approximately 4.8:1 — passes WCAG AA for normal text.
- **Burnt Sienna Dark** (`#8C5836`): The small-text variant. Used whenever Burnt Sienna would otherwise fall below WCAG AA at sizes below 18pt regular or 14pt bold — e.g. the category tags in Projects, the smallest mono micro-labels, em-dash bullet leaders if they render under 12px. Same hue, deeper lightness step; reads as the same color, passes WCAG AA at small sizes.

### Neutral

- **Heavy Ink** (`#1A1A1A`): All body text, structural elements (lanyard SVG, badge text, Interview Me send button background). Not pure black — a deliberate near-black that pairs with cream without the harsh contrast of `#000`.
- **Off-Cream Base** (`#FAF8F5`): The page background. Warm off-white, never bright `#fff`. The paper the notebook is printed on.
- **Mute Gray** (`#8B8B8B`): Secondary text, inactive nav labels, copyright-line work, micro-label muted variants. Quiet enough to recede, distinct enough to carry hierarchy.
- **Badge Paper** (`#FCFAF5`): A slightly creamer paper, used exclusively for the TUM ID Badge card face. Distinguishes the laminated object from the body of the page.
- **Grid Line** (`rgba(0, 0, 0, 0.06)`): The faint ruled line behind the CNN segment in the Hero. Never used elsewhere.

### Named Rules

**The One Accent Rule.** Burnt Sienna is the only signature accent. A second accent color is forbidden. If a future component needs an additional signal, it must be carried by typographic weight, mono-label tracking, or hairline rules — not by introducing a second hue.

**The No-Pure-Black Rule.** `#000` is banned. All ink work uses `#1A1A1A`. This keeps the system on a tinted-neutral register and prevents the AI-default reflex of pairing pure-black-with-pure-white.

**The 10% Accent Cap.** Burnt Sienna covers at most 10% of any visible screen area. The accent is rare; that rarity is the point. If a layout makes the accent appear common, the layout is wrong.

**The Small-Text Variant Rule.** Burnt Sienna `#A0673E` is used **only** at sizes 18pt regular / 14pt bold and above. Below that threshold, `#8C5836` must be substituted. This is non-negotiable and required for WCAG AA compliance.

## 3. Typography

**Display Font:** Fraunces (Google Fonts, variable serif)
**Body Font:** Inter (Google Fonts, variable sans)
**Label/Mono Font:** Geist Mono (Google Fonts)

**Character:** Editorial serif + clean sans + structural mono. Fraunces does the moments that earn weight (the giant `HAICHEN` wordmark in Hero, section openers, the `Probare et Aedificare.` motto, badge name, project titles, Compositional Reading modal title). Inter carries the long copy. Geist Mono does the structural work — section markers, chapter headers, contact rules, navigation labels, status pills, stack chips — set uppercase with heavy tracking so the mono reads as cataloguing notation, not as code-editor leftover.

### Hierarchy

- **Display XL** (Fraunces, 400, `clamp(4rem, 14vw, 12rem)`, line-height 0.95, letter-spacing -0.04em): the giant `HAICHEN` Hero wordmark only. Particle-revealed on mount; the single largest typographic moment on the site.
- **Display** (Fraunces, 400, `clamp(2.5rem, 6vw, 3.75rem)`, line-height 1.05, letter-spacing -0.01em): section openers (`Probare et Aedificare.`, `Where the resume lives.`, `What I'm working on.`, `Smaller experiments.`, `Curious about something I haven't covered?`).
- **Headline** (Fraunces, 400, 24px, line-height 1.15): project titles in Projects entries, badge name on the ID card, the Compositional Reading modal title `joanduan.dev — hero (v0.3)`.
- **Body** (Inter, 400, 18px, line-height 1.6): hero declarative lines, chapter paragraphs, project body copy, Compositional Reading analysis bullets. Cap line length at 65–75ch — never wider, even on desktop where the content area could go further.
- **Body-sm** (Inter, 400, 16px, line-height 1.6): mobile body, secondary copy, dense reading passages.
- **Label** (Geist Mono, 400, 12px, line-height 1, letter-spacing 0.3em, uppercase): chapter headers (`THE MOVE`, `THE VOICE`), section markers (`– ABOUT –`, `– EXPERIENCE –`), sidebar nav labels (`— ABOUT`, `— EXPERIENCE`), CONTACT block divider (`— CONTACT —`), audio affordance (`♪ READY · HOVER ME`). Always uppercase, always wide tracking.
- **Label-micro** (Geist Mono, 400, 10px, letter-spacing 0.2em, uppercase): Hero status tags (`[BUILDER]`, `[CREATOR-LITERATE]`, `[AI-NATIVE]`, `JOANDUAN.DEV · V0.3`, `NOW · INGEST · LEARN · SHIP`, `SEE HOW THIS PAGE READS ITSELF →`, `· PERCEPTION` / `· COMPREHENSION` / `· COMPOSITION`), badge band text (`TUM · CIT`, `TUM · WIRTSCHAFTSINFORMATIK`), Project category tags, Data Lab stat row labels, status pill text, Compositional Reading modal kicker (`· COMPOSITIONAL READING`) and footer (`· THE PAGE READS ITSELF · FEEDBACK LOOP CLOSED`).

### Named Rules

**The Fraunces Reserve Rule.** Fraunces appears only as Display XL / Display / Headline. Never as body. Never as a label. Never as a micro-tag. The serif is for moments — the Hero wordmark, the motto, the section openers, the badge name, the modal title — and only those. Using it broader collapses the system into "another Fraunces portfolio."

**The Mono Structural Rule.** Geist Mono is structural typography, not technical typography. It marks sections, frames navigation, carries small captions, status pills, stack chips, em-dash bullet leaders. Set uppercase, set with 0.2–0.3em tracking. Lowercase mono is forbidden in this system. Mono without tracking is forbidden.

**The 65–75ch Body Rule.** Body copy line length is capped at 65–75 characters. The About chapters, hero declaratives, Experience outcomes, Project body copy, and Compositional Reading analysis all respect this. Wider lines collapse the reading rhythm and break the notebook register.

## 4. Elevation

The system is flat by default. Section blocks, paragraphs, nav links, project entries, Data Lab compact cards, Interview Me input, and the Hero background segments all sit on the page without shadows or borders — depth is carried by hairline rules, type weight, and spacing.

There is one earned layered exception: the **TUM ID Badge** in the About section. The badge is a laminated physical object pinned to a V-shaped lanyard, and the elevation work commits to that physicality. The Compositional Reading modal uses a subtle veil over the underlying page; the modal container itself does not carry a shadow.

### Shadow Vocabulary

Used **only** on the TUM ID Badge:

- **Badge laminate** (`box-shadow: 0 1px 0 rgba(0,0,0,0.04) inset, 0 -1px 0 rgba(0,0,0,0.06) inset, 0 2px 4px rgba(0,0,0,0.04), 0 12px 24px -6px rgba(0,0,0,0.18), 0 24px 48px -12px rgba(0,0,0,0.12)`): the stacked-shadow construction that produces the laminated-card feel — two inset rules for the laminate edge, three drop shadows of increasing offset/blur/spread for the floating-card depth.
- **Punch-hole inset** (`box-shadow: inset 0 1px 2px rgba(0,0,0,0.25)`): the small dark pill at the top of the badge that represents the lanyard punch hole.

### Named Rules

**The One Shadow Rule.** Shadows exist only on the TUM ID Badge. No other component receives a shadow. If a future component needs the laminated feel, that component must justify earning the exception; the default is no.

**The Hairline Rule.** Where another system would use a box, border, or card, this system uses a 1px hairline rule. Section dividers, nav active-state indicators, project entry separators, Data Lab card frames, Interview Me input borders, badge motto separators, contact-block bookends — all hairlines (`h-px` / `w-px`). Cards in Projects and Data Lab use hairline borders only. The hairline is structural; the box is decorative.

## 5. Components

### Buttons & Links

The system rarely uses buttons. Primary navigation, in-page links, project affordances, and most interactive elements are **hairline + label** combinations: a 1px rule + an uppercase mono label, where the rule extends and the label changes color on hover/active.

- **Default link state:** mute-gray mono label, 12px hairline (`w-3 bg-[var(--mute)]/40`)
- **Hover state:** ink label, 24px hairline (`w-6 bg-[var(--ink)]`), transition 200ms
- **Active state:** ink label, 24px Burnt Sienna hairline (`w-6 bg-[var(--accent)]`)
- **Padding:** none (the rule and label are the only structure)
- **Border-radius:** N/A (no rectangles)

The few cases where a defined affordance is acceptable: the **copy-email** button in the sidebar (button element, but visually a label with a copy icon — no background, no padding box), the **Book 20 min** Calendly link (same treatment), the **mobile hamburger** trigger (`☰` glyph in a 40x40 frame), and the **Interview Me send icon-button** — the one allowed filled rectangle affordance on the entire site.

### SideNav (Right-side sticky sidebar)

The right-edge vertical navigation is the most-seen recurring affordance and the system's clearest typographic statement. Persists across all sections.

- **Position:** `fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50`, vertical column, hidden on mobile (replaced by hamburger overlay).
- **Section labels (locked, mono with em-dash prefix per IA):**
  - `— ABOUT`
  - `— EXPERIENCE`
  - `— PROJECTS`
  - `— DATA LAB`
  - `— INTERVIEW`
- **Structure per section link:** hairline rule (`h-px`, `w-3` rest / `w-6` hover-active) + uppercase mono label (`text-[10px] tracking-[0.3em]`). 24px gap between links.
- **Active state:** Burnt Sienna hairline + ink label. Inferred from `IntersectionObserver` tracking which section is most visible — the active state moves as the user scrolls.
- **Hover state:** ink label + extended ink hairline. Transition: 200ms.
- **Audio affordance**, sits between the section nav and the CONTACT block, mono in Burnt Sienna: `♪ READY · HOVER ME`. Hover activates ambient Web Audio (Tone.js). Mouse-leave does NOT stop audio (let it breathe). Click on the label toggles audio off. Tab title gains a speaker icon when audio is active. Audio defaults to OFF on page load.
- **CONTACT block:** opened by the em-dash flanked `— CONTACT —` mono label. Below, hairline-divided rows: mail icon + email (with copy button), in icon + LinkedIn, gh icon + GitHub, cal icon + Book 20 min. Each row uses the same hairline-mono treatment.
- **Mobile fallback:** hamburger trigger top-right; menu overlay covers the viewport with `backdrop-blur-md` and the same link treatment scaled up.

### TUM ID Badge (Signature Component, Elevation Exception)

The single layered object in the system. A 260×420 card on a V-shaped SVG lanyard with a metal clip ring at the bottom of the V, suspended above the right column of the About section (sticky on desktop).

- **Card face dimensions:** 260px × 420px
- **Background:** `#FCFAF5` (Badge Paper)
- **Shadow:** see Elevation §4 (badge laminate stack)
- **TUM band:** full-width Burnt Sienna band near the top, 8px vertical padding, micro-label uppercase text inside (`TUM · CIT` front / `TUM · WIRTSCHAFTSINFORMATIK` back)
- **Photo:** 210×230 max, `object-fit: cover; object-position: center top`
- **Front content:** display name (Fraunces 24px), micro-label role line (`DESIGNER · ENGINEER · ANALYST`), 8×1px Burnt Sienna divider rule, degree line (`B.SC. INFORMATION SYSTEMS`), `DOUBLE-TAP TO FLIP` hint
- **Back content:** `CONTACT` heading, name, Burnt Sienna hairline, social SVGs (GitHub, LinkedIn, Email), Munich location, motto footer (`Probare et Aedificare.`)
- **Interactions:** parallax tilt on `mousemove` (max 10° rotateX, scaled rotateZ for naturalism), flip on double-click (600ms cubic-bezier transition), badge-swing entrance + badge-sway idle keyframes for the on-scroll-into-view animation

The badge is the system's biggest single craft moment in the visible chrome. It carries the personality of the page in object form.

### Hero AI-Vision-Evolution Background (Signature Component)

A 12,000-particle canvas implementing the "AI Vision Evolution" concept, with three choreographed states (Perception, Comprehension, Composition) cycled manually via the `SEE HOW THIS PAGE READS ITSELF →` button in the Hero bottom-right strip. Each state shifts particle distribution, density, and color to suggest the conceptual phase.

- **Particle reveal on mount:** particles disperse from random positions and coalesce into the typographic form of `HAICHEN`. Colored in Burnt Sienna.
- **State machine cycle:** Perception → Comprehension → Composition, each state redistributes particles to suggest the phase. Triggered manually.
- **Soft elliptical glow** behind the wordmark for legibility against the noise canvas.
- **`prefers-reduced-motion: reduce`:** particle reveal replaced by immediate composed wordmark; state machine replaced by a static end-state; no transitions animate.

The canvas IS the substantive-engineering moment of the Hero — paired with the Compositional Reading modal, it forms the first of the site's two earned technical moments.

### Compositional Reading Modal (Signature Component, Second Technical Moment)

Linked from the `SEE HOW THIS PAGE READS ITSELF →` affordance in Hero. Opens a centered, ivory-background modal overlay (NOT a separate route) that performs a compositional reading of the Hero page itself — closing the AI Vision Evolution feedback loop.

- **Trigger:** click `SEE HOW THIS PAGE READS ITSELF →` button in Hero bottom-right.
- **Container:** centered modal, ivory background (`--base`), no shadow on the container (the underlying page receives a subtle veil only). Close icon top-right (×).
- **Layout, top to bottom:**
  - Mono kicker: `· COMPOSITIONAL READING` (Burnt Sienna)
  - Serif title: `joanduan.dev — hero (v0.3)` (Fraunces headline)
  - Hairline horizontal rule
  - Two-column body:
    - **Left column:** hairline-bordered thumbnail of the Hero page itself. Caption below in mono: `INPUT · SCREENSHOT`.
    - **Right column:** sectioned bulleted analysis. Each section heading mono with leading mid-dot (`· COMPOSITIONAL STRUCTURE`, `· COLOR HIERARCHY`, `· SUGGESTED REFINEMENT [✓ APPLIED]`). Body bullets serif with **leading em-dash leaders in Burnt Sienna**. Closes with `↳ V0.3 LOCKUP PROMOTED TO CARAMEL` in mono Burnt Sienna.
  - Footer: mono micro-label centered, `· THE PAGE READS ITSELF · FEEDBACK LOOP CLOSED`.
- **Interactions:** focus trap when open; Escape closes; background page is `inert`; modal title is first focusable element.
- **`prefers-reduced-motion: reduce`:** modal opens with opacity transition only — no scale, no slide.

The modal is the second technical moment of the site. It demonstrates the AI workflow (perceive, comprehend, compose) on the page itself; the refinement is actually applied to the underlying Hero (the V0.3 lockup in Burnt Sienna is visible evidence).

### Projects Entry

Each Projects entry pairs a **custom data visualization preview** with the project description. No card frame, no shadow — hairline rules and the visualization itself carry the visual weight.

- **Container:** hairline-divided block, no shadow, no background tint.
- **Visualization preview:** custom data viz rendered in ink + Burnt Sienna only. Never a screenshot of a Tableau/Looker/PowerBI dashboard. The viz IS the artifact.
- **Status pill** (corner of viz): mono micro-label uppercase in a Burnt Sienna pill, rounded full. States: `LIVE` / `IN PROGRESS` / `BUILDING` / `PLANNED` / `ROADMAP`.
- **Category tag** (above title): mono micro-label uppercase in Burnt Sienna Dark `#8C5836`. Examples: `ENGINEERING / FRONTEND`, `DATA / ANALYTICS`, `AI / AUTOMATION`, `DATA / FORECASTING`, `AI / RESEARCH`, `AI / NLP`.
- **Title:** Fraunces headline, 24–28px, tracking tight.
- **Body copy:** Inter body, 18px, line-height 1.6, capped at 65–75ch.
- **Stack chip row:** mono micro-labels, each in a hairline-framed rectangle (border 1px on `--ink`/20%, no fill). Examples: `Next.js`, `Python`, `Claude API`, `Voyage AI`, `D3`.
- **Date stamp + links:** mono micro-label date at left, `VIEW →` / `CODE →` / `DEMO →` mono links at right with arrow glyphs. Each link uses the hairline-label affordance treatment.

The seven canonical entries: joanduan.dev · WayBack · Creator Economy Analytics · AI Sales Workflow CLI · Industrial Sales Forecasting · AI Vision Evolution · NLP on Creator Comments.

### Data Lab Compact Card

Smaller than Projects entries — focused analytical notebooks and dashboards, narrower in scope but still built end-to-end on real data. The scope difference (featured vs smaller experiment) is the axis that differentiates Projects from Data Lab, not a build-vs-analysis axis.

- **Container:** hairline-bordered compact card, no shadow.
- **Status badge:** `LIVE` Burnt Sienna pill, same treatment as Projects status.
- **Title:** Fraunces headline, slightly smaller than Projects (~22–24px).
- **Stat row:** horizontal hairline-divided row of figures (e.g. `678K POLICIES · 25K CLAIMS · 4 VIEWS`). Each stat in mono uppercase, Burnt Sienna Dark for small text.
- **Stack tags:** mono micro-labels in hairline frames, same treatment as Projects stack chips.
- **Date stamp + `VIEW →` link:** same mono micro-label treatment.

### Interview Me Input

The Interview Me section's free-text input + send button — the ONE allowed filled rectangle affordance on the entire site.

- **Suggested-prompt chips:** 4 default chips, mono micro-label uppercase, hairline-framed (1px border on `--ink`/20%). Hover: border darkens to ink. Click: populates the input.
- **Input field:** full-width text input, hairline border (1px on `--ink`/20%), no background tint (transparent on `--base`). Inter body 18px. Focus state: border darkens to `--ink`. `aria-label` describes purpose.
- **Send icon-button:** the one filled-rectangle exception. Background `--ink`, foreground `--base`, ~40×40, no border-radius (sharp corners only). Hover: background lightens slightly. Disabled (empty input): opacity 0.4.
- **Streaming response area:** announced via `aria-live="polite"` so screen readers receive streamed Claude output. Inter body. Burnt Sienna em-dash leaders for any bullet content.
- **Closing line:** mono in mute gray with the email rendered in Burnt Sienna: `LIKED WHAT I SAID? REACH OUT AT haic.duan@gmail.com`.

### Experience Entry

Editorial timeline format. No card. Each entry sits on the page with hairline separators.

- **Date range left rail:** mono uppercase, Burnt Sienna Dark for small sizes.
- **Role title:** Fraunces headline.
- **Subtitle:** mono uppercase (channel / org / context).
- **Outcome bullets:** Inter body with **leading em-dash in Burnt Sienna** per bullet. No bullet glyph or numeral.
- **Skill tag row:** mono micro-labels in hairline frames, identical to Projects stack chips.
- **Optional afterthought-project link:** mono micro-label with arrow glyph.
- **Section closing line:** mono uppercase, e.g. `MORE TO COME, CURRENTLY LOOKING FOR INTERNSHIP ROLES`.

### About Chapter Block

- Mono uppercase chapter title (`THE MOVE`, `THE VOICE`, etc.), Burnt Sienna, `tracking-[0.3em]`, 12px, 32px margin below.
- Inter body paragraphs, 18px, line-height 1.6, ink at 80% opacity.
- 24px vertical rhythm between paragraphs, 80–96px between chapters.
- No icons, no images embedded in chapters, no callout boxes.

### Section Headers

Every major top-level section opens with the same construction:

- **Uppercase mono section marker, en-dash flanked**: `– ABOUT –`, `– EXPERIENCE –`, `– PROJECTS –`, `– DATA LAB –`, `– INTERVIEW ME –`. The visual em-dash characters are presentational only — screen readers must hear the plain section name (see §6 a11y rules).
- Below: Fraunces display title (`Probare et Aedificare.`, `Where the resume lives.`, etc.).
- Below: optional Inter italic subtitle in mute gray, 16–18px, max-width xl.

Never a box. Never a card. The section opens; the content cascades.

## 6. Do's and Don'ts

### Do

- **Do** use hairline rules (`h-px` / `w-px`) as section dividers, link affordances, card borders, and structural marks. The hairline is the system's primary structural vocabulary.
- **Do** set every mono label uppercase with letter-spacing 0.2–0.3em. The wide tracking is what makes Geist Mono read as catalogue notation rather than code-editor leftover.
- **Do** reserve Fraunces for display moments only — the giant `HAICHEN` wordmark, section openers, the `Probare et Aedificare.` motto, badge name, project titles, the Compositional Reading modal title. The serif earns weight by appearing rarely.
- **Do** keep body line length capped at 65–75ch even when the container is wider.
- **Do** keep Burnt Sienna under 10% of any visible screen area. The accent works because it is rare.
- **Do** use Burnt Sienna Dark `#8C5836` for any Burnt Sienna text rendered below 18pt regular / 14pt bold. Same hue, deeper lightness, retains WCAG AA at small sizes.
- **Do** keep elevation flat. Shadows exist only on the TUM ID Badge. Every other surface sits on the page.
- **Do** animate `transform` and `opacity` only. The existing CSS keyframes (badge-swing, badge-sway, era-midjourney-breathe, era-claude-focus-1) follow this rule.
- **Do** render the `HAICHEN` wordmark as a semantic `<h1>` in the **initial server-rendered HTML**. Particle animation is visual enhancement only. View-source must contain `<h1>HAICHEN</h1>`. Disable JS and the name must remain readable.
- **Do** use proper `<h2>` for section headings. The `– SECTION –` en-dash treatment is presentational (`::before`/`::after` or `aria-hidden` spans). Screen readers must hear "About", not "dash dash about dash dash".
- **Do** respect `prefers-reduced-motion: reduce` — disable badge swing/sway, particle reveal + state machine, era animations, Claude focus rectangle, modal scale/slide. Replace with static end-states or opacity-only transitions.
- **Do** keep audio opt-in. The `♪ READY · HOVER ME` affordance is the only audio activation surface; audio defaults OFF on page load; mute is always one click away on the same label.
- **Do** trap focus in the Compositional Reading modal when open; Escape must close; background page must be `inert`; modal title must be the first focusable element.

### Don't

- **Don't** drift toward the SaaS-cream Linear/Vercel/Notion clone lane that `PRODUCT.md` rejects. No gradient orbs. No animated gradient blur. No big rounded primary buttons. No "Build the future" hero headlines. No fake dashboard screenshots. No purple-pink gradients on white. No centered-hero-with-two-buttons-and-feature-grid. No 8px-rounded card grid representing projects.
- **Don't** introduce a second accent color. Burnt Sienna is the only accent (with the `#8C5836` darkened variant being the same hue at deeper lightness, not a separate color).
- **Don't** use Fraunces for body or label work. The serif is reserved.
- **Don't** use Inter at display sizes. If a moment wants display weight, it earns Fraunces.
- **Don't** use lowercase Geist Mono. Mono is structural typography here; it is always uppercase with wide tracking.
- **Don't** add shadows to any component other than the TUM ID Badge.
- **Don't** add box-drawn cards as primary section/project structure. Use hairlines.
- **Don't** add `border-left` or `border-right` greater than 1px as a colored stripe accent (impeccable absolute ban).
- **Don't** use `background-clip: text` with a gradient (impeccable absolute ban).
- **Don't** introduce glassmorphism as a default surface treatment. The single existing use (`backdrop-blur-md` on the mobile menu overlay) is the exception, not the rule.
- **Don't** animate CSS layout properties (`top`, `bottom`, `left`, `right`, `width`, `height`). Use `transform` instead.
- **Don't** add a third font family. Three is the limit (Fraunces + Inter + Geist Mono).
- **Don't** add filled rectangle buttons anywhere except the Interview Me send icon-button. The hairline-label treatment is the default.
- **Don't** screenshot a Tableau / PowerBI / Looker dashboard as a Project or Data Lab thumbnail. Render the actual data in ink + Burnt Sienna; the thumbnail IS the artifact.
- **Don't** ship a technical moment that reads as decorative novelty. Each one must justify itself as substantive engineering, or be cut.
- **Don't** use the system-font stack default. The page's first frame must already be on Fraunces / Inter / Geist Mono via `next/font/google`; no FOUT to system fonts.
- **Don't** use inline em-dashes in prose body copy. Replace with commas, parentheses, or semicolons. The em-dash is reserved for design-element conventions: section heading flanking (en-dash), sidebar nav prefix (em-dash), CONTACT block flanking (em-dash), and Burnt Sienna bullet leaders.
- **Don't** conflate the five em-dash / en-dash conventions. They each have a single role:
  - (a) `– SECTION –` (en-dash flanked) — section heading in body content
  - (b) `— SECTION` (em-dash prefix only) — right sidebar nav
  - (c) `— BLOCK —` (em-dash flanked) — right sidebar block opener (CONTACT)
  - (d) Burnt Sienna leading em-dash — bullet leaders in body copy
  - (e) No inline em-dashes in prose
- **Don't** apply Burnt Sienna `#A0673E` to text below 18pt regular / 14pt bold without substituting `#8C5836`. WCAG AA at small sizes requires the darker variant.
- **Don't** render the `HAICHEN` wordmark only via JS. The h1 must exist in the server-rendered HTML; particles enhance, not replace.
- **Don't** ship a Compositional Reading modal that lacks focus trap, escape-to-close, or `inert` background. The modal is a recruiter-facing centerpiece; broken a11y here disqualifies for both Lane A and Lane B.
- **Don't** autoplay Web Audio. Audio activation requires explicit user hover or click on the `♪ READY · HOVER ME` affordance.

---

Last updated: 2026-05-17
Author: Haichen Duan (Joan)
