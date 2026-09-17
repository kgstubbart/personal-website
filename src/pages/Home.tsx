import { Link } from "react-router-dom";
import Seo from "../components/shared/Seo";
import CosmicZone from "../components/home/CosmicZone";
import Hero from "../components/home/Hero";
import InfoCards from "../components/home/InfoCards";
import SectionHeading from "../components/shared/SectionHeading";
import Card from "../components/shared/Card";
import Tag from "../components/shared/Tag";
import Reveal from "../components/shared/Reveal";
import { education, experience, interests, profile, projects } from "../data/resume";
import styles from "./Home.module.css";

const featuredProjects = projects.slice(0, 3);
const recentExperience = experience.slice(0, 3);

export default function Home() {
  return (
    <>
      <Seo
        title={profile.name}
        description={profile.summary}
      />

      <CosmicZone>
        <Hero />
        <InfoCards />
      </CosmicZone>

      <section className={styles.section} aria-labelledby="featured-projects-heading">
        <div className="container">
          <SectionHeading
            id="featured-projects-heading"
            eyebrow="Selected work"
            title="Featured projects"
            linkTo="/projects"
            linkLabel="View all projects"
          />
          <div className={styles.projectGrid}>
            {featuredProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 80}>
                <Card interactive className={styles.projectCard} href={project.link}>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <p className={styles.projectDesc}>{project.description}</p>
                  {project.tech.length > 0 && (
                    <div className={styles.tagRow}>
                      {project.tech.slice(0, 3).map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </div>
                  )}
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="experience-heading">
        <div className="container">
          <SectionHeading
            id="experience-heading"
            eyebrow="Career"
            title="Where I've worked"
            linkTo="/experience"
            linkLabel="Full experience"
          />
          <Reveal>
            <Card className={styles.timelinePreview}>
              {recentExperience.map((role) => (
                <div className={styles.timelineRow} key={role.id}>
                  <p className={styles.timelineDates}>
                    {role.start} – {role.end}
                  </p>
                  <div>
                    <p className={styles.timelineTitle}>{role.title}</p>
                    <p className={styles.timelineOrg}>{role.org}</p>
                  </div>
                </div>
              ))}
            </Card>
          </Reveal>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="education-interests-heading">
        <div className="container">
          <SectionHeading
            id="education-interests-heading"
            eyebrow="More about me"
            title="Education & interests"
          />
          <div className={styles.splitGrid}>
            <Reveal>
              <Card className={styles.splitCard}>
                <h3 className={styles.splitTitle}>Education</h3>
                <p className={styles.splitBody}>
                  {education[0].degree}, {education[0].org} · {education[0].note}
                </p>
                <Link to="/education" className={styles.splitLink}>
                  See education & honors →
                </Link>
              </Card>
            </Reveal>
            <Reveal delay={80}>
              <Card className={styles.splitCard}>
                <h3 className={styles.splitTitle}>Interests</h3>
                <p className={styles.splitBody}>
                  {interests.map((i) => i.title).join(" · ")}
                </p>
                <Link to="/interests" className={styles.splitLink}>
                  Get to know me →
                </Link>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
