import type { ReactNode } from "react";
import styles from "./Card.module.css";

type CardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

export default function Card({ children, className = "", interactive = false }: CardProps) {
  const classes = [styles.card, interactive ? styles.interactive : "", className]
    .filter(Boolean)
    .join(" ");
  return <div className={classes}>{children}</div>;
}
