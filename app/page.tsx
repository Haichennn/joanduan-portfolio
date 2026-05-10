import Hero from "./components/Hero";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <main className="bg-[var(--base)]">
      <section className="min-h-screen">
        <Hero />
      </section>
      <Projects />
    </main>
  );
}
