import { profile } from "../../data/resume";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.note}>
          &copy; {year} {profile.name}. Built with React &amp; a lot of hot chocolate.
        </p>
        <ul className={styles.links}>
          <li>
            <a className={styles.link} href={`mailto:${profile.email}`}>
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              Email
            </a>
          </li>
          <li>
            <a
              className={styles.link}
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.9-1.3 2.74-1.02 2.74-1.02.56 1.38.2 2.41.1 2.66.65.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
              </svg>
              GitHub
            </a>
          </li>
          <li>
            <a
              className={styles.link}
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3a1.94 1.94 0 1 0 0 3.88 1.94 1.94 0 0 0 0-3.88ZM20.44 21h-3.37v-6.2c0-1.48-.03-3.38-2.06-3.38-2.07 0-2.38 1.62-2.38 3.28V21H9.26V8.5h3.24v1.71h.05c.45-.86 1.56-1.77 3.21-1.77 3.43 0 4.06 2.26 4.06 5.2V21Z" />
              </svg>
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
