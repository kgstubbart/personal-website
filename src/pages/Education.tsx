import Seo from "../components/shared/Seo";
import PageIntro from "../components/shared/PageIntro";
import SectionHeading from "../components/shared/SectionHeading";
import Card from "../components/shared/Card";
import Reveal from "../components/shared/Reveal";
import { awards, education } from "../data/resume";
import styles from "./Education.module.css";

export default function Education() {
  return (
    <>
      <Seo
        title="Education"
        description="Kason Stubbart's education: B.S. Computer Science with a minor in Astronomy at Brigham Young University."
      />

      <PageIntro
        eyebrow="Credentials"
        title="Academic Background"
        lede="A Computer Science degree with an Astronomy minor — pairing rigorous engineering fundamentals with a curiosity about what's beyond the code."
      />

      <section className={`container ${styles.section}`}>
        <div className={styles.grid}>
          {education.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 70}>
              <Card className={styles.card}>
                <span className={styles.badge} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5Z" />
                    <path d="M7 10.7V16c0 1.1 2.24 2.5 5 2.5s5-1.4 5-2.5v-5.3M21 8.5V15" />
                  </svg>
                </span>
                <div>
                  <h2 className={styles.degree}>{entry.degree}</h2>
                  <p className={styles.org}>{entry.org}</p>
                  <div className={styles.meta}>
                    <span className={styles.dates}>
                      {entry.start} – {entry.end}
                    </span>
                    {entry.note && <span className={styles.note}>{entry.note}</span>}
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`container ${styles.awardsSection}`}>
        <SectionHeading eyebrow="Recognition" title="Awards & scholarships" />
        <div className={styles.awardsGrid}>
          {awards.map((award, index) => (
            <Reveal key={award.id} delay={index * 70}>
              <Card className={styles.awardCard}>
                <span className={styles.awardIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="8.5" r="5.5" />
                    <path d="m8.2 13.2-1.4 7 5.2-3 5.2 3-1.4-7" />
                  </svg>
                </span>
                <div>
                  <p className={styles.awardName}>{award.name}</p>
                  <p className={styles.awardMeta}>
                    {award.org} · {award.date}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
