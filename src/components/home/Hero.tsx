import { Link } from "react-router-dom";
import { profile } from "../../data/resume";
import Reveal from "../shared/Reveal";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={`container ${styles.hero}`}>
      <div className={styles.textPanel}>
        <Reveal>
          <span className={styles.kicker}>
            <span className={styles.dot} aria-hidden="true" />
            Open to software engineering opportunities
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className={styles.name}>{profile.name}</h1>
        </Reveal>
        <Reveal delay={160} as="div">
          <p className={styles.tagline}>{profile.summary}</p>
        </Reveal>
        <Reveal delay={240}>
          <div className={styles.actions}>
            <Link to="/projects" className={styles.primaryBtn}>
              View my projects
            </Link>
            <a className={styles.secondaryBtn} href={`mailto:${profile.email}`}>
              Get in touch
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
