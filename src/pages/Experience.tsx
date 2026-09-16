import Seo from "../components/shared/Seo";
import PageIntro from "../components/shared/PageIntro";
import Card from "../components/shared/Card";
import Reveal from "../components/shared/Reveal";
import { experience } from "../data/resume";
import styles from "./Experience.module.css";

export default function Experience() {
  return (
    <>
      <Seo
        title="Experience"
        description="Kason Stubbart's professional experience, including research assistant work at BYU's Human-Centered Machine Intelligence Lab and instructional design roles at BYU Independent Study."
      />

      <PageIntro
        eyebrow="Career"
        title="Where I've worked"
        lede="From research tooling to instructional design leadership — a look at the roles that have shaped how I build and lead."
      />

      <section className={`container ${styles.section}`}>
        <div className={styles.timeline}>
          {experience.map((role, index) => (
            <Reveal key={role.id} delay={index * 70} className={styles.item}>
              <span className={styles.dot} aria-hidden="true" />
              <Card>
                <p className={styles.dates}>
                  {role.start} – {role.end}
                </p>
                <div className={styles.headRow}>
                  <h2 className={styles.title}>{role.title}</h2>
                  <span className={styles.org}>· {role.org}</span>
                </div>
                <p className={styles.summary}>{role.summary}</p>
                <ul className={styles.highlights}>
                  {role.highlights.map((point) => (
                    <li key={point} className={styles.highlight}>
                      {point}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
