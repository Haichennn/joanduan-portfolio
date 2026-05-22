import Link from "next/link";

export default function RepolensPage() {
  return (
    <main className="bg-[var(--base)] min-h-screen">
      <article className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <div className="mb-16">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--mute)] hover:text-[var(--accent)] transition-colors"
          >
            ← back to projects
          </Link>
        </div>

        <header className="mb-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
            AI / AGENTS
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-[var(--ink)] tracking-tight leading-[1.05] mb-6">
            Repolens
          </h1>
          <p className="font-display text-2xl md:text-3xl text-[var(--ink)]/85 italic tracking-tight leading-snug mb-8 max-w-2xl">
            What you&apos;re committing to.
          </p>
          <p className="font-sans text-lg md:text-xl text-[var(--ink)]/75 leading-relaxed max-w-2xl">
            Five AI agents inspect a GitHub repository in parallel. One verdict in under a minute.
          </p>

          <div className="mt-12 space-y-8">
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                  Role
                </p>
                <p className="font-sans text-sm text-[var(--ink)]">
                  Solo · Product, Backend, Frontend, Infra
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                  Timeline
                </p>
                <p className="font-sans text-sm text-[var(--ink)]">
                  14 days · May 2026
                </p>
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                Stack
              </p>
              <p className="font-sans text-sm text-[var(--ink)] leading-relaxed">
                Python · FastAPI · LangGraph · MCP · Docker · Next.js · TypeScript · Tailwind · shadcn/ui · Railway · Vercel
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                Status
              </p>
              <p className="font-sans text-sm text-[var(--accent)]">
                ● Production live · active development
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-[0.15em]">
            <a
              href="https://repolens-audit.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
            >
              Live demo →
            </a>
            <span className="text-[var(--mute)]">·</span>
            <a
              href="https://github.com/Haichennn/repolens"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
            >
              GitHub →
            </a>
            <span className="text-[var(--mute)]">·</span>
            <a
              href="https://repolens-production-61e0.up.railway.app/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
            >
              API docs →
            </a>
            <span className="text-[var(--mute)]">·</span>
            <a
              href="https://github.com/Haichennn/repolens/tree/main/skills/repolens"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
            >
              Skill source →
            </a>
          </div>
        </header>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6">
            The problem.
          </h2>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            When I&apos;m building, I want to know what an industry-standard repo looks like before modeling my own work on it. When I&apos;m reading code, I want a single screen that tells me whether this repo is worth adopting. Both reduce to the same question: structured assessment of an entire codebase, surfaced in seconds, not hours.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            Off-the-shelf tools fragment this work. Snyk for CVEs, SonarQube for quality, Depfu for dependencies, manual reading for architecture and documentation. Five tools, five accounts, five tabs. The signal is buried in tooling overhead.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            Repolens collapses this into one workflow. Paste a GitHub URL. Five LLM agents inspect the repo in parallel across documentation, architecture, maintenance, testing, and security. Result: a structured report in 30 seconds with evidence-cited findings and recommendations.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            Five agents, one verdict.
          </h2>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            The audit dimensions weren&apos;t a marketing decision. Documentation, architecture, maintenance, testing, and security cover what a senior engineer would actually inspect during code review: can I read it, is it structured, is it maintained, is it tested, is it safe.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            Each dimension is an independent LangGraph node returning a Pydantic schema: score, severity, summary, findings, recommendations. Nodes run in parallel via LangGraph fan-out, then aggregate into a weighted overall verdict. Each agent uses <code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">with_structured_output</code> so the LLM output is typed end-to-end, not parsed from prose.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            The security agent calls out to a custom MCP server. Two tools exposed via JSON-RPC over stdio: <code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">lookup_cves(dep)</code> queries the CVE database, <code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">lookup_package(dep)</code> queries PyPI/npm registry. The MCP pattern matters here because it demonstrates Anthropic&apos;s late-2024 protocol in production code, not as a demo.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            Making agentic visible.
          </h2>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            V1 shipped on Day 8. It worked. Users got their audit in 30 seconds, complete report at the end.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            Something felt off in my own use. I opened the site, pasted a URL, clicked run. Blank screen for 30 seconds. Then everything appeared at once.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            The whole product positioning was &ldquo;agentic&rdquo; — five agents working in parallel. None of that was visible. Users couldn&apos;t see the parallelism that was the differentiating insight. The UX was indistinguishable from a slow API call.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            Day 10 I refactored the orchestration: LangGraph <code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">.invoke()</code> became <code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">.astream()</code>, FastAPI returned <code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">StreamingResponse</code> with proper SSE format (<code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">text/event-stream</code>, <code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">Cache-Control: no-cache</code>, <code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">X-Accel-Buffering: no</code> for proxy resistance), frontend replaced <code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">fetch</code> with <code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">EventSource</code>. As each agent completes, the corresponding dimension row populates with score and severity color.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            One trap caught during design review: <code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">EventSource</code> auto-reconnects on disconnect by default. On a transient network blip, the frontend would silently re-trigger a full 30-second audit on the backend. I disabled auto-retry and exposed a &ldquo;Connection lost&rdquo; state instead.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            Same product, completely different feel. The kind of UX gap that doesn&apos;t surface in MVP testing — and is easy to ignore post-launch — except it&apos;s the whole reason &ldquo;agentic&rdquo; sells.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            Docker shaped two architectural decisions worth flagging. First, the MCP server runs as a subprocess inside the backend container, isolated but co-located — the <code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">command=sys.executable</code> portability fix surfaced because Docker&apos;s <code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">python3</code> symlink behaviour differs from macOS&apos;s. Second, the multi-stage Dockerfile keeps the production image lean (Python slim base, no build tools in final layer) and makes Railway deploys reproducible. The same image runs locally, in CI, and in production; the same image will be the basis for V3&apos;s self-hosted Docker Compose stack for enterprise customers who need on-prem deployment.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            Three channels, one product.
          </h2>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            Day 13 I sketched a &ldquo;built-in terminal&rdquo; feature. Users could fix flagged issues right inside Repolens. WebContainer as runtime, mockups looked impressive.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            By Day 14 morning I&apos;d cut it. The realization was uncomfortable but obvious: users already have Cursor, Claude Code, and Codex. Building a worse-version-of-their-IDE inside Repolens repeats the wheel. The right move was the opposite — make Repolens callable FROM their IDE.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            I shipped Repolens as a Claude Skill instead. <code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">skills/repolens/SKILL.md</code> is just markdown with YAML frontmatter — Anthropic&apos;s Skill spec. A user installs it once, then typing <code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">audit github.com/owner/repo</code> inside Cursor triggers Claude to call Repolens API, parse the result, and present findings inline.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            Three channels emerged: web UI for demo and discovery, REST API for programmatic users, Claude Skill for daily-driver inside IDEs. Same product, three points of contact. The Skill is the most novel: in the AI-tooling era, distribution-as-instruction is a real shipping artifact. Code isn&apos;t the only deliverable; instructions to other AIs are.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            What it actually catches.
          </h2>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            I audited Repolens with Repolens.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            V1 score: 67/100. Documentation: missing CONTRIBUTING.md, no Quick Start guide. Testing: 7.4% test ratio (2 test files for 30 source files), no CI configured. Security: 10 of 11 dependencies unpinned. Architecture and maintenance scored well; the gaps were exactly what I&apos;d skipped in the build sprint.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            I fixed everything it flagged. Pinned all dependencies to exact versions in <code className="font-mono text-sm bg-[var(--ink)]/5 px-1.5 py-0.5">requirements.txt</code>. Added GitHub Actions CI with parallel backend imports + frontend lint/typecheck/build jobs. Wrote LICENSE, CONTRIBUTING.md, expanded README with Quick Start. Re-audited: 80+.
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            The dogfooding loop closed. The tool worked on the tool&apos;s own repo. The findings were specific, actionable, and correct — not vague platitudes like &ldquo;improve documentation&rdquo; but cited gaps like &ldquo;no CONTRIBUTING.md, no Quick Start guide, README lacks installation instructions for non-developers.&rdquo;
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            What I optimized for, what I traded.
          </h2>

          <div className="space-y-8 mt-10">
            <div className="border-l border-[var(--ink)]/15 pl-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Optimized for — Time-to-signal
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                From URL paste to actionable findings in under a minute. Senior-engineer voice in the output — evidence-cited, opinionated, citing specific dimension scores rather than generic encouragement.
              </p>
            </div>

            <div className="border-l border-[var(--ink)]/15 pl-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Traded — Ecosystem breadth
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                Repolens audits Python and JavaScript/TypeScript dependencies; Go, Rust, Java are V3. Depth on PyPI/npm was the trade for the breadth I didn&apos;t ship.
              </p>
            </div>

            <div className="border-l border-[var(--ink)]/15 pl-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Traded — Real-time UI for memo and due diligence
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                Those endpoints are blocking (no SSE) because they take 10-45 seconds and the engineering cost for streaming didn&apos;t pencil out at this stage. Same SSE pattern can extend there in V3.
              </p>
            </div>

            <div className="border-l border-[var(--ink)]/15 pl-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Did not yet build — Enterprise compliance layer
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                The current build is open-source and intended for individual / small-team use. Enterprise deployment requires the layer described in V3 below — data residency, model provider switching, audit trails, self-hosted Docker Compose. The MVP focuses on demonstrating product thesis; compliance follows when there&apos;s a procurement conversation that requires it.
              </p>
            </div>

            <div className="border-l border-[var(--ink)]/15 pl-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Optimized for — Distribution shape
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                Skill {">"} standalone product. Repolens lives inside users&apos; existing tools, not as a new destination.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            What this actually solves.
          </h2>
          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-6 max-w-2xl">
            Three workflows, today, that Repolens compresses from hours to under a minute:
          </p>

          <div className="space-y-10 mt-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Workflow 01 — The adoption decision
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed max-w-2xl">
                &ldquo;Should we use LangChain or LlamaIndex for our RAG project?&rdquo; Engineers spend 30-90 minutes reading two READMEs, scanning issue trackers, checking last commit dates, eyeballing test coverage, debating in Slack. Repolens compresses this: paste both URLs, get a structured verdict with strengths, concerns, next steps, and red flags in under a minute. The decision still belongs to the team, but evidence is structured and time-to-judgment collapses.
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Workflow 02 — The supply chain review
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed max-w-2xl">
                Before production deploy, security needs to know which dependencies are abandoned, which licenses are commercially incompatible, which are maintained by a single person. Manually: click through each dependency on PyPI/npm, check last release dates, parse license fields. For 30 dependencies, 1-2 hours. Repolens: 45 seconds with structured per-dependency risk levels, license compatibility flags, and alternative suggestions where high-risk.
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Workflow 03 — The portfolio check
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed max-w-2xl">
                Before submitting code to a manager or mentor, you want a final quality pass. Does the README hold up, is the architecture coherent, did I forget tests for the new module. Currently I push to GitHub and audit via Repolens; V3 will close the loop with local repo upload so the pre-push audit becomes part of the commit ritual.
              </p>
            </div>
          </div>

          <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mt-10 mb-6 max-w-2xl">
            The common thread: structured assessment of an entire codebase, in seconds. Not a chatbot, not a code search, not a CI step. A compressed senior-engineer review surfaced in a single screen.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[var(--ink)] tracking-tight mb-6 mt-16">
            V3: what comes next.
          </h2>

          <div className="space-y-10 mt-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Personalized audit rubrics
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed max-w-2xl">
                Industry-standard scoring is the default, but enterprises have their own standards: required folder structure, naming conventions, mandatory files (SECURITY.md, ADR templates), specific dependency policies. V3 will let teams define a custom rubric (YAML config or web UI) and audit against that. Repolens becomes the layer that operationalizes &ldquo;our team&apos;s quality standards&rdquo; without humans manually reviewing every repo.
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Enterprise compliance and data residency
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed mb-4 max-w-2xl">
                Enterprise deployment requires guarantees the open-source build cannot make alone:
              </p>
              <ul className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed space-y-3 max-w-2xl list-none pl-0">
                <li>
                  <em>EU AI Act readiness.</em> Under the AI Act, AI systems used for automated decision-making in commercial contexts require risk classification, documentation of model providers, and transparency about training data. V3 ships with a compliance pack: model card disclosures, decision rationale logs, and configurable human-in-the-loop checkpoints.
                </li>
                <li>
                  <em>Data residency.</em> Source code is sensitive corporate data. EU customers cannot send code to US-hosted LLM endpoints under GDPR Article 44 (transfers to third countries). V3 supports EU-region Anthropic endpoints (Frankfurt) and configurable LLM provider switching for customers requiring on-premise inference (Azure OpenAI EU, AWS Bedrock EU).
                </li>
                <li>
                  <em>No training on customer code.</em> Default Anthropic API terms exclude API inputs from training; V3 makes this explicit in the deployment config and surfaces it to compliance teams as part of the audit trail.
                </li>
                <li>
                  <em>Self-hosted deployment.</em> For customers with classification levels above what SaaS can satisfy, Repolens ships as a Docker Compose stack: backend, frontend, MCP server, no external dependencies beyond the LLM endpoint (which can be on-prem).
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Local repo audit
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed max-w-2xl">
                Pre-push quality check without GitHub push. Upload a folder or zip, run the same 5-dimensional audit on local files. Architectural shift: current pipeline is GitHub-API-driven, V3 adds local file traversal as a parallel input path.
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Audit history and score trajectory
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed max-w-2xl">
                Track repos over time as users iterate. Score curves, &ldquo;+8 points since last week,&rdquo; regression alerts. The user behavior surfaced from my own dogfooding loop — I kept re-auditing Repolens after polish sessions to see the score move.
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Multi-ecosystem dependencies
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed max-w-2xl">
                Go, Rust, Java registry clients with license and popularity heuristics matching the PyPI/npm depth.
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                Streaming for memo and due diligence
              </p>
              <p className="font-sans text-base md:text-lg text-[var(--ink)]/75 leading-relaxed max-w-2xl">
                Same SSE pattern that transformed the audit UX, extended to the slower endpoints.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24 pt-12 border-t border-[var(--ink)]/10">
          <div className="flex flex-wrap gap-x-12 gap-y-4 mb-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                Live
              </p>
              <a
                href="https://repolens-audit.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
              >
                repolens-audit.vercel.app
              </a>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                Code
              </p>
              <a
                href="https://github.com/Haichennn/repolens"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
              >
                github.com/Haichennn/repolens
              </a>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
                API docs
              </p>
              <a
                href="https://repolens-production-61e0.up.railway.app/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
              >
                repolens-production-61e0.up.railway.app/docs
              </a>
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] mb-1">
              Stack
            </p>
            <p className="font-sans text-sm text-[var(--ink)]/75 leading-relaxed">
              Python · FastAPI · LangGraph · MCP · Pydantic · Docker · Next.js · TypeScript · Tailwind · shadcn/ui · Railway · Vercel
            </p>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--mute)] mt-10">
            — Haichen Duan, May 2026
          </p>
        </section>

        <div className="mt-20 pt-12 border-t border-[var(--ink)]/10">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
          >
            ← back to all projects
          </Link>
        </div>
      </article>
    </main>
  );
}
