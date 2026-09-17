import type { ReactNode } from "react";
import styles from "./Card.module.css";

type CardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  href?: string;
};

export default function Card({ children, className = "", interactive = false, href }: CardProps) {
  const classes = [styles.card, interactive || href ? styles.interactive : "", className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return <div className={classes}>{children}</div>;
}
