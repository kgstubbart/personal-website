import { Link } from "react-router-dom";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  linkTo?: string;
  linkLabel?: string;
  id?: string;
};

export default function SectionHeading({ eyebrow, title, linkTo, linkLabel, id }: SectionHeadingProps) {
  return (
    <div className={styles.row}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title} id={id}>
          {title}
        </h2>
      </div>
      {linkTo && linkLabel && (
        <Link to={linkTo} className={styles.link}>
          {linkLabel}
          <svg
            className={styles.arrow}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      )}
    </div>
  );
}
