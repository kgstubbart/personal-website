import type { ReactNode } from "react";
import CosmicBackground from "./CosmicBackground";
import styles from "./CosmicZone.module.css";

export default function CosmicZone({ children }: { children: ReactNode }) {
  return (
    <div className={styles.zone}>
      <CosmicBackground />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
