// ─── Site-wide content config ─────────────────────────────────────────────────
// Edit this file to update all copy and data without touching components.

export const site = {
  name: "Marco Schoeman",
  role: "Web Developer · Red Team Operator",
  location: "South Africa",
  email: "marcoschoeman1988@gmail.com",
  github: "https://github.com/Marco-Schoeman-Dev",
  linkedin: "https://www.linkedin.com/in/marco-schoeman-24421414a/",
};

export const hero = {
  headline: "Marco Schoeman",
  taglineDev: "Web Developer",
  taglineSec: "Red Team Operator",
  intro:
    "Clean code and a real attacker's perspective. Building secure, well-engineered software, and testing its limits.",
  ctaPrimary: { label: "View Projects", href: "#projects" },
  ctaSecondary: { label: "Get In Touch", href: "#contact" },
  // Swap path once you have a photo — update here only
  portrait: "/images/Profile.jpeg",
  portraitAlt: "Marco Schoeman",
};

export const about = {
  paragraphs: [
    "I build fullstack web applications and break into systems for a living, sometimes both on the same day. My background spans React, TypeScript, Node.js, and API automation, combined with hands-on offensive security: web app pentesting, Active Directory attacks, and red team operations.",
    "Moving from development into offensive security changed how I write code. I don't just think about what a feature should do; I think about how an attacker would abuse it. That shift makes the software I ship more resilient, not just functional.",
    "Based in South Africa, available for remote work and consulting worldwide.",
  ],
};

export const skills = {
  development: [
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "Tailwind CSS",
    "REST APIs",
    "PostgreSQL",
    "n8n",
    "Make (Integromat)",
    "Claude API",
    "Git",
    "Docker",
  ],
  security: [
    "Web App Pentesting",
    "Active Directory",
    "Red Team Operations",
    "Bug Bounty",
    "OSINT",
    "Network Pentesting",
    "Vulnerability Research",
    "Burp Suite",
    "Metasploit",
    "BloodHound",
  ],
};

export interface Certification {
  id: string;
  abbr: string;
  name: string;
  issuer: string;
  image: string;
  badge: string;
  badgeColor: "accent" | "blue" | "green" | "purple";
  note: string;
  verifyUrl?: string;
}

export const certifications: Certification[] = [
  {
    id: "crta",
    abbr: "CRTA",
    name: "Certified Red Team Analyst",
    issuer: "Alter Solutions / RastaLabs",
    image: "/images/CRTA.png",
    badge: "100%",
    badgeColor: "accent" as const,
    note: "Exam score: 100%",
    verifyUrl: "https://labs.cyberwarfare.live/credential/achievement/6a188519561ddc10b092a7b4",
  },
  {
    id: "ctia",
    abbr: "CTIA",
    name: "Certified Threat Intelligence Analyst",
    issuer: "arcX",
    image: "/images/CTI101.png",
    badge: "Certified",
    badgeColor: "blue" as const,
    note: "",
    verifyUrl: "https://arcx.io/verify-certificate?id=b6b52786e172ce68d4900675c358b2d8424fca53&k=dc339e3d240d4bb597a878ac43862614",
  },
  {
    id: "htb",
    abbr: "HTB",
    name: "Pro Hacker Rank",
    issuer: "Hack The Box",
    image: "",
    badge: "Pro Hacker",
    badgeColor: "green" as const,
    note: "Active rank",
  },
  {
    id: "webdev",
    abbr: "WD",
    name: "Web Developer Certificate",
    issuer: "IT Academy",
    image: "/images/it-academy-logo.png",
    badge: "Certified",
    badgeColor: "purple" as const,
    note: "",
  },
  {
    id: "cisco-ethical-hacker",
    abbr: "EH",
    name: "Ethical Hacker",
    issuer: "Cisco Networking Academy",
    image: "/images/cisco-ethical-hacker.png",
    badge: "Verified",
    badgeColor: "blue" as const,
    note: "",
    verifyUrl: "https://www.credly.com/badges/77108e33-84f1-4458-917b-203c3858cd41",
  },
  {
    id: "cisco-intro-cybersecurity",
    abbr: "IC",
    name: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    image: "/images/cisco-intro-cybersecurity.png",
    badge: "Verified",
    badgeColor: "green" as const,
    note: "",
    verifyUrl: "https://www.credly.com/badges/ab7b9174-a342-480e-a97b-bb33f3268568",
  },
  {
    id: "cisco-networking-basics",
    abbr: "NB",
    name: "Networking Basics",
    issuer: "Cisco Networking Academy",
    image: "/images/cisco-networking-basics.png",
    badge: "Verified",
    badgeColor: "blue" as const,
    note: "",
    verifyUrl: "https://www.credly.com/badges/fe714762-74bb-4c74-a2b5-5da37fa2822d",
  },
];

export type ProjectCategory =
  | "Fullstack"
  | "Security"
  | "Automation"
  | "Red Team"
  | "Open Source";

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  description: string;
  tags: string[];
  repo: string;
  live: string;
  image: string;
  private?: boolean; // hides repo/live, shows request-via-email CTA
}

export const projects: Project[] = [
  {
    id: "sylk-studio",
    category: "Fullstack",
    title: "Sylk Studio",
    description:
      "Full website for a medical aesthetics & wellness studio — service showcase, brand-aligned design, and booking integration.",
    tags: ["Web Dev", "UI/UX", "Design"],
    repo: "",
    live: "https://sylkstudio.co.za/",
    image: "/images/sylk.png",
  },
  {
    id: "osint-toolkit",
    category: "Red Team",
    title: "Private OSINT Toolkit",
    description:
      "Curated collection of OSINT tools, scripts, and intelligence workflows built over years of red team operations. Available on private request.",
    tags: ["OSINT", "Intelligence", "Recon"],
    repo: "",
    live: "",
    image: "/images/OSINT.png",
    private: true,
  },
  {
    id: "redteam-ops",
    category: "Red Team",
    title: "Red Team Engagements",
    description:
      "Confidential offensive security work: Active Directory attacks, phishing simulations, physical intrusion, and full-scope red team ops. Enquire via email.",
    tags: ["Active Directory", "Phishing", "OPSEC", "Physical"],
    repo: "",
    live: "",
    image: "/images/RedTeam.png",
    private: true,
  },
  {
    id: "ai-automations",
    category: "Automation",
    title: "AI Workflow Automations",
    description:
      "Custom AI-powered automations built with n8n, Make, and the Claude API. Lead pipelines, document processing, Slack bots, internal tools. If it repeats, it gets automated.",
    tags: ["n8n", "Claude API", "Make"],
    repo: "",
    live: "",
    image: "/images/automation.png",
    private: true,
  },
];
