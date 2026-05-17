import ProjectCard from "./ProjectCard";

function VisualSiteMap() {
  return (
    <svg viewBox="0 0 800 450" className="w-full h-full" fill="none">
      <rect
        x="350"
        y="80"
        width="100"
        height="50"
        stroke="var(--ink)"
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      <text
        x="400"
        y="113"
        textAnchor="middle"
        className="font-mono"
        fontSize="14"
        fill="var(--ink)"
        fillOpacity="0.7"
      >
        /
      </text>

      <line x1="400" y1="130" x2="180" y2="280" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="400" y1="130" x2="400" y2="280" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="400" y1="130" x2="620" y2="280" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1.5" />

      <rect x="120" y="280" width="120" height="50" stroke="var(--ink)" strokeOpacity="0.6" strokeWidth="1.5" />
      <text x="180" y="313" textAnchor="middle" className="font-mono" fontSize="13" fill="var(--ink)" fillOpacity="0.7">
        /about
      </text>

      <rect x="340" y="280" width="120" height="50" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="400" y="313" textAnchor="middle" className="font-mono" fontSize="13" fill="var(--ink)" fillOpacity="0.7">
        /projects
      </text>

      <rect x="560" y="280" width="120" height="50" stroke="var(--ink)" strokeOpacity="0.6" strokeWidth="1.5" />
      <text x="620" y="313" textAnchor="middle" className="font-mono" fontSize="13" fill="var(--ink)" fillOpacity="0.7">
        /contact
      </text>

      <text x="780" y="430" textAnchor="end" className="font-mono" fontSize="10" fill="var(--ink)" fillOpacity="0.4" letterSpacing="1">
        SITE STRUCTURE
      </text>
    </svg>
  );
}

function VisualMapPin() {
  const vLines = [100, 200, 300, 400, 500, 600, 700];
  const hLines = [75, 150, 225, 300, 375];
  const pins = [
    { cx: 140, cy: 120 },
    { cx: 250, cy: 280 },
    { cx: 380, cy: 180 },
    { cx: 550, cy: 340 },
    { cx: 640, cy: 100 },
    { cx: 700, cy: 250 },
  ];
  return (
    <svg viewBox="0 0 800 450" className="w-full h-full" fill="none">
      {vLines.map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="450" stroke="var(--ink)" strokeOpacity="0.08" strokeWidth="1" />
      ))}
      {hLines.map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="800" y2={y} stroke="var(--ink)" strokeOpacity="0.08" strokeWidth="1" />
      ))}

      <path
        d="M 140 120 Q 260 100 380 180 T 470 250"
        stroke="var(--ink)"
        strokeOpacity="0.2"
        strokeWidth="1"
        fill="none"
      />

      {pins.map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r="6" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1.5" />
      ))}

      <circle cx="470" cy="250" r="7" fill="var(--accent)" />

      <text x="780" y="430" textAnchor="end" className="font-mono" fontSize="10" fill="var(--ink)" fillOpacity="0.4" letterSpacing="1">
        TOURIST RE-FINDING
      </text>
    </svg>
  );
}

function VisualBarsAxis() {
  const bars = [
    { x: 120, h: 40 },
    { x: 220, h: 60 },
    { x: 320, h: 90 },
    { x: 420, h: 75 },
    { x: 520, h: 110 },
    { x: 620, h: 130, accent: true },
  ];
  const labels = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"];
  return (
    <svg viewBox="0 0 800 450" className="w-full h-full" fill="none">
      <line x1="100" y1="80" x2="100" y2="380" stroke="var(--ink)" strokeOpacity="0.6" strokeWidth="1.5" />
      <line x1="100" y1="380" x2="720" y2="380" stroke="var(--ink)" strokeOpacity="0.6" strokeWidth="1.5" />

      {bars.map((b, i) =>
        b.accent ? (
          <rect key={i} x={b.x} y={380 - b.h} width="50" height={b.h} fill="var(--accent)" />
        ) : (
          <rect
            key={i}
            x={b.x}
            y={380 - b.h}
            width="50"
            height={b.h}
            stroke="var(--ink)"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
        )
      )}

      {labels.map((q, i) => (
        <text
          key={q}
          x={bars[i].x + 25}
          y="405"
          textAnchor="middle"
          className="font-mono"
          fontSize="11"
          fill="var(--ink)"
          fillOpacity="0.5"
        >
          {q}
        </text>
      ))}

      <text
        x="50"
        y="230"
        textAnchor="middle"
        className="font-mono"
        fontSize="11"
        fill="var(--ink)"
        fillOpacity="0.5"
        transform="rotate(-90 50 230)"
        letterSpacing="2"
      >
        GMV
      </text>
    </svg>
  );
}

function VisualTerminal() {
  return (
    <svg viewBox="0 0 800 450" className="w-full h-full" fill="none">
      <rect x="60" y="40" width="680" height="370" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1.5" />

      <circle cx="85" cy="60" r="4" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="105" cy="60" r="4" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="125" cy="60" r="4" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1.5" />

      <text x="90" y="140" className="font-mono" fontSize="15" fill="var(--accent)">$</text>
      <text x="108" y="140" className="font-mono" fontSize="15" fill="var(--ink)" fillOpacity="0.7">
        ai-sales parse chat-log.txt
      </text>

      <text x="90" y="190" className="font-mono" fontSize="15" fill="var(--ink)" fillOpacity="0.6">
        → extracted 12 entities
      </text>
      <text x="90" y="240" className="font-mono" fontSize="15" fill="var(--ink)" fillOpacity="0.6">
        → schema-validated 12/12
      </text>
      <text x="90" y="290" className="font-mono" fontSize="15" fill="var(--ink)" fillOpacity="0.6">
        → posted to salesforce in 3.2s
      </text>

      <text x="90" y="340" className="font-mono" fontSize="15" fill="var(--accent)">$</text>
      <rect x="105" y="325" width="12" height="18" fill="var(--accent)" />
    </svg>
  );
}

function VisualTimeSeries() {
  return (
    <svg viewBox="0 0 800 450" className="w-full h-full" fill="none">
      <line x1="100" y1="80" x2="100" y2="370" stroke="var(--ink)" strokeOpacity="0.6" strokeWidth="1.5" />
      <line x1="100" y1="370" x2="720" y2="370" stroke="var(--ink)" strokeOpacity="0.6" strokeWidth="1.5" />

      <polygon points="441,200 550,150 720,80 720,180 550,220 441,200" fill="var(--accent)" fillOpacity="0.1" />

      <polyline
        points="100,320 170,280 240,290 310,230 380,260 441,200"
        stroke="var(--ink)"
        strokeOpacity="0.7"
        strokeWidth="1.5"
        fill="none"
      />

      <line x1="441" y1="80" x2="441" y2="370" stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4 4" />

      <polyline
        points="441,200 550,180 720,130"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        fill="none"
      />

      <text x="270" y="65" textAnchor="middle" className="font-mono" fontSize="11" fill="var(--ink)" fillOpacity="0.6" letterSpacing="2">
        ACTUAL
      </text>
      <text x="580" y="65" textAnchor="middle" className="font-mono" fontSize="11" fill="var(--accent)" letterSpacing="2">
        FORECAST
      </text>

      <text x="170" y="395" textAnchor="middle" className="font-mono" fontSize="11" fill="var(--ink)" fillOpacity="0.5">2024</text>
      <text x="380" y="395" textAnchor="middle" className="font-mono" fontSize="11" fill="var(--ink)" fillOpacity="0.5">2025</text>
      <text x="600" y="395" textAnchor="middle" className="font-mono" fontSize="11" fill="var(--ink)" fillOpacity="0.5">2026</text>
    </svg>
  );
}

function VisualVennCircles() {
  return (
    <svg viewBox="0 0 800 450" className="w-full h-full" fill="none">
      <circle cx="335" cy="195" r="80" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1.5" />
      <circle cx="465" cy="195" r="80" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1.5" />
      <circle cx="400" cy="300" r="80" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1.5" />

      <circle cx="400" cy="235" r="6" fill="var(--accent)" />

      <text x="240" y="115" textAnchor="middle" className="font-mono" fontSize="12" fill="var(--ink)" fillOpacity="0.7" letterSpacing="2">
        CNN
      </text>
      <text x="560" y="115" textAnchor="middle" className="font-mono" fontSize="12" fill="var(--ink)" fillOpacity="0.7" letterSpacing="2">
        VIT
      </text>
      <text x="400" y="410" textAnchor="middle" className="font-mono" fontSize="12" fill="var(--ink)" fillOpacity="0.7" letterSpacing="2">
        MLLM
      </text>

      <text x="780" y="440" textAnchor="end" className="font-mono" fontSize="10" fill="var(--ink)" fillOpacity="0.4" letterSpacing="1">
        MODEL EVOLUTION
      </text>
    </svg>
  );
}

function VisualQuoteLines() {
  const lines = [
    { x: 80, xEnd: 440, y: 80, accent: false, ring: false },
    { x: 80, xEnd: 560, y: 120, accent: true, ring: false },
    { x: 80, xEnd: 620, y: 160, accent: false, ring: true },
    { x: 80, xEnd: 460, y: 200, accent: false, ring: false },
    { x: 80, xEnd: 580, y: 240, accent: false, ring: false },
    { x: 80, xEnd: 400, y: 280, accent: true, ring: false },
    { x: 80, xEnd: 600, y: 320, accent: false, ring: false },
    { x: 80, xEnd: 480, y: 360, accent: false, ring: false },
  ];
  return (
    <svg viewBox="0 0 800 450" className="w-full h-full" fill="none">
      {lines.map((l, i) => (
        <g key={i}>
          <line
            x1="70"
            y1={l.y - 6}
            x2="70"
            y2={l.y + 6}
            stroke={l.accent ? "var(--accent)" : "var(--ink)"}
            strokeOpacity={l.accent ? undefined : 0.4}
            strokeWidth="1.5"
          />
          <line
            x1={l.x}
            y1={l.y}
            x2={l.xEnd}
            y2={l.y}
            stroke="var(--ink)"
            strokeOpacity="0.5"
            strokeWidth="2"
          />
          {l.ring && (
            <circle
              cx={l.xEnd + 20}
              cy={l.y}
              r="4"
              stroke="var(--accent)"
              strokeWidth="1.5"
              fill="none"
            />
          )}
        </g>
      ))}
      <text x="780" y="430" textAnchor="end" className="font-mono" fontSize="10" fill="var(--ink)" fillOpacity="0.4" letterSpacing="1">
        n = 52,400 COMMENTS
      </text>
    </svg>
  );
}

const creatorEconomyDisclaimer = (
  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--mute)]/60 italic mt-3 leading-relaxed">
    Independent project · public Bilibili / Douyin API data · inspired by but
    unrelated to prior client work
  </p>
);

const projects = [
  {
    id: "joanduan-dev",
    slug: "joanduan-dev",
    anchor: "project-joanduan-dev",
    category: "ENGINEERING / FRONTEND",
    title: "joanduan.dev",
    description:
      "A self-built portfolio in a week — brand identity, code, copy, and ship. The site you are reading is the project.",
    tags: ["Next.js 16", "Tailwind v4", "TypeScript", "Vercel"],
    status: "live" as const,
    year: "2026.05",
    liveUrl: "/projects/joanduan-dev",
    codeUrl: "https://github.com/Haichennn/joanduan-portfolio",
    visual: <VisualSiteMap />,
  },
  {
    id: "wayback",
    slug: "wayback",
    anchor: "project-wayback",
    category: "ENGINEERING / FRONTEND",
    title: "WayBack",
    description:
      "A context-aware re-finding web app for tourists — surfacing places you saved at the moment they become relevant. Sole frontend on a 2-person team. Built four paper-faithful features that translate a 2017 academic recommendation framework into UI signals users can actually read.",
    tags: ["React 19", "Vite", "Tailwind", "Leaflet", "TypeScript"],
    status: "live" as const,
    year: "2026.04 – 2026.06",
    liveUrl: "/projects/wayback",
    secondaryUrl: "https://wayback-beige.vercel.app/",
    visual: <VisualMapPin />,
  },
  {
    id: "creator-economy-analytics",
    slug: "creator-economy-analytics",
    anchor: "project-creator-economy-analytics",
    category: "DATA / ANALYTICS",
    title: "Creator Economy Analytics",
    description:
      "A 4-view Tableau dashboard turning 540K+ creator-economy transactions into audience-readable insight on growth, retention, and revenue mix.",
    tags: ["Tableau", "Python", "Pandas", "SQL"],
    status: "in-progress" as const,
    year: "2026.05",
    visual: <VisualBarsAxis />,
    disclaimer: creatorEconomyDisclaimer,
  },
  {
    id: "ai-sales-cli",
    slug: "ai-sales-workflow-cli",
    anchor: "project-ai-sales-cli",
    category: "AI / AUTOMATION",
    title: "AI Sales Workflow CLI",
    description:
      "A Python CLI agent that parses unstructured sales chat logs into schema-compliant Salesforce payloads in under five seconds.",
    tags: ["Python", "Claude API", "Salesforce API", "SQLite"],
    status: "roadmap" as const,
    year: "2026.06",
    visual: <VisualTerminal />,
  },
  {
    id: "industrial-forecasting",
    slug: "industrial-sales-forecasting",
    anchor: "project-industrial-forecasting",
    category: "DATA / FORECASTING",
    title: "Industrial Sales Forecasting",
    description:
      "A hybrid SARIMAX/ETS modeling system to identify growth potential and customer lifecycle patterns across B2B industrial sales accounts.",
    tags: ["Python", "Pandas", "Statsmodels", "Scikit-Learn"],
    status: "roadmap" as const,
    year: "2026.06",
    visual: <VisualTimeSeries />,
  },
  {
    id: "ai-vision-evolution",
    slug: "ai-vision-evolution",
    anchor: "project-ai-vision-evolution",
    category: "AI / RESEARCH",
    title: "AI Vision Evolution",
    description:
      "A side-by-side comparison of how vision models read the same image — from early CNNs through Vision Transformers to multimodal LLMs. A study in how machines have learned to see.",
    tags: ["PyTorch", "Grad-CAM", "Claude Vision"],
    status: "roadmap" as const,
    year: "2026.06",
    visual: <VisualVennCircles />,
  },
  {
    id: "nlp-creator-comments",
    slug: "nlp-creator-comments",
    anchor: "project-nlp-creator-comments",
    category: "AI / NLP",
    title: "NLP on Creator Comments",
    description:
      "Sentiment and theme extraction across tens of thousands of audience comments. Listening at a scale no creator can do by hand.",
    tags: ["Python", "LLM", "spaCy"],
    status: "roadmap" as const,
    year: "2026.07",
    visual: <VisualQuoteLines />,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-24 md:mb-32">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--mute)] mb-6 md:mb-8">
            <span aria-hidden="true">– </span>PROJECTS<span aria-hidden="true"> –</span>
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-[var(--ink)] leading-[1.05] tracking-tight mb-6">
            What I&apos;m working on.
          </h2>
          <p className="font-sans text-base text-[var(--mute)] leading-relaxed max-w-xl">
            Seven projects. Two live, one in progress, four on the roadmap.
          </p>
        </header>

        <div>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} {...p} isFirst={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
