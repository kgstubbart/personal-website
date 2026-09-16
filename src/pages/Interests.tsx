import type { ReactNode } from "react";
import Seo from "../components/shared/Seo";
import PageIntro from "../components/shared/PageIntro";
import Card from "../components/shared/Card";
import Reveal from "../components/shared/Reveal";
import { interests } from "../data/resume";
import styles from "./Interests.module.css";

const ICONS: Record<string, ReactNode> = {
  astronomy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M6 6l1.5 1.5M16.5 16.5 18 18M18 6l-1.5 1.5M7.5 16.5 6 18" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  rocketry: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5c2.6 1.9 4 5 4 8.3 0 2-.5 3.7-1.2 5L12 18l-2.8-2.2C8.5 14.5 8 12.8 8 10.8c0-3.3 1.4-6.4 4-8.3Z" />
      <circle cx="12" cy="9.5" r="1.6" />
      <path d="M8.3 13.5 5 15l1-3.8M15.7 13.5 19 15l-1-3.8M10.3 17.5 9 21.5l3-2 3 2-1.3-4" />
    </svg>
  ),
  ukulele: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3v6.2M9 3l3 2M9 9.2c-3 0-5 2-5 4.9 0 3 2.2 6.9 5 6.9s5-3.9 5-6.9c0-1.6-.6-2.9-1.6-3.7" />
      <circle cx="9" cy="14.5" r="1.5" />
      <path d="M6.5 6.5h5" />
    </svg>
  ),
  service: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 20.5s-7.5-4.6-9.3-9.6C1.6 7.4 3.7 4.5 6.8 4.5c1.9 0 3.5 1.1 4.2 2.6.7-1.5 2.3-2.6 4.2-2.6 3.1 0 5.2 2.9 4.1 6.4-1.8 5-9.3 9.6-9.3 9.6Z" />
    </svg>
  ),
};

export default function Interests() {
  return (
    <>
      <Seo
        title="Interests"
        description="Beyond the resume: astronomy, rocketry, ukulele, and service — a look at Kason Stubbart outside of work."
      />

      <PageIntro
        eyebrow="Off the clock"
        title="A bit more about me"
        lede="Software is a big part of what I do, but not all of it. Here's what fills the rest of my time."
      />

      <section className={`container ${styles.section}`}>
        <div className={styles.grid}>
          {interests.map((interest, index) => (
            <Reveal key={interest.id} delay={index * 70}>
              <Card className={styles.card}>
                <span className={styles.iconWrap} aria-hidden="true">
                  {ICONS[interest.id]}
                </span>
                <h2 className={styles.title}>{interest.title}</h2>
                <p className={styles.desc}>{interest.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
