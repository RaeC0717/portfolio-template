"use client";

import AnimateInView from "./AnimateInView";

const roles = [
  {
    org: "Allada Lab | Michigan Neuroscience Institute",
    location: "Ann Arbor, MI",
    title: "Data Scientist",
    period: "Jul. 2025 – Present",
    bullets: [
      "Led end-to-end RNA-seq analysis workflows in Python and R for 8 sleep studies (10K–20K features per sample).",
      "Benchmarked 3 differential expression pipelines (Sleuth, edgeR, meta-analysis), documenting 18% variance in gene-level significance.",
      "Standardized multi-study preprocessing and normalization, reducing downstream reprocessing time by ~30%.",
      "Drove large-scale meta-analysis identifying 182 reproducible gene-level signals.",
    ],
  },
  {
    org: "University of Michigan College of Engineering",
    location: "Ann Arbor, MI",
    title: "Data Engineering Intern",
    period: "Jun. 2024 – Aug. 2024",
    bullets: [
      "Structured 1,200+ facility images in Amazon S3, reducing retrieval time by ~40%.",
      "Automated CSV/JSON-to-image linking in Python, saving 10+ hours/week.",
      "Performed large-scale image quality screening; removed 15%+ unusable files.",
      "Built visual comparison tools for facility change tracking, cutting review time by ~20%.",
    ],
  },
];

export default function Research() {
  return (
    <section id="research" className="section-padding border-t border-neutral-100 dark:border-neutral-800">
      <AnimateInView delay={0}>
        <h2 className="section-title">Research & Experience</h2>
      </AnimateInView>
      <div className="space-y-10">
        {roles.map((role, i) => (
          <AnimateInView key={role.org} delay={i * 0.1}>
            <article>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-2">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {role.org}
                </h3>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">{role.period}</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
                {role.title} · {role.location}
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-neutral-600 dark:text-neutral-400 text-sm">
                {role.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          </AnimateInView>
        ))}
      </div>
    </section>
  );
}
