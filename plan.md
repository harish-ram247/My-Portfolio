# Portfolio plan: Harish Ram S

Status: plan only. No code is written yet. Items under "Needs your answer" block or shape the build.

## 1. What this is

A new personal portfolio for Harish Ram S, built as a cinematic, editorial, documentary-style experience (VOX as loose inspiration for visual storytelling, nothing copied). It replaces the current site at harishram-s.vercel.app.

Audience: recruiters and engineers hiring for backend, AI/ML and cloud internships and full-time roles.
What the visitor should leave with: who Harish is, what he has actually built, and a one-click way to contact him.

## 2. Sources audited

| Source | Result |
|---|---|
| Resume PDF (`Downloads\Harish Ram S-Resume.pdf`) | Read in full. Primary source of truth. |
| Old portfolio (harishram-s.vercel.app) | Read in full. Secondary source, has extra detail. |
| GitHub (harish-ram247) | 11 public repos read; READMEs of TRACE, Expense_Tracker (Pocketwise), AI-Fitness-Nutrition-Assistant and the profile repo read. |
| LinkedIn | Not readable: sign-in wall. Only the URL is used. |
| Portrait | Seen in chat (studio headshot, white background, dark blazer). Not yet saved as a file in the project. |
| `D:\New Portfolio` | Empty. There is no existing codebase to upgrade here. |

Rule: the resume wins where sources disagree. Nothing is invented. Anything unverified becomes a marked placeholder in one config file.

## 3. Verified content

**Identity**
- Harish Ram S. Pre-final year B.E. Computer Science and Engineering, Chennai Institute of Technology, Sep 2024 – Apr 2028, CGPA 8.04/10.
- Focus: backend development, REST APIs, databases, cloud, AI. Proficient in Java.

**Contact**
- Email: harishram2407@gmail.com
- Phone: +91 8072656700
- GitHub: github.com/harish-ram247
- LinkedIn: linkedin.com/in/harish-ram-s-3b304a340

**Experience**
- Backend Developer Intern, Chennai Institute of Technology Centre of Excellence, Nov 2025. Node.js monitoring with Prometheus, Grafana and prom-client on Kubernetes.
- Software Intern, Checkpoint ALS India Private Limited, May 2026. Database connectivity and ERP integration.

**Projects (resume)**
1. CyberShield: decentralized cybercrime reporting, anonymous and DID-based submissions, AI-assisted reporting, Polygon verification, IPFS evidence. React.js, Node.js, Express.js, MongoDB, Polygon, W3C DID, IPFS.
2. Industrial IoT Predictive Maintenance: ESP32 + MPU6050 monitoring, FedAvg distributed learning, blockchain-secured model updates, cloud dashboard. ESP32, Python, MPU6050, FedAvg, Blockchain, HTTP.
3. Urban Farm Management Application: CRUD REST APIs for crop and farm data. Node.js, Express.js, MongoDB.

**Projects (GitHub only, not on resume)**
- TRACE: temporal RAG backend with claim-level evidence checks (Python, FastAPI, PostgreSQL + pgvector). README says early development, not evaluated.
- Pocketwise (Expense_Tracker repo): offline Android expense tracker, Expo/React Native, TypeScript, SQLite, 57 tests.
- AI Fitness & Nutrition Assistant: FastAPI + PostgreSQL backend, phase 1 complete.

**Skills (resume grouping)**
- Languages: C++, Java, Python, JavaScript
- Frameworks: Node.js, Express.js, FastAPI
- Databases: MongoDB, MySQL, Redis
- Cloud & AI: AWS, Amazon Bedrock, SageMaker, Prompt Engineering, RAG
- DevOps & Tools: Docker, Prometheus, Grafana, Git, GitHub, Arduino IDE
- CS Fundamentals: DSA, DBMS, OS, Computer Networks, OOP

**Achievements**
- 2nd place, Hackwise National Hackathon, IEEE TEMS, IIM Indore (Jan 2026)
- LeetCode: 600+ solved, contest rating 1750+
- CodeChef: 350+ solved, 1-star, rating 1300+

**Certifications**
AWS Certified Cloud Practitioner (CLF-C02), AWS Certified AI Practitioner (AIF-C01), AI Fundamentals (IBM SkillsBuild), Introduction to Modern AI (Cisco), Introduction to IoT (Cisco), MongoDB Basics for Students, Claude 101 (Anthropic).

## 3a. Decisions made (16 Nov 2026)

These supersede items 1–3 and the defaults in section 4.

- **Repo:** fresh build in `D:\New Portfolio`, remote `github.com/harish-ram247/My-Portfolio` (the empty repo).
- **Commits:** Harish's configured git identity only, no AI attribution of any kind, commit and push only on his instruction.
- **Portrait:** `Professional photo  Harish Ram S.jpeg`, cut out from its white background for the opening.
- **Opening:** follows the supplied reference: giant outlined type behind, solid name below, portrait cutout over a yellow block, hand-drawn annotations, lights toggle.
- **Primary projects:** TRACE, CyberShield, Industrial IoT Predictive Maintenance.
- **Secondary projects:** Kubernetes monitoring with Prometheus and Grafana, Urban Farm Management System, Pocketwise.
- **Excluded:** AI Fitness & Nutrition Assistant, and any other project.
- **Working defaults until told otherwise:** resume-only facts (old-site extras in item 4 left out), phone number not shown on the page, resume PDF offered for download, design system built with Impeccable and ui-styling because UI UX Pro Max is not installed.

## 4. Needs your answer

1. **Portrait file.** The photo arrived in chat only. Please save it into `D:\New Portfolio` (any name). Its clean white background makes a cutout feasible.
2. **Codebase.** The folder is empty, so my default is a fresh build here. Say so if you want the old repo cloned and upgraded instead (and which one: `My-Portfolio` or `Portfolio`).
3. **Which projects get full case studies.** Default: CyberShield, Industrial IoT, TRACE, Pocketwise as case studies; Urban Farm and AI Fitness as short entries. TRACE and Pocketwise are not on your resume, so confirm.
4. **Items on the old site but not the resume.** Keep or drop each:
   - Code Synthesis Hackathon, top 100 of 3,900+ teams
   - UPS industry showcase of the IoT project
   - Other hackathons (Code Veda, Ranchi Hacks, HacktoLearn, HackChrono, Hack2Skill)
   - PR & Event Management, Hackerz symposium
   - Extra certifications (ServiceNow AI Foundations, CCNA, Cisco Cybersecurity, Cisco Data Science, MongoDB and AI Fundamentals, Claude Code 101)
   - IoT details: DHT11 sensor, MQTT, Flask/Streamlit dashboard
5. **Project visuals and links.** I found no screenshots, live demos or repos for CyberShield or the IoT project. Send any you have; otherwise those case studies use typographic and diagram-led visuals, with no fake screenshots. Pocketwise has screenshots in its repo.
6. **Phone number.** Show it publicly on the site, or email/LinkedIn/GitHub only?
7. **UI UX Pro Max.** That skill is not installed (only impeccable, ui-styling, find-skills). I can look for it and ask before installing, or build the design system with Impeccable and ui-styling.
8. **Resume download.** Should the site offer this PDF for download?

## 5. Design direction (to be finalised before code)

- **Mode:** Experience. The work and the person lead; the interface recedes.
- **Palette:** near-black ground, warm ivory text, controlled yellow and red accents, occasional blue. One ivory section (#EAE8E2) for the collaborate scene.
- **Type:** oversized expressive display with outlined variants, a readable text face, a monospace for captions and annotations. Exact families chosen in the design phase.
- **Texture and devices:** film grain, thin rules, editorial captions, numbered annotations, portrait cutout, layered compositions, deliberate empty space.
- **Banned:** pyramids, floating cubes, generic geometric blocks, identical card grids, heavy glassmorphism, effects with no story purpose.

## 6. Site structure

1. **Opening.** Dark grained canvas, large name typography, mono captions, portrait composition, sequenced GSAP reveal.
2. **Flashlight reveal.** Pointer-driven torch that unmasks a real hidden layer (headline fragments, portrait detail, annotations). Tap/drag on touch.
3. **About.** Background, interests, working approach, from the resume objective.
4. **Case studies.** Each project with its own layout: problem, approach, contribution, stack, verified links only.
5. **Experience.** Two internships as a timeline.
6. **Skills.** Six resume groups shown as a system, not badge clouds.
7. **Recognition.** Hackathon result, LeetCode and CodeChef figures, certifications.
8. **Let's collaborate.** Ivory section, glossy black pill button, hand-drawn SVG hand pulling it by strings, opening into a contact overlay.
9. **Footer.** Links, resume download if approved.

## 7. Technical plan

- **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS, deployed on Vercel.
- **Motion:** GSAP + ScrollTrigger (via `useGSAP`, scoped and cleaned up) for the opening timeline, scroll reveals, masks, parallax and string drawing. Framer Motion for buttons, hover/tap, navigation states and the contact overlay. The two never animate the same property on the same element.
- **Content:** one typed `content` file holding everything in section 3, so facts live in one place.
- **Flashlight:** reusable component, CSS mask with radial gradient, position via `requestAnimationFrame` and CSS custom properties (no React re-render per pointer event), configurable radius and feather, simplified on low-power devices, static fallback under reduced motion.
- **Accessibility:** semantic HTML, keyboard navigation, visible focus, focus trap and Escape on the overlay, contrast checked, `prefers-reduced-motion` respected throughout.
- **Performance:** optimised images, lazy-loaded below-the-fold media, no layout shift, no scroll hijacking.

## 8. Build order

1. Resolve section 4, scaffold the project, add portrait and resume.
2. Design direction: PRODUCT.md and DESIGN.md (tokens, type, colour, components).
3. Content file and page skeleton.
4. Flashlight component.
5. Opening and editorial sections.
6. Case studies.
7. Let's collaborate section and contact overlay.
8. Responsive, reduced-motion and keyboard passes.
9. Lint, type-check, build; fix errors and console warnings.
10. Rendered review and refinement with Impeccable; summary of files and any remaining config values.

## 9. Done means

- Every fact on the site traces to the resume, GitHub or an answer from you.
- Works on desktop, tablet and mobile, with keyboard only and with reduced motion.
- Build, lint and type-check pass with a clean console.
- All contact links open the right destination.
