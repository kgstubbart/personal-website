import { education, profile, skills } from "../../data/resume";
import Reveal from "../shared/Reveal";
import styles from "./InfoCards.module.css";

const coreStack = [...skills.languages.slice(0, 3), "React", "AWS"];
const degree = education[0];

const CARDS = [
  {
    label: "Currently",
    value: profile.currentRole,
    sub: profile.currentOrg,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M9 19v-3.5a2.5 2.5 0 0 1 5 0V19M4 10.5 12 4l8 6.5M5.5 9.5V19a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5" />
      </svg>
    ),
  },
  {
    label: "Education",
    value: profile.education,
    sub: profile.minor,
    meta: `${degree.start} – ${degree.end}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5Z" />
        <path d="M7 10.7V16c0 1.1 2.24 2.5 5 2.5s5-1.4 5-2.5v-5.3M21 8.5V15" />
      </svg>
    ),
  },
  {
    label: "Based in",
    value: profile.location,
    sub: "Open to remote & relocation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Core stack",
    value: "Full-stack & tooling",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="m8 9-4 3 4 3M16 9l4 3-4 3M13.5 6.5l-3 11" />
      </svg>
    ),
    tags: coreStack,
  },
];

export default function InfoCards() {
  return (
    <div className={`container ${styles.section}`}>
      <div className={styles.grid}>
        {CARDS.map((card, index) => (
          <Reveal key={card.label} delay={index * 70} className={styles.card}>
            <div className={styles.iconWrap}>
              <span className={styles.icon}>{card.icon}</span>
            </div>
            <p className={styles.label}>{card.label}</p>
            <p className={styles.value}>{card.value}</p>
            {card.sub && <p className={styles.sub}>{card.sub}</p>}
            {card.meta && <p className={styles.meta}>{card.meta}</p>}
            {card.tags && (
              <div className={styles.tagRow}>
                {card.tags.map((tag) => (
                  <span key={tag} className={styles.miniTag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
