import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import DataLab from "./components/DataLab";
import InterviewMe from "./components/InterviewMe";
import SideNav from "./components/SideNav";

export default function Home() {
  return (
    <main className="bg-[var(--base)] relative">
      <SideNav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <DataLab />
      <InterviewMe />
    </main>
  );
}
