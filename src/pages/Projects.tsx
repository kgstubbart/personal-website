import Seo from "../components/shared/Seo";
import PageIntro from "../components/shared/PageIntro";
import Card from "../components/shared/Card";
import Tag from "../components/shared/Tag";
import Reveal from "../components/shared/Reveal";
import { profile, projects } from "../data/resume";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <>
      <Seo
        title="Projects"
        description="Projects by Kason Stubbart, including an exoplanet atmosphere analyzer, Library Ace, and research tooling for modeling networks of power and poverty."
      />

      <PageIntro
        eyebrow="Selected work"
        title="Featured Builds"
        lede="A mix of research tooling, full-stack applications, and side projects — spanning simulation, web development, and data analysis."
      />

      <section className={`container ${styles.section}`}>
        <div className={styles.list}>
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 60}>
              <Card className={styles.card} href={project.link}>
                <div className={styles.header}>
                  <h2 className={styles.name}>{project.name}</h2>
                  <div className={styles.headerMeta}>
                    {project.dates && <span className={styles.dates}>{project.dates}</span>}
                    {project.link && (
                      <span className={styles.link}>
                        {project.linkLabel ?? "View on GitHub"}
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M7 17 17 7M7 7h10v10" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
                <p className={styles.description}>{project.description}</p>
                {project.role && <p className={styles.role}>{project.role}</p>}
                {project.tech.length > 0 && (
                  <div className={styles.tagRow}>
                    {project.tech.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                )}
              </Card>
            </Reveal>
          ))}
        </div>

        <p className={styles.footerNote}>
          More on the way — take a look at{" "}
          <a href={profile.github} target="_blank" rel="noreferrer">
            my GitHub
          </a>{" "}
          for code and in-progress work.
        </p>
      </section>
    </>
  );
}
