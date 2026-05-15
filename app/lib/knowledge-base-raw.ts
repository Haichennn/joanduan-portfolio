// =============================================================================
// Interview Me — Knowledge Base
// =============================================================================
// 11 chunks total: 4 PROJECT + 4 SKILL + 3 REFLECTION
// All chunks use STAR structure (Situation / Task / Action / Result)
// Plus "What I learned" and "What I can contribute" closer sections
//
// Narrative lock: Tech × Business bridge
// "I build the bridge where pure tech misses the why
//  and pure business misses the how."
//
// Honesty discipline: every chunk has honesty_notes metadata flagging what
// Joan deliberately did NOT own. This is the differentiator — most candidates
// over-claim; Joan under-claims and lets specifics over-deliver.
// =============================================================================

export interface KnowledgeChunk {
  id: string
  type: 'project' | 'skill' | 'reflection'
  text: string
  metadata: {
    topic_tags: string[]
    skills_demonstrated?: string[]
    honesty_notes?: string[]
  }
}

export const knowledgeBase: KnowledgeChunk[] = [

  // ===========================================================================
  // PROJECT CHUNKS (1-4)
  // ===========================================================================

  // ---------- 1. WayBack ---------------------------------------------------
  {
    id: 'project-wayback',
    type: 'project',
    text: `WayBack — Context-Aware Tourism Re-Finding App (May-June 2026)

## SITUATION

TUM coursework project (Group W4) implementing Sappelli et al. 2017 "Context-Aware Recommendation" for a mobile tourism use case. Two-person team, 6-week deadline. The paper proposes three recommendation methods (CBR, JITIR, CIA) but evaluates them only in a desktop knowledge-worker setting. We had to adapt the framework to mobile tourism re-finding — the task of resurfacing places a user already saved, at the moment they become relevant again.

## TASK

I owned the entire frontend, solo. My teammate owned the backend (Flask, recommendation algorithm implementation, Railway deployment). My job: turn three paper-described algorithms into an interface a real tourist would actually use on their phone — and make the four-criterion evaluation framework (Section 4) visible to users without academic jargon.

## ACTION

I shipped a production frontend in React 19 / TypeScript / Tailwind / Vite, deployed on Vercel, integrating with my teammate's REST API.

Specific things I built and decided:

**Challenge 1**: Backend ranking is fixed per method, but real users care about "what's relevant right now." Weather, time-of-day, and current activity should reorder results.
**Decision**: I built a client-side contextBoost() layer that re-ranks within top results based on live Munich weather (Open-Meteo API) and current hour. Cafés boost in morning, bars at night, museums when it rains, parks on sunny afternoons. Multipliers are gentle (0.5-1.6) so the backend's algorithm still drives broad order — context only reorders within top results. Trade-off documented: this is a UX layer, not a method change — the academic evaluation still uses the paper's pure methods.

**Challenge 2**: How to make the W4 brief's "proactively recommend based on current situation" requirement principled, not just a notification spam machine.
**Decision**: I built a composite-signal evaluator mapping the paper's four evaluation criteria (Sections 4.3-4.6) to client-side signals: action prediction (CIA score), context relevance (haversine proximity), document relevance (category × time-of-day fit), diversity (low view count = under-surfaced item). Banner fires only when action prediction AND at least one other signal align. Mapped each firing pattern to backend reason vocabulary so banner text stays consistent with in-list explanations and detail panel.

**Challenge 3**: Free transit routing APIs (Transitous community MOTIS instance) are unreliable for demos. OSRM only handles foot/bike/car.
**Decision**: I hand-curated 13 Munich transit destination zones from real MVV data — each with realistic itineraries (lines, transfers, ride times). Routes pieced together at runtime from these zones plus final-mile walking. Fake-but-realistic > broken-real for a demo. Documented the swap-in path in code comments so a future production team knows how to upgrade.

**Challenge 4**: How to surface the paper's evaluation framework to users without overwhelming them.
**Decision**: Two-layer UI. Default state shows 4 plain-English signals on the detail panel ("Right here / Good time of day / Likely your next stop / Worth revisiting"). "How we picked these signals" button opens a modal with explicit Section §4.3-§4.6 citations explaining each signal's paper origin. Users get the simple version; reviewers get the academic version.

**Challenge 5**: Mobile gesture conflicts — swipe-to-dismiss recommendations vs vertical scrolling vs detail panel swipe-to-flip.
**Decision**: Custom pointer handlers that lock to horizontal or vertical on the first 10px of movement. Mouse events excluded (touch/pen only). Pure taps (no movement past 10px) fire onTap, drags past 100px dismiss. Documented the lock logic so the next developer doesn't accidentally break it.

**Other things I built**: Flipbook detail panel with chevron + swipe navigation between saved places. Draggable bottom sheet (Apple Maps style) with free-drag bounds rather than snap points. Method comparison view (three columns × three context presets) demonstrating the paper's central comparison. Dark/light theme toggle. Live weather + time pill. 4-mode route summary with per-mode times shown upfront.

**Deliberate non-ownership**: I did not implement the recommendation algorithms (CBR/JITIR/CIA), the Flask backend, the SQLAlchemy models, or the Railway deployment. My teammate did all of that. I read their algorithm code to inform UX decisions (which signals to surface, which methods to label "Near me / From history / For this moment") — but I integrated with their API, I didn't own their domain.

## RESULT

A frontend that makes a 2017 academic paper feel like a 2026 consumer mobile app, while preserving methodological transparency. The four-criterion evaluation framework is visible to users via the Explanation Breakdown component. The proactive notification system implements the W4 brief's composite-signal requirement using paper-derived criteria. Live by June 11, 2026.

## WHAT I LEARNED

- Frontend can make rigid backends feel adaptive without changing the backend. contextBoost is a 30-line function that does more for UX than rewriting the recommendation algorithm would.
- "Production" means designing for the demo failure modes too — the curated transit data is more "production" than calling a flaky free API in front of evaluators.
- Documenting trade-offs in code comments is a senior-engineer move that costs nothing. Anyone reading my code knows what I knew and chose.
- Knowing what NOT to own matters as much as knowing what to own. I'm a better collaborator because I respect my teammate's domain.

## WHAT I CAN CONTRIBUTE

- I shipped thousands of lines of production-grade React for WayBack solo in 6 weeks: design system, gesture patterns, paper-aligned signal evaluation, transit data engineering, API integration, deployment. I'm a frontend specialist who can carry the entire user-facing surface of a small product.
- I bring product thinking into engineering decisions: every UI choice in WayBack is justified against a user-facing metric ("would a tourist understand this?"), not just code correctness.
- I integrate well with backend specialists. I read their code well enough to design UX that respects their constraints, but I don't try to own their domain.
- I translate academic frameworks into consumer UX without losing the rigor. WayBack makes a research paper feel like an app — useful for any AI startup turning research into product.`,
    metadata: {
      topic_tags: ['WayBack', 'project', 'frontend', 'React', 'Tailwind',
                   'Vite', 'TypeScript', 'Leaflet', 'mobile', 'production',
                   'Vercel', 'context-aware', 'tourism', 'recommendation-system',
                   'paper-implementation', 'mobile-gestures'],
      skills_demonstrated: ['React-19', 'TypeScript', 'Tailwind-CSS', 'Vite',
                           'Leaflet-maps', 'mobile-gesture-design',
                           'API-integration', 'production-deployment',
                           'Open-Meteo-integration', 'OSRM-routing',
                           'design-system', 'state-management',
                           'paper-to-product-translation',
                           'context-aware-ranking', 'composite-signal-evaluation'],
      honesty_notes: ['frontend solo ownership',
                     'backend was teammate (Flask, SQLAlchemy, Railway)',
                     'algorithm internals not mine',
                     'no LLM integration in v2 (deliberately removed)']
    }
  },

  // ---------- 2. joanduan.dev ---------------------------------------------
  {
    id: 'project-joanduan-dev',
    type: 'project',
    text: `joanduan.dev — Self-Built Portfolio (May 2026)

## SITUATION

I needed a portfolio for AI / Wirtschaftsinformatik internship applications, but every template-based portfolio site looked the same and signaled nothing specific about me. I'm targeting AI startups and tech-adjacent business roles — the audience expects to see that you can ship, not that you can fill a template. I gave myself one week.

## TASK

Build a portfolio site from scratch — brand identity, copy, code, deployment — in seven days. The site itself had to be the strongest project on it: visiting joanduan.dev should be the demo. Not "here are my projects" but "here is me building a product, right now."

## ACTION

I shipped Next.js 16 + Tailwind v4 + TypeScript on Vercel in 7 days, solo:

**Brand & design system (Day 1-2)**:
- Mocked the whole site in Figma before writing a line of code — header rhythm, type scale, color palette (warm white #F8F7F4, caramel accent, near-black ink), spacing tokens, mobile/desktop breakpoints
- Wrote my own copy: "Probare et Aedificare" — to prove, and to build — as personal tagline; About section structured into 7 named blocks (THE MOVE / THE VOICE / THE CLIMB / THE PIVOT / THE BRIDGE / CURIOSITIES / THE BELIEF) instead of a generic bio paragraph
- Iconography from Lucide React, custom SVG for site structure diagram, ASCII-style section labels

**Hero — the centerpiece (Day 3-4)**:
- Built a 12,000-particle Canvas animation that reads itself in three segments: PERCEPTION (early CNN, scattered low-level features) → COMPREHENSION (Vision Transformer, attention-clustered patches) → COMPOSITION (multimodal LLM, full scene reasoning). This is the AI Vision Evolution concept made interactive: each segment animates from one model paradigm to the next, so you watch decades of computer vision condense into 8 seconds of motion.
- Integrated Web Audio API to layer Debussy's Clair de Lune as ambient soundtrack — not auto-playing, but available
- The Hero IS the project. Every visitor sees decades of computer vision progress in motion, then realizes they're looking at the work of someone applying for AI internships. The medium is the message.

**Site sections (Day 4-5)**:
- About: 7 blocks turning a CV into a narrative
- Experience: Co-founder of Content Operations (1.6M follower channel), framed as data-driven editorial operation not "influencer"
- Projects: 7 cards (WayBack live / joanduan.dev live / Creator Economy Analytics building / 4 planned) — each with status pill, stack tags, AI-domain or data-domain category tag
- Interview Me section (placeholder during portfolio launch, now being upgraded to RAG-powered chat)

**Mobile responsive (Day 5-6)**:
- Added hamburger menu nav, breakpoint-aware Hero scaling, touch-friendly tap targets
- Tested on real iPhone, not just Chrome DevTools mobile mode

**Deploy + iterate (Day 7)**:
- Vercel deploy, custom domain (joanduan.dev), production debugging
- Wrote AGENTS.md and CLAUDE.md in repo to document AI-development workflow

**Challenge 1**: Most portfolios are "here are my links." How do I make mine the proof itself?
**Decision**: The Hero IS the project. Anyone who lands on the site sees me execute the "AI-native builder" claim in the first 10 seconds. Words on the page just confirm what their eyes already showed them.

**Challenge 2**: How honest to be about projects I haven't shipped yet?
**Decision**: 4 of 7 projects on the Projects page are explicitly marked PLANNED with timeline. I'd rather show a credible roadmap than fake completeness. People who hire builders know what "in progress" looks like.

**Challenge 3**: AI Vision Evolution — how do you visualize an abstract concept (computer vision evolution) without it becoming a slide deck?
**Decision**: Three particle states, three named labels (PERCEPTION / COMPREHENSION / COMPOSITION), one continuous animation. No text labels except section titles. The concept is felt, not read.

**Challenge 4**: Mobile rendering for a 12K-particle Canvas without killing battery?
**Decision**: Particle count scales with viewport size; animation pauses when tab not visible (Page Visibility API); requestAnimationFrame throttled below 60fps when needed.

## RESULT

A portfolio site that IS the strongest project on it. Visitors see proof of AI thinking + design system + frontend execution + shipping discipline in the first 30 seconds. The site has handled inbound from a TikTok BD recruiter, a Munich AI startup CEO, and a referral channel through my mother's engineering network — all of whom clicked through and saw the Hero before clicking into projects.

## WHAT I LEARNED

- "I built X" tells; "you're looking at X right now" shows. Portfolios should be live demos of the claim they're making.
- Figma-first → code is faster than code-first → Figma. The design decisions worth making belong in a low-fidelity tool, not in TypeScript.
- A self-imposed one-week deadline is more useful than a "polished perfectionist" three-month deadline. Constraint forces clarity.
- Writing my own copy (instead of using generic portfolio templates) was the highest-leverage decision. Every block has my actual voice.

## WHAT I CAN CONTRIBUTE

- I can build a polished product website from concept to deployment in a week, solo: brand, design system, frontend implementation, deployment, mobile QA.
- I have working-level Figma + design tokens experience — I designed the visual system, not just executed someone else's.
- I write product copy that doesn't sound like every other portfolio / SaaS site. The voice is mine, the structure is intentional.
- I can ship interactive, ambitious frontend (12K-particle Canvas animations, Web Audio integration, multi-state choreographed UX) without external libraries doing the work.
- I treat the portfolio as the proof, not the brochure. That's the same mindset I bring to client work — demo > description.`,
    metadata: {
      topic_tags: ['joanduan.dev', 'portfolio', 'project', 'Next.js-16',
                   'Tailwind-v4', 'TypeScript', 'Vercel', 'Canvas-animation',
                   'particle-system', 'Web-Audio-API', 'AI-Vision-Evolution',
                   'design-system', 'Figma', 'brand-identity'],
      skills_demonstrated: ['Next.js-App-Router', 'Tailwind-v4', 'TypeScript',
                           'Canvas-2D', 'particle-systems', 'Web-Audio-API',
                           'Vercel-deployment', 'Figma-to-code',
                           'design-token-systems', 'mobile-responsive',
                           'production-debugging', 'product-copywriting',
                           'self-directed-1-week-ship'],
      honesty_notes: ['shipped solo in 7 days',
                     'Figma at working level not expert',
                     'planned projects clearly marked as planned',
                     'site itself is the strongest demo']
    }
  },

  // ---------- 3. Creator Channel 1.6M --------------------------------------
  {
    id: 'project-creator-channel',
    type: 'project',
    text: `Co-founder of Content Operations — 1.6M-Follower Creator Channel (2024-2025, Bilibili + Douyin)

## SITUATION

In 2024 a co-founder approached me to scale a lifestyle creator brand on Chinese social platforms. Bilibili and Douyin are the two largest creator-economy ecosystems outside of YouTube/TikTok — algorithm-driven, audience-iterative, e-commerce-integrated. The brand was starting from near-zero: a defined niche, a face on camera, no audience. My co-founder was the on-camera personality; I was everything behind the camera.

## TASK

Build a creator-economy operation from 0 to scale — content strategy, production, audience analytics, community management, monetization pipeline — as a two-person team. The on-camera role was already filled. My job: operate the entire content stack so the brand could grow, monetize, and survive Chinese platform algorithm volatility.

## ACTION

Over 18 months, we grew from sub-1K to 1.6M followers across Bilibili and Douyin. I did everything that wasn't being on camera:

**Content strategy & positioning**:
- Defined and iteratively repositioned the brand based on engagement data — several pivots from initial concept to find the niche that actually retained viewers
- Owned the editorial calendar: 200+ videos planned, scripted (collaboratively), and shipped
- Tracked which content formats drove subscriber conversion vs. just views — learned to optimize for the metric that actually matters (retention) not the vanity one (views)

**Production direction**:
- Directed editing, cinematography, post-production across 200+ videos
- Made every shot-list, every cut-rhythm decision, every thumbnail call
- Built and managed a small freelance production network (videographers, editors) at peak volume

**Audience analytics — the part most "content creators" skip**:
- Lifted per-video engagement from sub-10K to 200K+ likes through systematic data-driven iteration
- Read platform analytics dashboards daily: completion rate, swipe rate, comment-to-view ratio, hour-by-hour view curves
- Tested hypotheses about what audience signals predicted virality vs. plateau
- Translated those signals back into editorial decisions for the next video

**Community management**:
- Built fan community across group chats and DMs — not delegated, run directly
- Managed the audience feedback loop: comments → next-video content decisions
- Handled crisis moments (platform algorithm shifts, comment-section flare-ups) under real pressure

**Monetization pipeline**:
- Understood the full Chinese influencer e-commerce pipeline: brand deals, live commercial broadcasts, platform commission structure, audience-to-conversion funnels
- Joined a freelance live commercial broadcast operation (March 2026) supporting real-time stakeholder pressure during livestreams

**Challenge 1**: When the brand plateaued at ~50K followers, what to do?
**Decision**: Read the data, not the comments. The comments said "make more of the same"; the data said retention was dropping on the formula that built the first 50K. I pushed for a positioning pivot. We tested for 3 weeks; the new format outperformed the old by 3x retention. Trust data over loud feedback.

**Challenge 2**: Platform algorithm shift in early 2025 cut traffic by 60% overnight.
**Decision**: Don't panic-iterate. Spent two weeks studying the new algorithm signals (completion-rate weighted heavier than thumb-stop), then redesigned video opening structure (hook → context → payoff in first 8 seconds instead of first 20). Recovered traffic in 6 weeks. Slow under-pressure response > fast wrong response.

**Challenge 3**: How to scale production without losing voice consistency.
**Decision**: Wrote internal style guide — shot rhythm rules, color grading reference, voiceover pacing, thumbnail composition formulas. Onboarded freelance editors against that guide. Voice consistency stayed even as my hands stopped touching every cut.

## RESULT

1.6M followers across two platforms. 200K+ likes per video at peak. A working understanding of one of the largest creator economies in the world — algorithm dynamics, audience-to-revenue conversion, the gap between what audiences say they want and what they actually engage with. Now positioned as transferable expertise for any product that runs on audience attention.

## WHAT I LEARNED

- Audience analytics is the closest thing to a real-time A/B test framework I've ever worked inside. Every video is a hypothesis test; the dashboard tells you the truth within 24 hours.
- What audiences say they want and what they engage with diverge by ~30%. Trust the engagement, listen to the comments only for narrative direction.
- Algorithm volatility is a feature of the job, not a bug. Operators who can read signal-level changes (not just "we lost traffic") survive platform shifts.
- Creator-economy operations is a tech-business hybrid role: half data analysis, half product strategy. Most "content creators" do neither well. That's the gap I sat in.

## WHAT I CAN CONTRIBUTE

- I bring data-driven audience iteration to any product that depends on engagement: content platforms, social products, consumer apps with feed mechanics.
- I understand the Chinese creator economy at operator depth — Bilibili / Douyin algorithm dynamics, livestream commerce, brand-creator-platform triangle — increasingly relevant for any product targeting Chinese consumer markets.
- I can read a dashboard and tell you which numbers matter. Most teams over-index on vanity metrics; I learned (under real consequence) which signals predict survival.
- I've operated under real revenue pressure with real audience feedback loops — not academic exercises. This is rare for someone my age applying to tech roles.
- I work well with on-camera / customer-facing partners. I respect the role and stay behind the camera by choice — I'm an operator, not a face.`,
    metadata: {
      topic_tags: ['creator-economy', 'content-operations', 'co-founder',
                   'Bilibili', 'Douyin', '1.6M-followers', 'audience-analytics',
                   'data-driven-iteration', 'community-management',
                   'live-commerce', 'platform-algorithms', 'editorial-strategy'],
      skills_demonstrated: ['audience-analytics-interpretation',
                           'data-driven-content-iteration',
                           'platform-algorithm-literacy',
                           'video-production-direction',
                           'community-management-at-scale',
                           'crisis-response-under-pressure',
                           'team-coordination',
                           'editorial-style-guide-creation',
                           'creator-economy-pipeline-understanding',
                           'live-broadcast-operations',
                           'A/B-style-hypothesis-testing'],
      honesty_notes: ['co-founder role, not solo founder',
                     'on-camera was partner, not Joan',
                     'behind-camera operator by choice',
                     'numbers (1.6M, 200K likes) reflect peak / total scale']
    }
  },

  // ---------- 4. Tableau Fortage TATA --------------------------------------
  {
    id: 'project-tableau-tata',
    type: 'project',
    text: `Tableau Dashboard — Fortage / TATA UK Retail Analysis (May 2026)

## SITUATION

Independent analytics project on a real-world UK e-commerce dataset (Online Retail Data Set): 541,909 transaction rows, 38 countries, full 2010-2011 trading period, including invoice numbers, stock codes, quantities, unit prices, customer IDs, and country. The dataset has the messiness of real retail data — cancelled orders, returns, missing customer IDs, negative quantities — not a clean academic CSV.

## TASK

Translate raw transactional data into a 4-view Tableau dashboard that answers four specific business questions:
1. How did monthly revenue trend through 2011?
2. Which 10 countries drive the most revenue?
3. Who are the top 10 highest-value customers?
4. What does global demand look like geographically?

Each view must be acted-on, not just visualized.

## ACTION

I built the analysis in Tableau with a custom calculated field (Revenue = Quantity × UnitPrice) and four views:

**Q1 — Monthly Revenue 2011**: Time-series line chart. The decision was to filter to 2011 only rather than show the full 2010-2011 span — partial-month data at the boundaries would distort the trend story. Cleaner to show 12 complete months than 13 lopsided ones.

**Q2 — Top 10 Countries by Revenue**: Bar chart, sorted descending. The interesting finding: revenue is heavily UK-skewed (this is a UK-based retailer), so the Top 10 view answers "where else is the business real" rather than "where is the most revenue." Different question, more useful answer.

**Q3 — Top 10 Customers by Revenue**: Bar chart of CustomerID × Revenue, sorted descending. Discovered customer concentration — a small number of customer IDs account for a disproportionate share of revenue, which has real business implications (account management priority, churn risk).

**Q4 — Country Demand Map**: Geographic visualization. Demand intensity shown by country color. Best view for "where is the international opportunity" at a glance.

**Challenge 1**: The dataset has serious quality issues — 9,288 cancelled invoices (InvoiceNo starting with 'C'), 10,624 negative-quantity rows (returns), and 135,080 NULL CustomerID rows (25% of the data has no customer attribution).
**Decision**: I made these data-quality decisions explicit, not silent:
- Cancelled invoices and negative quantities stayed in the Revenue calculation, because Revenue = Qty × UnitPrice naturally handles returns as negative revenue (which is correct: a return reduces net revenue).
- NULL CustomerID rows are excluded from Q3 (Top 10 Customers — can't rank what you can't identify) but included in country and revenue totals (Q1, Q2, Q4), because we still know what they bought and from where.
- These choices are documented so anyone reproducing the analysis sees what was kept, what was excluded, and why.

**Challenge 2**: Tableau default visualizations are seductive — it's easy to make 12 charts when 4 would answer the question better.
**Decision**: I started with the 4 business questions and only built a view if it directly answered one. Resisted adding "interesting but tangential" views. Each view earns its place by answering a specific question, not by being possible.

**Challenge 3**: Revenue as a derived metric.
**Decision**: Created Revenue as a Tableau calculated field rather than pre-computing it in the source CSV. Reason: keeps the source data immutable and makes the calculation auditable inside Tableau itself. Anyone opening the workbook can see exactly how Revenue is defined.

## RESULT

A 4-view Tableau workbook (.twbx) that answers four sharp business questions on a 541K-row real-world UK retail dataset. The analysis surfaces actionable patterns: UK dominance with clear secondary markets, customer concentration risk, monthly revenue seasonality. First production data analytics deliverable outside coursework, with explicit data quality decisions documented.

## WHAT I LEARNED

- Real retail data is 25% NULL on the most important join key (CustomerID). Working with messy data is the actual job, not the side-quest. Pretending otherwise produces analyses nobody trusts.
- Sharpening the business question before drawing charts saves more time than any Tableau shortcut. "Top 10 countries" is a more useful question than "all country revenues" because it forces the question of secondary markets vs the obvious UK lead.
- Calculated fields belong in Tableau, not pre-baked in the source. Future-me (or any reviewer) needs to see how Revenue is defined.
- Data quality decisions are the analysis. The choice to exclude NULL CustomerIDs from Q3 but keep them in Q1/Q2/Q4 is a deliberate analytical statement, not housekeeping.

## WHAT I CAN CONTRIBUTE

- I can take a half-million-row messy dataset and produce a business-ready 4-view dashboard with explicit, auditable data quality choices.
- I make business questions sharper before reaching for charts. "What decision changes when you see this?" is my filter against dashboard bloat.
- I document my analytical decisions inline (Tableau calc fields, README notes) so reproducibility is built in, not retrofitted.
- I bring Wirtschaftsinformatik thinking to data work: business-context first, then technical method. I'm not just executing chart requests — I'm pushing back on the question if it's the wrong one.

## HONEST SCOPE NOTE

This was a focused independent project on a single dataset, not an enterprise BI build. I'm strong on Tableau dashboard design, analytical thinking, and stakeholder communication for projects of this size. For larger-scale data engineering (ETL pipelines, warehousing, SQL at scale), I'm currently building those skills through coursework and planned projects (Creator Economy Analytics, Industrial Sales Forecasting on my portfolio roadmap).`,
    metadata: {
      topic_tags: ['Tableau', 'data-analytics', 'dashboard', 'Fortage',
                   'TATA', 'UK-retail', 'business-intelligence',
                   'data-visualization', 'data-quality', 'e-commerce-data',
                   'calculated-fields'],
      skills_demonstrated: ['Tableau-dashboard-design',
                           'Tableau-calculated-fields',
                           'data-quality-decision-making',
                           'business-question-translation',
                           'time-series-visualization',
                           'geographic-visualization',
                           'top-N-analysis',
                           'NULL-handling',
                           'returns-handling-in-revenue-models',
                           'documentation-discipline'],
      honesty_notes: ['focused single-dataset project, not enterprise BI',
                     'larger-scale data engineering skills still building',
                     'dataset is publicly available UK Online Retail dataset',
                     'analysis decisions are mine; dataset is third-party']
    }
  },

  // ===========================================================================
  // SKILL CHUNKS (5-8)
  // ===========================================================================

  // ---------- 5. LLM Integration in Production -----------------------------
  {
    id: 'skill-llm-integration',
    type: 'skill',
    text: `LLM Integration in Production — Currently Building (May 2026)

## HONEST FRAMING

I'm currently learning production LLM integration end-to-end. I am not claiming years of LLM-in-production experience — that would be dishonest for someone in my career stage. What I am claiming: I just shipped a RAG-powered Q&A system from scratch in a 4-hour intensive learning sprint, and I'm in the process of deploying it as the "Interview Me" feature on joanduan.dev. This is fresh work — shipped this week, not years-old experience.

## WHAT I JUST BUILT

**A working RAG pipeline in Python, from zero**:
- Set up Python environment with virtualenv, installed sentence-transformers and the Anthropic SDK
- Built a hardcoded-knowledge-base retrieval system using sentence-transformers (all-MiniLM-L6-v2) for embeddings and scikit-learn cosine_similarity for ranking
- Implemented a top-K retrieval function that takes a user query, embeds it, scores against pre-computed knowledge-base embeddings, and returns the top 3 most relevant chunks
- Wired the retrieval into a Claude API call with a grounded prompt that explicitly instructs Claude to answer ONLY from retrieved context and to say "I don't have specific information about that" when the retrieved chunks don't contain the answer
- Verified grounding works on both happy path ("Where does Joan study?" → correct answer using retrieved TUM chunk) and edge case ("What is Joan's favorite food?" → correctly says "I don't have that information" rather than hallucinating from "Joan loves coffee" chunk)

**The Interview Me feature on joanduan.dev (currently being deployed)**:
- 11-chunk knowledge base covering my projects, skills, and reflections, structured for retrieval (this very chunk is one of them)
- Embeddings pre-computed via Voyage AI's embedding API and committed to the repo as JSON
- Next.js API Route (Edge runtime) for production inference: receives query → embeds via Voyage → cosine similarity vs pre-computed embeddings → top-K → grounded Claude call → streamed response back to chat UI
- React chat component on the Interview Me section of joanduan.dev
- Anthropic + Voyage API keys configured in Vercel environment variables, with monthly spend cap configured to prevent runaway costs

## CHALLENGES I'VE WORKED THROUGH

**Challenge 1**: My first embedding similarity experiment surprised me. "Joan loves AI" vs "Haichen is passionate about machine learning" scored 0.29 cosine similarity — much lower than I expected for two semantically similar sentences.
**Investigation & decision**: I tested variations. Removing the names ("loves AI" vs "is passionate about machine learning") raised the score to 0.46. Using the same name in both ("Joan ... Joan ...") raised it to 0.67. Conclusion: proper nouns dilute embedding similarity disproportionately because the model doesn't know "Joan" and "Haichen" refer to the same person. Production lesson: entity normalization matters before you embed. I now know to be skeptical of embedding-based search on names without canonicalization.

**Challenge 2**: After a small refactor — adding "of" between "Technical University" and "Munich" — the top-1 retrieval for "Where does Joan study?" flipped from the TUM chunk to a "currently learning RAG" chunk.
**Investigation & decision**: This is embedding fragility — surface-level wording changes can flip rankings. The production lesson: 90% of RAG quality work is iterative content engineering on the knowledge base, not model selection or hyperparameter tuning. Top-1 is unreliable; always retrieve top-K and let the LLM choose what to use.

**Challenge 3**: How to prevent hallucination when retrieved chunks are tangentially related but don't contain the answer.
**Decision**: A three-part prompt structure: (1) "STRICTLY based on the information below," (2) explicit escape hatch — "if the answer is not in the information, say 'I don't have specific information about that'," (3) "Do NOT make up facts. Do NOT use general knowledge." Tested with adversarial query ("What is Joan's favorite food?" when the retrieved chunk is "Joan loves coffee"). Claude correctly said "I don't have that information" instead of inferring from coffee → maybe pastries. The escape hatch works.

**Challenge 4**: Cost control before the system is live.
**Decision**: Before generating any embeddings or running production traffic, I configured Anthropic's monthly spend limit at $8/month with email alerts. This is a budget guardrail, not an afterthought. Production LLM systems without spend caps are an outage waiting to happen — a misconfigured loop can burn through hundreds of dollars in minutes. I treat budget guardrails as a Day 1 setup task.

## WHAT I'M STILL LEARNING

- Fine-tuning vs RAG trade-offs at scale
- Evaluation frameworks for RAG quality (retrieval recall, generation faithfulness, end-to-end answer relevance)
- Multi-turn conversation state management with grounded RAG
- Vector database trade-offs (FAISS vs Chroma vs Pinecone vs PGVector) at production scale

## WHAT I CAN CONTRIBUTE

- I can ship a working RAG-powered feature from scratch in under a week, end-to-end: knowledge base design, embeddings, retrieval, grounded generation, frontend integration, deployment, cost controls.
- I have hands-on intuition for RAG failure modes — embedding fragility, retrieval surprises, hallucination edge cases — not just textbook knowledge.
- I treat production LLM systems with appropriate paranoia: spend caps Day 1, grounding prompts that fail safely, adversarial testing before deployment.
- I can read and modify production AI code in TypeScript / Python / Next.js without needing hand-holding.
- I'm honest about where my LLM expertise stops. I don't claim to know what I haven't done yet.`,
    metadata: {
      topic_tags: ['LLM-integration', 'RAG', 'embeddings', 'Anthropic-Claude',
                   'Voyage-AI', 'sentence-transformers', 'cosine-similarity',
                   'grounded-generation', 'production-AI', 'Interview-Me',
                   'currently-learning'],
      skills_demonstrated: ['Python-RAG-from-scratch',
                           'sentence-transformers',
                           'embedding-similarity-debugging',
                           'grounded-prompt-engineering',
                           'hallucination-prevention',
                           'production-cost-controls',
                           'Vercel-Edge-Function-deployment',
                           'Anthropic-API',
                           'Voyage-AI-embeddings',
                           'Next.js-API-routes'],
      honesty_notes: ['currently learning, not years of experience',
                     'shipped first RAG project this week',
                     'Interview Me is the live deployment of this skill',
                     'fine-tuning, RAG eval frameworks, vector DBs at scale are still ahead']
    }
  },

  // ---------- 6. Frontend Mobile-First UX ---------------------------------
  {
    id: 'skill-frontend-mobile-ux',
    type: 'skill',
    text: `Frontend Mobile-First UX — Production Experience

## WHERE I'VE PROVEN THIS

Two shipped products: joanduan.dev (portfolio, Next.js 16 + Tailwind v4) and WayBack (tourism re-finding app, React 19 + Vite + Tailwind). Both are real, both have real mobile users testing them, both are deployed on Vercel with custom domains.

## THE STACK I OWN

**Frameworks**: React 19, Next.js 16 (App Router), Vite. I've shipped production builds with both.

**Styling**: Tailwind CSS v4 (latest). Design tokens managed via CSS variables for runtime theme switching. I write utility classes by default and only break out into custom CSS or scoped styles for animation-heavy components.

**Language**: TypeScript at working level. I type my props, my state, my API responses. I'm not yet at the "advanced generics / utility types" level — I write practical types that catch real bugs.

**State**: useState, useReducer, useEffect — straight React, no external state library on either project. Both products' state needs are small enough that bringing in Redux / Zustand would be overkill. Knowing when NOT to add a dependency is a skill.

**Animation**: Canvas 2D for heavy work (12K-particle Hero on joanduan.dev). CSS transitions + transforms for everything else. requestAnimationFrame throttling for performance.

**Audio**: Web Audio API integration (Clair de Lune ambient layer in joanduan.dev Hero).

**Maps**: Leaflet + React-Leaflet (WayBack).

## SPECIFIC MOBILE UX PATTERNS I'VE BUILT

**Gesture handling**:
- Custom pointer-event handlers that distinguish horizontal swipe vs vertical scroll on first 10px of movement
- Pure-tap detection (no movement past 10px → onTap fires)
- Swipe-to-dismiss with snap-back if drag doesn't pass threshold
- Touch / pen only (mouse events excluded for desktop-friendly scrolling)
- This is harder than it sounds — gesture conflicts (swipe vs scroll vs flip) are where mobile UX usually breaks down

**Draggable bottom sheet** (Apple Maps style):
- Free-drag with min/max bounds rather than fixed snap points
- Pointer capture so dragging continues even when the finger leaves the handle area
- CSS transition that disables during active drag, re-enables on release for the snap-back animation

**Flipbook detail panel**:
- Horizontal swipe to flip between saved places
- Chevron buttons as discoverability backup for users who don't know to swipe
- Page-counter dot ("3 / 7") so users know where they are

**Mobile responsive**:
- Hamburger menu navigation on small screens
- Breakpoint-aware Hero scaling (particle count scales with viewport)
- Touch-friendly tap targets (44px minimum)
- Tested on real iPhone, not just Chrome DevTools mobile mode — this catches things DevTools misses (rubber-band scroll, safe-area insets, real-touch latency)

**Performance**:
- Page Visibility API to pause heavy animations when tab not visible
- requestAnimationFrame throttling below 60fps when battery / CPU permits
- Image lazy-loading and explicit aspect ratios to prevent layout shift

## CHALLENGES I'VE WORKED THROUGH

**Challenge 1**: WayBack's bottom sheet conflicting with vertical list scrolling.
**Decision**: Only the handle area is draggable; the list inside scrolls naturally. The handle uses pointer capture so a drag started on the handle continues even if the finger drifts onto the list. This pattern took two debugging sessions to get right — the issue was that without pointer capture, the drag would cancel mid-motion.

**Challenge 2**: Joanduan.dev Hero killing battery on mobile.
**Decision**: Particle count scales with viewport size (12K on desktop, fewer on mobile); animation pauses when tab not visible; requestAnimationFrame respects browser-throttling signals. Tested on a real iPhone before shipping — battery impact dropped from "noticeable" to "imperceptible."

**Challenge 3**: Tailwind v4 is new — design tokens via @theme directive, no PostCSS config.
**Decision**: Read the v4 migration docs fully before starting joanduan.dev. The new model is cleaner once you accept the paradigm shift; trying to backport v3 patterns would have wasted a day.

## WHAT I CAN CONTRIBUTE

- Production frontend ownership for AI / data products — design system, components, gesture patterns, deployment, mobile QA, the whole user-facing surface.
- Mobile-first thinking by default. I test on real devices. I respect touch target sizes, battery impact, safe-area insets, gesture conflicts.
- I write Tailwind utility classes by default but break out cleanly when needed (animation, complex selectors). I don't fight the framework.
- I make and document trade-off decisions. Why no Redux? Because the state is small enough that it would add complexity, not reduce it. Decisions like this in code comments make the codebase maintainable.
- I can carry the frontend for a 2-3 person product team. Both WayBack and joanduan.dev were solo frontend work.

## WHAT I'M NOT

- I'm not yet a TypeScript expert in the "advanced generics / type-level programming" sense. I write practical types.
- I haven't owned the design system for a 50+ component library or a multi-product organization. My experience is small-team scale.
- I don't currently have hands-on experience with React Server Components beyond Next.js defaults. That's on my learning roadmap.`,
    metadata: {
      topic_tags: ['frontend', 'mobile-UX', 'React', 'Next.js', 'Tailwind',
                   'TypeScript', 'gesture-handling', 'Canvas-animation',
                   'production-frontend', 'design-system', 'performance'],
      skills_demonstrated: ['React-19', 'Next.js-16-App-Router', 'Tailwind-v4',
                           'TypeScript-working-level',
                           'pointer-events-and-gestures',
                           'draggable-bottom-sheet',
                           'swipe-to-dismiss',
                           'Canvas-2D-animation',
                           'Web-Audio-API',
                           'Page-Visibility-API',
                           'mobile-responsive-design',
                           'real-device-testing',
                           'performance-throttling'],
      honesty_notes: ['working-level TypeScript not expert',
                     'small-team scale not enterprise scale',
                     'no React Server Components experience yet']
    }
  },

  // ---------- 7. Creator Economy Operations -------------------------------
  {
    id: 'skill-creator-economy-ops',
    type: 'skill',
    text: `Creator Economy Operations — Behind-the-Camera Operator Experience

## WHY THIS IS A REAL SKILL, NOT JUST "I HAD A FOLLOWING"

Creator economy operations is a distinct skillset: it's the discipline of running a creator brand as a business, with the engineering / analytics / strategy / production functions integrated. It's NOT "being a content creator." Most people on Bilibili / Douyin / TikTok / YouTube focus on being on camera; very few people understand the operator side. I'm an operator who's never been on camera — that's the unusual angle.

The skill is transferable: any product that depends on audience engagement (consumer apps, content platforms, social products, creator tools, even B2B with content marketing) uses the same dashboard-reading, hypothesis-testing, iteration-loop mental model.

## WHAT I CAN DO

**Audience analytics interpretation**:
- Read platform analytics dashboards (Bilibili Creator Center, Douyin Star Map) at operator depth
- Distinguish which metrics predict survival (completion rate, retention curves) vs which are vanity (raw views, likes)
- Translate hour-by-hour viewer curves into next-video editorial decisions
- Tested this against a real-world consequence (1.6M follower brand) for 18 months

**Algorithm literacy on Chinese platforms**:
- Bilibili's recommendation model weights completion rate heavily; Douyin weights thumb-stop in the first 3 seconds
- Both penalize watch-time drops; both reward consistency in upload cadence
- Algorithm shifts happen 2-4 times a year on each platform; reading the shift is the operator's job, not the on-camera talent's

**Content strategy iteration**:
- Hypothesis → ship → measure → re-strategize, on a 7-day cycle, for 18 months
- Several major brand pivots based on data (not opinion)
- A/B-style thinking applied to video format choices: thumbnail composition, hook length, content category, posting time

**Production direction**:
- Editing, cinematography, post-production direction across 200+ videos
- Style guide creation for scale (onboarded freelance editors against consistent voice rules)
- Shot rhythm, color grading reference, voiceover pacing, thumbnail composition formulas

**Community management at scale**:
- Group chats, DMs, comment-section moderation — directly, not delegated
- Crisis response (algorithm shifts, comment flare-ups) under real-time pressure
- Audience feedback loop translation: comments → content decisions

**E-commerce influencer pipeline**:
- Brand deal negotiation (audience-fit assessment, rate cards, deliverables)
- Live commerce broadcast operations (March 2026 freelance experience supporting livestreams)
- Platform commission structures, audience-to-conversion funnel mechanics

## CHALLENGES I'VE WORKED THROUGH

**Challenge 1**: Plateau at ~50K followers. Comments said "more of the same"; data said retention was dropping.
**Decision**: I trusted the data. Pushed for a positioning pivot. Tested 3 weeks. New format 3x retention. Loud feedback ≠ predictive feedback.

**Challenge 2**: Algorithm shift cut traffic 60% overnight.
**Decision**: 2 weeks of pure observation before iterating. Identified that completion-rate weighting had increased relative to thumb-stop. Redesigned video opening structure. 6 weeks to recovery. Slow-correct beats fast-wrong.

**Challenge 3**: Scaling production without losing voice.
**Decision**: Wrote internal style guide. Onboarded freelance team against it. Voice held even as my hands stopped touching every cut.

## WHAT THIS TRANSFERS TO

This skill is NOT confined to social media. The underlying capabilities transfer to:

- **Consumer apps with engagement loops**: TikTok-like feeds, social products, content discovery — operators who've run real audience analytics at scale are rare and valuable
- **Creator-tool startups**: building products FOR creators, where having operator perspective shapes feature decisions
- **Content marketing for B2B / SaaS**: the same iteration-loop thinking applies, just with longer cycles
- **Product analytics in general**: dashboard literacy, metric-vs-vanity-metric judgment, hypothesis-testing rhythm
- **Live commerce / livestream commerce**: a multi-hundred-billion-yuan industry in China, increasingly relevant globally

## WHAT I CAN CONTRIBUTE

- Operator-depth understanding of one of the world's largest creator economies (China). Most candidates with "social media experience" mean "I posted on Instagram." I mean "I ran the data side of a 1.6M brand."
- Cross-cultural fluency: I operate in Chinese platforms but think and write in English-language engineering / business frames. This is rare and underweighted in hiring.
- Dashboard-reading discipline under real consequence. I've lost (and recovered) traffic. I know what survives algorithm shifts. Academic exercises don't teach this.
- Hypothesis-testing rhythm at 7-day cycles for 18 months. This is real-world A/B-style thinking that applies to any product with feedback loops.

## WHAT I'M NOT

- I'm not an on-camera personality and don't want to be one. I operate behind the camera by choice.
- My experience is creator-economy / social-platform, not e-commerce-direct (Amazon FBA, DTC brands) or paid-acquisition-heavy (Meta Ads, Google Ads). Different skill family.
- I haven't operated at the 10M+ follower mega-creator scale. 1.6M is real but not the top tier.`,
    metadata: {
      topic_tags: ['creator-economy', 'audience-analytics', 'content-operations',
                   'Bilibili', 'Douyin', 'Chinese-platforms', 'algorithm-literacy',
                   'community-management', 'live-commerce', 'data-driven-iteration',
                   'cross-cultural'],
      skills_demonstrated: ['platform-analytics-reading',
                           'algorithm-shift-response',
                           'audience-iteration-loops',
                           'video-production-direction',
                           'style-guide-creation',
                           'crisis-management',
                           'live-broadcast-operations',
                           'hypothesis-test-thinking',
                           'cross-cultural-translation'],
      honesty_notes: ['operator role, never on-camera',
                     '1.6M is real but not mega-creator tier',
                     'creator-economy skillset, not e-commerce/paid-ads',
                     'Chinese platform specialist, not Western platform specialist']
    }
  },

  // ---------- 8. Tech × Business Bridge Thinking --------------------------
  {
    id: 'skill-tech-business-bridge',
    type: 'skill',
    text: `Tech × Business Bridge Thinking — The Wirtschaftsinformatik Lens

## WHAT THIS MEANS IN ONE LINE

I build the bridge where pure tech misses the why and pure business misses the how. Wirtschaftsinformatik (Information Systems at TUM) is the formal name for this discipline; the practical version is: I make engineering decisions that are justified by business consequences, and I make business decisions that respect what's technically buildable.

## WHY THIS IS A SKILL AND NOT JUST A MAJOR

Wirtschaftsinformatik graduates can end up anywhere from pure SAP consulting to pure software engineering. The differentiator isn't the major — it's whether the person trained themselves to integrate the two modes of thinking, or whether they specialized into one and forgot the other. I've actively kept both muscles trained.

Tech side: 4 semesters at TUM CIT — Applied Econometrics, Statistical Thinking, Business Analytics & Machine Learning, Cloud-Based Data Processing, Fundamentals of Databases, Software Engineering for Business Applications. Plus self-directed building: WayBack, joanduan.dev, Interview Me (RAG), Tableau project.

Business side: Co-founder ownership of a 1.6M creator brand for 18 months (data-driven editorial decisions, revenue pipeline understanding, platform business mechanics). Plus academic foundation in business process modeling (BPMN, ARIS framework, bicycle manufacturing case study).

## WHERE THE BRIDGE SHOWS UP IN MY WORK

**In WayBack**: Every UI decision was justified by a user-facing metric, not just code correctness. "Would a tourist trust this?" was the filter for AI-generated descriptions. The contextBoost re-ranking layer exists because backend pure-algorithm output didn't match real-user "what's relevant now" intuition — I added a frontend translation layer.

**In joanduan.dev**: The Hero AI Vision Evolution concept is technically Canvas 2D + particle math, but the strategic decision was "make the portfolio its own proof, not a brochure for itself." Engineering choice (12K particles, three choreographed states) serving a business goal (recruiter spends 30 seconds on the site instead of 5).

**In Creator Economy work**: Every editorial decision was a data decision. Style guide creation was a business-scaling problem solved with a documentation-engineering approach. The freelance live commerce work explicitly bridges audience understanding (creator side) with platform commission structures (business side).

**In Tableau Fortage analysis**: Data quality decisions (handling 25% NULL CustomerIDs) were framed as business analytical statements ("we can still report revenue by country even when we can't report by customer") rather than housekeeping. Each chart was justified by a business question, not by chart possibility.

## SPECIFIC MENTAL MODELS

**1. "What decision changes when you see this?"**
Filter for any dashboard / analysis / data viz request. If the answer is "nothing concrete," the request is wrong. Either sharpen the question or skip the work.

**2. "What's the user-facing metric?"**
Every engineering decision should be traceable to something a user (or stakeholder) would notice. "Cleaner code architecture" is rarely a sufficient justification on its own — what does the user see differently?

**3. "What's the business cost of doing this the technically pure way?"**
Pure algorithms with no UX context (WayBack backend) get a frontend translation layer. Pure data dumps with no business framing (Tableau project) get a 4-question structure imposed. Pure technical instinct often produces deliverables nobody can use.

**4. "What's the engineering cost of doing this the business-pure way?"**
Conversely: "stakeholder wants all-the-charts-please" produces dashboards that obscure rather than illuminate. The engineering filter is "this view earns its place by answering a specific question." Pushing back is part of the bridge skill.

## CHALLENGES I'VE WORKED THROUGH

**Challenge 1**: In WayBack, the academic / paper side (Sappelli et al. 2017 evaluation framework) and the consumer mobile UX side seemed at odds.
**Decision**: Two-layer UI. Default state surfaces the four evaluation criteria as plain-English signals; the "How we picked these signals" modal exposes the academic citation layer. Users get the simple version; reviewers get the rigor. Bridge problem solved without compromising either side.

**Challenge 2**: In the Tableau project, the dataset had 25% missing CustomerIDs.
**Decision**: Frame the decision in business terms ("we exclude NULL customers from the Top-10 customer view because you can't act on what you can't identify; we include them in country and revenue totals because we still know what they bought and from where"). The technical decision becomes a business statement that stakeholders can verify makes sense.

**Challenge 3**: In the creator economy work, "what audiences say they want" diverged systematically from "what they engaged with."
**Decision**: Trust the engagement data, but listen to comments for narrative direction (qualitative themes, not editorial decisions). This is the bridge: data drives the WHAT, comments inform the HOW.

## WHAT I CAN CONTRIBUTE

- I can sit between an engineering team and a product / business team and translate in both directions without losing either side's substance.
- I push back on requests that don't pass the "what decision changes" filter — respectfully but consistently.
- I bring formal training (BPMN process modeling, business analytics coursework) AND operator experience (creator economy 1.6M scale). Most candidates have one or the other.
- I make engineering decisions that account for business consequences, and I justify business decisions in terms a technical team can verify.
- This is exactly the role AI startups, consultancies, and tech-business hybrid product teams need someone to play. I've been training for it for 4 years.

## WHAT I'M NOT

- I'm not a pure deep-technical engineer (don't claim distributed systems / kernel work / advanced ML research).
- I'm not a pure strategy consultant (don't claim MBA-level financial modeling or M&A experience).
- The bridge IS the value. Trying to compete with specialists on their home turf would be the wrong move.`,
    metadata: {
      topic_tags: ['tech-business-bridge', 'Wirtschaftsinformatik', 'TUM',
                   'product-thinking', 'business-context', 'cross-functional',
                   'engineering-decisions', 'business-decisions'],
      skills_demonstrated: ['translation-between-engineering-and-business',
                           'business-question-sharpening',
                           'user-facing-metric-traceability',
                           'engineering-trade-off-business-framing',
                           'BPMN-process-modeling',
                           'data-driven-business-decisions',
                           'stakeholder-pushback'],
      honesty_notes: ['NOT a pure deep-technical engineer',
                     'NOT a pure strategy consultant',
                     'the bridge is the value, not specialist depth on either side']
    }
  },

  // ===========================================================================
  // REFLECTION CHUNKS (9-11)
  // ===========================================================================

  // ---------- 9. Why Wirtschaftsinformatik --------------------------------
  {
    id: 'reflection-why-wirtschaftsinformatik',
    type: 'reflection',
    text: `Why I Chose Wirtschaftsinformatik

## THE SHORT ANSWER

Because pure tech misses the why and pure business misses the how. The interesting problems live where they meet. I'd rather build the bridge than guard one shore.

## THE LONGER ANSWER

When I was applying to universities, I was already comfortable with two modes of thinking that most people separate:

I'd grown up watching my mother work as an engineering designer. She designs hardware — conferencing systems and equipment deployed in meeting rooms around the world. What I saw, sitting next to her as a kid, wasn't engineering as an abstract discipline. It was engineering as a way of asking "will real people actually use this, and will it actually work in their actual rooms?" Every product she shipped did two things: contributed to the business, and got used by real humans in real situations. That was my reference for what engineering is.

By the time I was choosing a degree, I was also running content operations for a creator brand — analyzing audience data, making editorial decisions under platform-algorithm consequences. I was getting daily proof that the most useful work happens when you can read engagement metrics fluently AND make strategic decisions about what to ship next. The two modes weren't separable.

Pure computer science felt like training one of those muscles and letting the other atrophy. Pure business administration felt like the opposite. Wirtschaftsinformatik was the formal program built for keeping both alive.

## WHY TUM SPECIFICALLY

TUM's Wirtschaftsinformatik program sits in the CIT (Computation, Information, Technology) department, not in the business school. That signal matters. The technical foundations are real: I take software engineering, databases, statistical thinking, machine learning, and cloud-based data processing alongside the business / process / analytics coursework. The graduates I respect from this program don't end up as SAP consultants by accident; they end up as the people who can both build something AND defend why it's worth building.

The other signal: the program is taught with serious people. The cohort is small enough that you can't coast. Everyone here is years ahead of me on some dimension. I'm not intimidated — I'm calibrating. The point of climbing isn't to be the tallest; it's to keep finding harder mountains.

## WHAT I'M OPTIMIZING FOR

I'm not optimizing for "title that sounds prestigious in 4 years." I'm optimizing for a career where I can build things that:
1. Contribute to a business (revenue, growth, sustainability)
2. Get used by real people in real situations (not slides, not internal political wins)
3. Use my technical training and my product / business instinct in the same job, not in separate jobs

That ruled out a lot of paths early. It ruled IN AI / data startups, tech-adjacent business roles at AI-native companies, and product-engineering hybrids. It ruled in companies where engineering and business sit in the same room and argue productively.

## WHAT I'M NOT OPTIMIZING FOR

I'm not optimizing for academic ML research (I'm not pursuing a PhD track and I don't pretend to want to). I'm not optimizing for pure SAP / enterprise consulting (the most common Wirtschaftsinformatik path — and a perfectly fine one, just not mine). I'm not optimizing for prestigious-name brand on the CV regardless of what the actual work is.

## WHY THIS MATTERS FOR HIRING ME

Recruiters who read "Wirtschaftsinformatik student" sometimes default to "SAP / IT consulting candidate" because that's what most graduates do. I'm not that. I'm the version of this degree that builds AI-native products, ships them, and can argue about both the engineering choices and the business consequences. That's the version that's useful at a startup / AI lab / tech-adjacent-business team, and that's where I'm aiming.

## WHAT I CAN CONTRIBUTE FROM THIS CHOICE

- I bring formal training in BOTH technical foundations AND business-process / data-modeling thinking. Most candidates have one stack.
- I've spent 4 semesters at TUM CIT alongside people who treat technical work seriously. The peer environment matters.
- I won't drift into pure-tech or pure-business specialization because I deliberately chose the bridge degree. The optimization is path-dependent now.`,
    metadata: {
      topic_tags: ['Wirtschaftsinformatik', 'TUM', 'Information-Systems',
                   'why-this-major', 'career-choice', 'tech-business-bridge',
                   'family-influence', 'motivation'],
      skills_demonstrated: [],
      honesty_notes: ['this is a philosophical / motivation chunk, not a skill claim',
                     'specifically NOT aimed at SAP consulting track',
                     'not pursuing PhD / research track']
    }
  },

  // ---------- 10. Why I Build, Not Theorize --------------------------------
  {
    id: 'reflection-why-i-build',
    type: 'reflection',
    text: `Why I Build, Not Theorize

## THE CORE BELIEF

The best technology is the kind you forget you're using — because it works the way you already think. The worst makes you translate yourself before it understands you. The work, for me, is closing that gap. And you can't close that gap by writing about it. You close it by shipping.

## WHERE THIS COMES FROM

I grew up impulsive — quick to opinion, slow to proof. Then I moved to a country where every sentence has to carry its own evidence. (Germany, age 14, no German.) That rewires you. Mine got rewired. I learned that opinions are cheap and that "proof of work" is the only currency that actually moves a conversation forward.

So when I think about my career, I don't think about "what would I theorize about." I think about "what would I ship." If I can't see the shipped version in my head, the idea isn't real yet.

## HOW THIS SHOWS UP IN MY WORK

**joanduan.dev**: Instead of writing "I can build AI-native products," I built a portfolio site whose Hero IS the AI-native product. The visitor sees the claim executed before they read it.

**WayBack**: Instead of theorizing about context-aware recommendation (the paper does that), I shipped a frontend that makes the framework feel like a consumer app. The paper still exists; my contribution is the live product.

**Interview Me (currently shipping)**: Instead of "I'm learning RAG," I built a RAG-powered Q&A system from scratch in 4 hours of focused work, and it's deploying as a real feature on a real site you can visit. Learning shows up as shipped artifacts.

**Creator brand to 1.6M**: I didn't talk about content strategy; I executed it. 200+ videos shipped. The work is the proof.

**Tableau Fortage**: I didn't write a paper about UK retail data quality; I built a 4-view dashboard with documented data quality decisions on 541K real rows.

## WHY THIS IS A REAL VALUE, NOT JUST A PERSONALITY TRAIT

Most teams have "ideas people" oversupplied and "shipping people" undersupplied. The bottleneck in 9 out of 10 product organizations is execution, not vision. Every team I've worked in has had at least one person who could brainstorm endlessly but couldn't reduce-to-practice. I'm the opposite. I brainstorm AS I'm building, and the building is the brainstorming.

This is especially true at AI startups, where the gap between "we could build X" and "we actually built X" is enormous and where the speed of shipping is often the moat.

## WHAT THIS MEANS FOR HOW I WORK

- **Default to shipping**: If there's a debate about whether to do X, I'd rather ship a small version of X and let the result inform the next decision than have a 2-hour meeting about it.
- **Demos > decks**: I'd rather show someone a 30-second working prototype than walk them through 12 slides describing what we could build.
- **Documentation as artifact**: Even my reflection / philosophy work (like this chunk) gets shipped in code. This very text is part of a RAG knowledge base, embedded and deployed.
- **Self-imposed deadlines**: One week for joanduan.dev. Four hours for the first RAG prototype. A week for this Interview Me deployment. Constraint forces shipping.

## WHAT I DON'T MEAN BY THIS

I don't mean "I refuse to plan." I plan obsessively at the START of a project (Figma mockups before code, knowledge base structure before chunks, data quality decisions before charts). What I refuse to do is plan IN PLACE OF building. Planning is a phase; shipping is the result. If the plan phase exceeds the shipping phase by more than 30% on a project, something's wrong.

I also don't mean "I'm anti-rigor." WayBack is paper-aligned; the Tableau analysis has documented data quality decisions; the Interview Me RAG has hallucination prevention. Rigor and shipping are complementary, not opposed. Rigor that never ships is just procrastination with citations.

## WHAT I CAN CONTRIBUTE FROM THIS

- I close the gap between "we could build X" and "X is live" faster than most candidates at my career stage.
- I plan well at the start of projects but I don't get stuck in the planning phase.
- I'm a useful counterweight on teams where the bottleneck is execution. I shift the team's energy toward ship-state.
- I treat shipping as a practice, not a personality trait. Anyone can build the habit; I just started building it early.`,
    metadata: {
      topic_tags: ['shipping-philosophy', 'execution', 'building-vs-theorizing',
                   'product-thinking', 'demo-culture', 'self-imposed-deadlines',
                   'reflection', 'work-style'],
      skills_demonstrated: [],
      honesty_notes: ['this is philosophy / work-style chunk',
                     'NOT anti-planning or anti-rigor',
                     'shipping discipline is learned, not innate']
    }
  },

  // ---------- 11. What Kind of Team I Want to Join -----------------------
  {
    id: 'reflection-team-fit',
    type: 'reflection',
    text: `What Kind of Team I Want to Join

## THE SHORT VERSION

A small team building an AI-native product, where engineering decisions and business decisions sit in the same room and argue productively, and where the bar is shipping things real users actually use. I want to learn from people years ahead of me, and I want to contribute non-trivially within weeks of joining.

## THE LONGER VERSION

### What I'm actively looking for

**Team size**: 5-50 people. Small enough that I can see how engineering decisions become business outcomes. Big enough that there are people more experienced than me to learn from. Below 5 feels like solo founding; above 100 starts looking like silo-shaped roles where the bridge isn't necessary.

**Product focus**: AI-native or data-native. Either AI is in the core product (LLM features, RAG, agents, computer vision, recommendation systems) or data is the product (analytics platforms, BI tools, dashboards-as-product, creator tools). I'm NOT looking for "company that uses ChatGPT internally for productivity" — I want "company whose product wouldn't exist without AI / data."

**Stage**: Early-stage to early-growth. Seed through Series B is the sweet spot. Before product-market fit there's too much chaos for a junior contributor to navigate; after Series C the role tends to specialize too narrowly. The sweet spot is "we know the product works; we're scaling and refining."

**Engineering culture**: Ship-oriented. Bias toward demos, not decks. Code review that's substantive, not gatekeeping. Documentation that's actually maintained. Time for craft (good UX, real testing) but not time for endless bike-shedding. The team I want would describe itself as "we ship every week" not "we have careful sprints every two weeks."

**Business culture**: Empirical. Decisions are made with data when data exists; with documented hypotheses when data doesn't yet exist. Not HiPPO-driven ("highest-paid person's opinion"). Not metric-blind. Somewhere in the middle.

### What I want to learn from a team

- How experienced people make engineering trade-off decisions under real time / resource constraints
- How product / engineering / business decisions get integrated in practice (not in theory)
- How to operate at the level of a 30-year-old senior engineer when I'm a 21-year-old Wirtschaftsinformatik student. The pattern-matching for what "good" looks like is the highest-leverage thing I can learn right now.

### What I want to contribute

- Frontend ownership for AI-native product features. I can take a Figma mock or a verbal spec and ship a polished, mobile-responsive, deployed feature within a sprint.
- Data analytics and dashboard work. I can take messy real-world data and produce business-ready visualizations with documented analytical decisions.
- Operator-perspective input on creator-economy / audience-engagement features (if relevant to the product).
- Tech-business translation. I can explain what a Flask backend constraint means to a product manager, or what a "we need this view to drive conversion" requirement means to an engineer, in both directions.
- Operating in three working languages (English, German, Mandarin) if the team is internationally distributed.

### What I'm NOT looking for

- **Pure agency / consulting work**: I don't want to be moved between clients every 3 months. I want to live inside one product long enough to make meaningful contributions.
- **Pure SAP / enterprise IT consulting**: the default Wirtschaftsinformatik track. Fine work, not for me.
- **"AI" companies that are wrapper-only on existing APIs without real product thinking**: I can spot these in 5 minutes and they're not where I'll learn.
- **Pure research labs**: I'm not pursuing a research / PhD track. I respect the work; it's not my mode.
- **Manufacturing / automotive / energy / heavy industry**: these are TUM Wirtschaftsinformatik defaults that I deliberately filter against. Different problem space, not mine.

### Specific role categories that fit

**Werkstudent / Internship roles I'd consider**:
- Frontend engineer at an AI startup (Anthropic-style, Cambrion-style, anything in the AI-product layer)
- Data analyst / analytics engineer at a consumer product company with real engagement data
- Product / engineering hybrid role at an AI tooling startup
- Applied AI engineer (junior) at a company building agents, RAG products, or LLM-integrated SaaS
- Creator tool / creator economy startup, especially with Chinese / cross-border angle

**Companies I find interesting** (not job applications, just signal of direction):
Anthropic, OpenAI, Notion, Linear, Vercel, Cursor, Figma, Tableau / Salesforce, smaller AI-native startups in Munich (Cambrion, Helsing, etc.) and Berlin.

## WHAT I'M COMMITTING TO IF YOU HIRE ME

- I'll show up understanding that I'm the most junior person in the room and act accordingly: listen first, ask before assuming, take notes.
- I'll contribute non-trivially within 2-4 weeks (small but real shipped work, not just shadowing).
- I'll communicate clearly: when I'm stuck, when I'm shipping, when I'm uncertain.
- I'll respect domain boundaries: I won't try to own backend / DevOps / ML research areas where I'm not yet competent.
- I'll show up to feedback as someone trying to compress a 10-year skill curve, not as someone defending what I already know.

## WHAT I'M ASKING FOR FROM THE TEAM

- Real work, not coffee-fetching. Werkstudent rates exist for a reason; I'd rather earn them.
- A peer or mentor I can ask "is this approach reasonable?" without it being a big production.
- Visibility into how decisions are actually made (engineering, product, business) — even if my role is small.
- Honest feedback. I'd rather hear "this isn't working" early than at the end of my contract.

That's the team I'm building toward. If you're reading this and that sounds like your team — let's talk.`,
    metadata: {
      topic_tags: ['team-fit', 'job-search', 'AI-startup', 'Werkstudent',
                   'internship', 'role-fit', 'company-stage', 'reflection',
                   'career-direction'],
      skills_demonstrated: [],
      honesty_notes: ['this is a fit / preference chunk, not a skill claim',
                     'explicitly NOT seeking SAP / IT consulting / manufacturing',
                     'explicitly seeking AI-native / data-native products',
                     'small-team preference (5-50 people)',
                     'early-stage preference (seed through Series B)']
    }
  },

]

// =============================================================================
// CONTACT INFO — graceful fallback target
// =============================================================================
//
// Used by:
//   1. System prompt in the API Route — when Claude can't answer from
//      retrieved context, it offers this email instead of guessing.
//   2. Frontend UI footer — always-visible "Can't find what you need?"
//      link as a permanent escape hatch for users.
//
// Production hygiene:
//   - This is Joan's real personal email. Spam risk accepted at v1.
//   - If spam becomes a problem, route this through a dedicated
//     forwarding address (joan@joanduan.dev → gmail) and rotate.
// =============================================================================

export const CONTACT_INFO = {
  email: 'haic.duan@gmail.com',
  fallback_message: "For specific questions like this, the best path is to reach me directly at haic.duan@gmail.com — I'm happy to discuss in more depth.",
  partial_answer_message: "For the rest, the most accurate answer comes from a direct conversation — feel free to email me at haic.duan@gmail.com.",
}

// =============================================================================
// SYSTEM PROMPT — grounded generation with fallback
// =============================================================================
//
// Used in the API Route. Injected with retrieved {context} and user {query}
// before calling Claude. The grounding rules + fallback behavior are baked
// in here so they're consistent across every call.
// =============================================================================

export const SYSTEM_PROMPT_TEMPLATE = `You are answering questions about Joan Duan (Haichen Duan) in her own voice, based STRICTLY on the information provided in the retrieved context below.

GROUNDING RULES (non-negotiable):
1. Answer ONLY using information from the retrieved context.
2. Speak in first person ("I built...", "I learned...") — you are speaking AS Joan.
3. Do NOT use general knowledge about TUM, Wirtschaftsinformatik, AI, or any topic. Only use what's in the context.
4. Do NOT make up facts, dates, numbers, project names, or claims.
5. Stay in Joan's tone: direct, specific, honest about scope, no over-claiming.

WHEN YOU CAN'T ANSWER:
If the retrieved context does not contain enough information to answer the question, you MUST:
1. Acknowledge briefly what you don't know.
2. Suggest the user reach Joan directly: "For specific questions like this, the best path is to reach me directly at haic.duan@gmail.com — I'm happy to discuss in more depth."
3. Do NOT speculate or fill in gaps with plausible-sounding inference.

WHEN YOU CAN PARTIALLY ANSWER:
If the context partially answers the question but not fully:
1. Answer the part you can, clearly.
2. Then say: "For the rest, the most accurate answer comes from a direct conversation — feel free to email me at haic.duan@gmail.com."

LENGTH & STYLE:
- Keep answers concise (~100-200 words for most questions).
- Use specifics from the context (numbers, project names, decisions) over generalities.
- If asked about a project, surface the most relevant Challenge / Decision / Learning from the chunk.
- Don't sound like a brochure. Sound like Joan answering in an interview.

RETRIEVED CONTEXT:
{context}

USER QUESTION:
{query}`

// =============================================================================
// USAGE NOTES
// =============================================================================
//
// This file is the RAW knowledge base. Embeddings are NOT generated here.
//
// Next step in the pipeline:
//   1. Run a build-time script (TypeScript or Python) that:
//      a. Loops through `knowledgeBase`
//      b. Calls Voyage AI's embedding API on each chunk's `text` field
//      c. Writes the result to `app/lib/knowledge-base-embedded.json`
//   2. The Next.js API Route (`app/api/interview-me/route.ts`) loads
//      `knowledge-base-embedded.json` at runtime, embeds the user query
//      via Voyage AI, computes cosine similarity, retrieves top-K chunks,
//      and calls Claude with `SYSTEM_PROMPT_TEMPLATE` filled in.
//   3. The frontend chat component (`app/components/InterviewMe.tsx`)
//      ALWAYS displays a footer link to `CONTACT_INFO.email` as a
//      permanent escape hatch (Hybrid fallback — prompt-level + UI-level).
//
// Chunk design principles applied here:
//   - STAR structure for narrative consistency (Situation / Task / Action / Result)
//   - "What I learned" + "What I can contribute" closer sections
//   - Honesty discipline: every chunk's metadata includes honesty_notes
//     flagging what was NOT done — this builds HR trust through under-claiming
//   - Information density: chunks are long (300-800 words) because the HR
//     never reads chunks directly; AI uses chunks to generate ~150-word answers
//   - First-person voice throughout so AI can answer in Joan's voice
//   - Specific numbers + decisions wherever possible (541K rows, 1.6M followers,
//     12K particles, 6-week deadline, $8 spend cap, etc.) to signal real work
//
// Graceful fallback design (Hybrid):
//   - Layer 1 (LLM): system prompt instructs Claude to surface contact email
//     whenever retrieved context can't answer (full or partial)
//   - Layer 2 (UI): chat component footer always shows contact link
//   - Both layers point to CONTACT_INFO.email — single source of truth
//
// Total: 11 chunks + system prompt template + contact info. ~12,000 words.
// =============================================================================
