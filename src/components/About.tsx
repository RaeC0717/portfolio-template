"use client";

import AnimateInView from "./AnimateInView";

export default function About() {
  return (
    <section id="about" className="section-padding border-t border-neutral-100 dark:border-neutral-800">
      <AnimateInView delay={0}>
        <h2 className="section-title">About Me</h2>
      </AnimateInView>
      <AnimateInView delay={0.08}>
        <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <p>
            I achieved a Bachelor's degree in Data Science and Mathematics at the University of Michigan,
            and Mathematics, with University Honors. I focus on turning messy data
            into reliable, interpretable results—whether that&apos;s RNA-seq
            workflows, predictive models, or data engineering.
          </p>
          <p>
            My work spans end-to-end analysis design, benchmarking pipelines,
            meta-analysis, and building tools that make data easier to use. I care
            about reproducibility, clear documentation, and choosing the right
            method for the question.
          </p>
        </div>
      </AnimateInView>
    </section>
  );
}
