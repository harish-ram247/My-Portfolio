// Single source of truth for everything the site says about Harish.
// Facts come from the resume (primary) and public GitHub READMEs.
// Do not add claims here that are not backed by one of those.

export const person = {
  name: "Harish Ram S",
  first: "Harish",
  rest: "Ram S",
  role: "Backend developer",
  line: "Pre-final year computer science student building backend systems, REST APIs and cloud infrastructure.",
  location: "Chennai, India",
  objective:
    "Pre-final year CSE student with experience in backend development, REST APIs, databases, and cloud technologies. Proficient in Java with exposure to Docker, AWS, and distributed systems. Demonstrated problem-solving skills through competitive programming and national-level hackathon recognition.",
  education: {
    degree: "B.E. Computer Science and Engineering",
    school: "Chennai Institute of Technology",
    period: "Sep 2024 – Apr 2028",
    cgpa: "8.04",
  },
} as const;

export const contact = {
  email: "harishram2407@gmail.com",
  github: { label: "harish-ram247", href: "https://github.com/harish-ram247" },
  linkedin: {
    label: "Harish Ram S",
    href: "https://www.linkedin.com/in/harish-ram-s-3b304a340",
  },
  resume: { href: "/Harish-Ram-S-Resume.pdf", file: "Harish-Ram-S-Resume.pdf" },
  // Set to a string such as "+91 …" to show a phone row in the contact overlay.
  phone: null as string | null,
} as const;

export type Accent = "yellow" | "red" | "blue";

export type CaseStudy = {
  id: "trace" | "cybershield" | "iiot";
  title: string;
  kind: string;
  summary: string;
  problem: string;
  solution: string;
  built: string[];
  stack: string[];
  status?: string;
  repo?: { label: string; href: string };
  accent: Accent;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "trace",
    title: "TRACE",
    kind: "Temporal Retrieval with Attributed Claim Evidence",
    summary: "A RAG backend that knows when each passage was true.",
    problem:
      "Documentation changes. A plain retrieval system answers from whatever text matches best, even when that text was written after the date the question is about.",
    solution:
      "TRACE versions every documentation section with a validity interval, retrieves only what was valid on the date asked, and checks that each claim in the answer is supported by a cited source.",
    built: [
      "Ingestion that walks a repository's history and versions each markdown section with a validity interval",
      "An /ask endpoint returning the resolved date, an answer with [S1]-style citations and each source's validity interval",
      "A plain-RAG baseline variant and a side-by-side demo with a date slider",
    ],
    stack: ["Python", "PostgreSQL", "pgvector", "Alembic", "Docker", "Streamlit"],
    status: "In early development. Not yet evaluated.",
    repo: { label: "harish-ram247/TRACE", href: "https://github.com/harish-ram247/TRACE" },
    accent: "yellow",
  },
  {
    id: "cybershield",
    title: "CyberShield",
    kind: "Decentralized cybercrime reporting platform",
    summary: "Report a cybercrime without giving up your identity, and prove the complaint was never altered.",
    problem:
      "Reporting a cybercrime means exposing yourself, and a complaint held in an ordinary database gives no proof that it has not been changed.",
    solution:
      "Complaints are filed anonymously or under a decentralized identifier, structured with AI assistance, verified on Polygon, and their evidence is stored on IPFS.",
    built: [
      "Anonymous and DID-based complaint submission",
      "AI-assisted reporting",
      "Polygon-based complaint verification",
      "IPFS evidence storage",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Polygon", "W3C DID", "IPFS"],
    accent: "red",
  },
  {
    id: "iiot",
    title: "Industrial IoT Predictive Maintenance",
    kind: "ESP32 equipment monitoring with federated learning",
    summary: "Machines that learn from each other's readings without sharing them.",
    problem:
      "Equipment condition has to be monitored at the machine, and the models that learn from it should improve across machines without pooling every raw reading in one place.",
    solution:
      "ESP32 nodes read MPU6050 sensors, models are combined with FedAvg distributed learning, model updates are secured on a blockchain, and results reach a cloud dashboard.",
    built: [
      "ESP32-based monitoring with MPU6050 sensors",
      "FedAvg-based distributed learning",
      "Blockchain-secured model updates",
      "Cloud dashboard integration",
    ],
    stack: ["ESP32", "Python", "MPU6050", "FedAvg", "Blockchain", "HTTP"],
    accent: "blue",
  },
];

export type SideProject = {
  id: string;
  title: string;
  kind: string;
  body: string;
  stack: string[];
  repo?: { label: string; href: string };
};

export const sideProjects: SideProject[] = [
  {
    id: "k8s",
    title: "Kubernetes monitoring",
    kind: "Built at Chennai Institute of Technology, Centre of Excellence",
    body: "A Node.js monitoring solution using Prometheus, Grafana and prom-client to track application performance and visualize system health on Kubernetes infrastructure.",
    stack: ["Node.js", "prom-client", "Prometheus", "Grafana", "Kubernetes"],
  },
  {
    id: "urban-farm",
    title: "Urban Farm Management System",
    kind: "Web application",
    body: "A web-based management system with RESTful APIs implementing create, read, update and delete operations for crop and farm data, backed by MongoDB.",
    stack: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
    repo: { label: "harish-ram247/Urban-farm", href: "https://github.com/harish-ram247/Urban-farm" },
  },
  {
    id: "pocketwise",
    title: "Pocketwise",
    kind: "Android app",
    body: "A personal finance and expense tracker for Android. Everything is stored on the phone in SQLite: no account, no server, no network use. Accounts, transactions, budgets and insights.",
    stack: ["Expo", "React Native", "TypeScript", "SQLite"],
    repo: {
      label: "harish-ram247/Expense_Tracker",
      href: "https://github.com/harish-ram247/Expense_Tracker",
    },
  },
];

// `points` restate the resume sentence clause by clause; nothing is added.
export const experience = [
  {
    org: "Checkpoint ALS India Private Limited",
    role: "Software Intern",
    year: "2026",
    month: "May",
    label: "Latest internship",
    points: [
      "Worked on database connectivity and ERP integration.",
      "Supported application-level data access.",
      "Handled connection management and retrieval.",
    ],
    tags: ["Database connectivity", "ERP integration"],
  },
  {
    org: "Chennai Institute of Technology, Centre of Excellence",
    role: "Backend Developer Intern",
    year: "2025",
    month: "Nov",
    label: "Internship",
    points: [
      "Developed a Node.js monitoring solution.",
      "Used Prometheus, Grafana and prom-client to track application performance.",
      "Visualized system health on Kubernetes infrastructure.",
    ],
    tags: ["Node.js", "prom-client", "Prometheus", "Grafana", "Kubernetes"],
  },
] as const;

export const skills = [
  { group: "Languages", items: ["C++", "Java", "Python", "JavaScript"] },
  { group: "Frameworks", items: ["Node.js", "Express.js", "FastAPI"] },
  { group: "Databases", items: ["MongoDB", "MySQL", "Redis"] },
  {
    group: "Cloud & AI",
    items: ["AWS", "Amazon Bedrock", "SageMaker", "Prompt Engineering", "RAG"],
  },
  {
    group: "DevOps & Tools",
    items: ["Docker", "Prometheus", "Grafana", "Git", "GitHub", "Arduino IDE"],
  },
  { group: "CS Fundamentals", items: ["DSA", "DBMS", "OS", "Computer Networks", "OOP"] },
] as const;

export const record = [
  {
    figure: "2nd",
    unit: "place",
    title: "Hackwise National Hackathon",
    detail: "IEEE TEMS, IIM Indore. January 2026.",
    // Prize won, confirmed by Harish (17 Nov 2026).
    prize: "₹10,000",
  },
  {
    figure: "600+",
    unit: "problems",
    title: "LeetCode",
    detail: "Contest rating 1750+.",
  },
  {
    figure: "350+",
    unit: "problems",
    title: "CodeChef",
    detail: "1-star, rating 1300+.",
  },
] as const;

export const certifications = [
  { name: "AWS Certified Cloud Practitioner (CLF-C02)", by: "AWS" },
  { name: "AWS Certified AI Practitioner (AIF-C01)", by: "AWS" },
  { name: "Artificial Intelligence Fundamentals", by: "IBM SkillsBuild" },
  { name: "Introduction to Modern AI", by: "Cisco" },
  { name: "Introduction to IoT", by: "Cisco" },
  { name: "MongoDB Basics for Students", by: "MongoDB" },
  { name: "Claude 101", by: "Anthropic" },
] as const;

export const nav = [
  { href: "#top", label: "Home" },
  { href: "#subject", label: "About" },
  { href: "#case-files", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#evidence", label: "Certificates" },
  { href: "#collaborate", label: "Contact" },
] as const;
