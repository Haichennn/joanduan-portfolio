import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import InterviewMe from "./components/InterviewMe";
import SideNav from "./components/SideNav";

export default function Home() {
  return (
    <main className="bg-[var(--base)] relative">
      <SideNav />
      <section className="min-h-screen">
        <Hero />
      </section>
      <About />
      <Experience />
      <Projects />
      <InterviewMe />
    </main>
  );
}
