// Central source of truth for site content, drawn directly from Kason's resume.
// Update this file to change content anywhere on the site.

export const profile = {
  name: "Kason Stubbart",
  tagline: "Computer Science student & software builder",
  summary:
    "Computer Science student at Brigham Young University focused on building software that delivers practical results — from a full-stack library platform to research tooling that models how power and poverty move through networks. I care about full-stack development, software architecture, and building functional, user-focused systems.",
  location: "Provo, UT",
  email: "kgstubbart@gmail.com",
  linkedin: "https://www.linkedin.com/in/kason-stubbart-937015249",
  github: "https://github.com/kgstubbart",
  currentRole: "Computer Science Research Assistant",
  currentOrg: "Human-Centered Machine Intelligence Lab at BYU",
  education: "B.S. Computer Science, Brigham Young University",
  minor: "Minor in Astronomy",
} as const;

export const skills = {
  languages: ["Python", "Java", "C++", "C", "JavaScript", "TypeScript"],
  webDev: ["React", "Node.js", "REST APIs", "WebSocket", "HTML5", "CSS", "UI Design"],
  dataAndCloud: [
    "MySQL",
    "AWS EC2",
    "AWS Lambda",
    "AWS SQS",
    "AWS DynamoDB",
    "Cloud Deployment",
  ],
  tools: [
    "Visual Studio Code",
    "IntelliJ",
    "PyCharm",
    "Git",
    "GitHub",
    "GitBash",
    "PowerShell",
  ],
} as const;

export type ExperienceEntry = {
  id: string;
  title: string;
  org: string;
  location?: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "research-assistant",
    title: "Computer Science Research Assistant",
    org: "Human-Centered Machine Intelligence Lab at BYU",
    start: "Aug 2024",
    end: "Present",
    summary:
      "Advancing research on networks of power and poverty by designing and implementing a visualization pipeline that models resource and influence flows on complex networks, with the goal of informing interventions to reduce poverty.",
    highlights: [
      "Designed and validated a round-based token-exchange simulation and test suite, enabling reproducible experiments across 112 distinct network configurations to evaluate intervention strategies.",
      "Developed advanced visualization tools that enhanced experiment throughput by 55%, reducing analysis time from hours to minutes.",
      "Presented findings at a research conference attended by over 600 professionals.",
    ],
  },
  {
    id: "ida-lead",
    title: "Instructional Design Assistant Lead",
    org: "BYU Independent Study",
    start: "Apr 2024",
    end: "Aug 2024",
    summary:
      "Led creation of educational materials, guiding multiple teams in developing course content and learning activities — ensuring curriculum met goals, assisting with project management, and integrating technology to improve project efficiency.",
    highlights: [
      "Led and contributed to 3–4 projects at a time, writing, editing, and organizing over 100 pages of material.",
      "Implemented a new AI tool, resulting in a 39% increase in efficiency and cost savings, driving improved project delivery timelines.",
      "Provided leadership to 30 employees through open communication channels and training presentations.",
    ],
  },
  {
    id: "ida",
    title: "Instructional Design Assistant",
    org: "BYU Independent Study",
    start: "Feb 2023",
    end: "Apr 2024",
    summary:
      "Built and refined course content across popular Learning Management Systems, working directly in the HTML that powered the student experience.",
    highlights: [
      "Increased project cross-compatibility by 32% while completing several projects using popular Learning Management Systems.",
      "Wrote and edited HTML interfaces for several course facets, including videos, layout, and accessibility.",
      "Applied design styles to provide a focused UI for students to interact with in lesson activities.",
    ],
  },
];

export type ProjectEntry = {
  id: string;
  name: string;
  description: string;
  role?: string;
  tech: string[];
  dates?: string;
  link?: string;
  linkLabel?: string;
};

export const projects: ProjectEntry[] = [
  {
    id: "exoplanet-atmosphere-analyzer",
    name: "Exoplanet Atmosphere Analyzer",
    description:
      "A Python-based tool for analyzing exoplanet transmission spectra to characterize atmospheric composition — identifying common atmospheric gases and estimating planetary temperature directly from spectroscopic data.",
    tech: ["Python"],
  },
  {
    id: "networks-of-power-and-poverty",
    name: "Networks of Power and Poverty",
    description:
      "A simulation and visualization tool built at BYU's Human-Centered Machine Intelligence Lab to analyze how resources flow through social networks, supporting research on poverty and inequality. Implements token-exchange mechanics across multiple network topologies, with interactive visualizations and customizable parameters for exploring intervention strategies.",
    role: "Research Assistant — design, simulation, and visualization",
    tech: ["Python", "Algorithm Design", "Data Visualization"],
    dates: "Aug 2024 – Present",
  },
  {
    id: "library-ace",
    name: "Library Ace",
    description:
      "An AWS-hosted web application that lets users favorite books, contributing to a community-driven ranking of the most-loved titles. Visitors can browse book details and discover popular reads based on collective favorites, powered by the Google Books API.",
    tech: ["React", "JavaScript", "HTML", "CSS", "MySQL", "AWS", "Google Books API"],
  },
];

export type EducationEntry = {
  id: string;
  degree: string;
  org: string;
  start: string;
  end: string;
  note?: string;
};

export const education: EducationEntry[] = [
  {
    id: "byu-cs",
    degree: "Bachelor of Science in Computer Science",
    org: "Brigham Young University",
    start: "Aug 2022",
    end: "Apr 2027",
    note: "Minor in Astronomy",
  },
  {
    id: "high-school",
    degree: "High School Diploma",
    org: "Perry High School",
    start: "Jul 2016",
    end: "May 2020",
    note: "Magna Cum Laude",
  },
];

export type AwardEntry = {
  id: string;
  name: string;
  org: string;
  date: string;
};

export const awards: AwardEntry[] = [
  {
    id: "management-society-scholarship",
    name: "BYU Management Society Scholarship",
    org: "BYU Management Society",
    date: "Apr 2024",
  },
  {
    id: "national-honor-society",
    name: "National Honor Society",
    org: "National Honor Society",
    date: "Apr 2020",
  },
];

export type InterestEntry = {
  id: string;
  title: string;
  description: string;
};

export const interests: InterestEntry[] = [
  {
    id: "astronomy",
    title: "Astronomy",
    description:
      "Pursuing a minor in Astronomy alongside my CS degree, and an active member of BYU Astronomy — the pull of trying to understand what's out there shows up in my Exoplanet Atmosphere Analyzer project, too.",
  },
  {
    id: "rocketry",
    title: "Rocketry",
    description: "Member of BYU Rocketry, building and launching rockets outside the classroom.",
  },
  {
    id: "ukulele",
    title: "Ukulele Club",
    description: "President of BYU's Ukulele Club.",
  },
  {
    id: "service",
    title: "Service",
    description:
      "Volunteer with Feed My Starving Children, and served a two-year mission for The Church of Jesus Christ of Latter-day Saints in Orem, UT (2020–2022).",
  },
];
