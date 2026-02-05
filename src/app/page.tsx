"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import IntroGate from "@/components/IntroGate";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <ThemeProvider>
      <IntroGate>
        <main className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-200">
          <Nav />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Research />
          <Contact />
          <footer className="border-t border-neutral-100 dark:border-neutral-800 py-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} Feiyang Chen
          </footer>
        </main>
      </IntroGate>
    </ThemeProvider>
  );
}
