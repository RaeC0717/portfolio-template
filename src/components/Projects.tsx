"use client";

import AnimateInView from "./AnimateInView";

const projects = [
  {
    title: "Predictive Analytics for Diabetes Progression",
    description:
      "Modeled disease progression using 500+ patient records and 10+ clinical variables, comparing LASSO, Ridge, and stepwise regression. Boosted prediction accuracy by 17% via feature engineering and model tuning, with ANOVA for interpretability and 10-fold cross-validation for generalizability.",
    tech: ["R", "Regression", "ANOVA", "Cross-validation"],
    link: "https://github.com/RaeChen0717/Diabetes_Progression",
  },
  {
    title: "Natural Language Text Coherence Analysis",
    description:
      "Processed 2,000+ machine-generated text sequences to identify semantic coherence and logical discontinuities. Improved coherence scoring by 15% using bigram, trigram, and transformer-based models, supporting GPT-based text generation refinement.",
    tech: ["Python", "NLP", "Transformers"],
    link: "https://github.com/RaeC0717/Python-NLP_Language_Analysis",
  },
  {
    title: "Database Query Processing with JDBC",
    description:
      "Implemented 10+ SQL queries and 5+ stored procedures in a Java application for relational data retrieval. Optimized with B+ tree indexing, multi-way joins, and subqueries—achieving ~20% faster execution and 2x data retrieval speed.",
    tech: ["Java", "SQL", "JDBC"],
    link: "https://github.com/RaeC0717/JDBC-DatabaseQueryProcessing",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-padding border-t border-neutral-100 dark:border-neutral-800">
      <AnimateInView delay={0}>
        <h2 className="section-title">Projects</h2>
      </AnimateInView>
      <div className="space-y-10">
        {projects.map((project, i) => (
          <AnimateInView key={project.title} delay={i * 0.1}>
            <article className="group">
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-6 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 bg-white dark:bg-neutral-800/50">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white underline underline-offset-2 transition-colors duration-200"
                >
                  View on GitHub →
                </a>
              </div>
            </article>
          </AnimateInView>
        ))}
      </div>
    </section>
  );
}
