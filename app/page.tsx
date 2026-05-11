import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <main className="bg-[var(--base)]">
      <section className="min-h-screen">
        <Hero />
      </section>
      <About />
      <Projects />
    </main>
  );
}
