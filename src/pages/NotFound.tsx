import { Link } from "react-router-dom";
import Seo from "../components/shared/Seo";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="This page doesn't exist." />
      <div className={`container ${styles.wrap}`}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Lost in space</h1>
        <p className={styles.body}>
          The page you're looking for doesn't exist, or it's drifted somewhere else.
        </p>
        <Link to="/" className={styles.link}>
          ← Back to home
        </Link>
      </div>
    </>
  );
}
