"use client";

import AnimateInView from "./AnimateInView";

const programming = [
  "Python",
  "SQL",
  "R",
  "C++",
  "Java",
];

const tools = [
  "MongoDB",
  "Tableau",
  "Looker",
  "Matplotlib",
  "Machine Learning & AI",
  "API Development",
  "Statistical Analysis",
  "A/B Testing",
  "Bayesian Methods",
];

function SkillChip({ name, delay }: { name: string; delay: number }) {
  return (
    <span
      className="inline-block px-4 py-2 rounded-md border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm hover:border-neutral-300 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:scale-105 active:scale-100 transition-all duration-200"
      style={{
        animation: "fadeInUp 0.5s ease-out forwards",
        animationDelay: `${delay}s`,
        opacity: 0,
      }}
    >
      {name}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding border-t border-neutral-100 dark:border-neutral-800">
      <AnimateInView delay={0}>
        <h2 className="section-title">Skills</h2>
      </AnimateInView>
      <div className="space-y-8">
        <AnimateInView delay={0.06}>
          <div>
            <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
              Programming & Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {programming.map((s, i) => (
                <SkillChip key={s} name={s} delay={i * 0.05} />
              ))}
            </div>
          </div>
        </AnimateInView>
        <AnimateInView delay={0.12}>
          <div>
            <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
              Tools & Methods
            </h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((s, i) => (
                <SkillChip key={s} name={s} delay={programming.length * 0.05 + i * 0.05} />
              ))}
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
