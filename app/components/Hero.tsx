export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <header className="flex items-center justify-between px-6 md:px-10 py-8">
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-accent">
          [SYS.READY]
        </span>
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-mute">
          [VIBE_CODING_]
        </span>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <p className="font-mono text-[12px] tracking-[0.05em] uppercase text-mute">
          Hello, I&apos;m Haichen.
        </p>
        <h1 className="font-display font-light text-[96px] md:text-[200px] leading-[0.9] tracking-[-0.02em] text-ink mt-6">
          HAICHEN
        </h1>
        <p className="font-sans text-[18px] leading-[1.6] text-ink mt-8 max-w-xl">
          Building things that make sense to the people who actually use them.
          <br />
          Trying to think clearly when most things compete for attention.
          <br />
          Quietly obsessed with details most people skip.
        </p>
      </div>

      <footer className="flex items-center justify-center gap-10 md:gap-12 px-6 md:px-10 py-8">
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-accent">
          [BUILDER]
        </span>
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-accent">
          [CREATOR-LITERATE]
        </span>
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-accent">
          [AI-NATIVE]
        </span>
      </footer>
    </div>
  );
}
