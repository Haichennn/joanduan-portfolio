import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import DataLab from "./components/DataLab";
import InterviewMe from "./components/InterviewMe";
import SideNav from "./components/SideNav";
import { AudioProvider } from "./components/AmbientAudio";

export default function Home() {
  return (
    <AudioProvider>
      <main className="bg-[var(--base)] relative">
        <SideNav />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <DataLab />
        <InterviewMe />
      </main>
    </AudioProvider>
  );
}
