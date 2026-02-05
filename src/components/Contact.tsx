"use client";

import { Mail, Github } from "lucide-react";
import AnimateInView from "./AnimateInView";

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
    />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const links = [
  {
    label: "Email",
    href: "mailto:raechen0717@gmail.com",
    value: "raechen0717@gmail.com",
    icon: <Mail size={16} />,
  },
  {
    label: "Phone",
    href: "tel:+16162276289",
    value: "(616) 227-6289",
    icon: <PhoneIcon />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/feiyang-chen",
    value: "LinkedIn",
    icon: <LinkedinIcon />,
  },
  {
    label: "GitHub",
    href: "https://github.com/RaeChen0717",
    value: "GitHub",
    icon: <Github size={16} />,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-padding border-t border-neutral-100 dark:border-neutral-800">
      <AnimateInView delay={0}>
        <h2 className="section-title">Contact</h2>
      </AnimateInView>
      <AnimateInView delay={0.08}>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-lg">
          I&apos;m based in Ann Arbor, MI. Feel free to reach out for collaboration,
          opportunities, or a quick chat.
        </p>
      </AnimateInView>
      <AnimateInView delay={0.14}>
        <div className="flex flex-wrap gap-4 sm:gap-6">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white font-medium underline underline-offset-2 transition-all duration-200 py-2 min-h-[44px] flex items-center gap-1.5 touch-manipulation hover:underline-offset-4"
            >
              {item.icon}
              <span>{item.value}</span>
            </a>
          ))}
        </div>
      </AnimateInView>
    </section>
  );
}
