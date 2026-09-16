import type { ReactNode } from "react";
import Reveal from "./Reveal";
import styles from "./PageIntro.module.css";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
};

export default function PageIntro({ eyebrow, title, lede }: PageIntroProps) {
  return (
    <div className={`container ${styles.wrap}`}>
      <Reveal>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        {lede && <p className={styles.lede}>{lede}</p>}
      </Reveal>
    </div>
  );
}
