import type { ImageKey } from './images'

export type Discipline = 'Web build' | 'Ethical hacking' | 'Web investigations' | 'AI automation'

/** Which portfolio section a project lives in */
export type ProjectCategory = 'web' | 'security' | 'automation'

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  /** Chip on the card image */
  discipline: Discipline
  /** Leave empty until confirmed; the card hides it */
  year?: string
  description: string
  tags: string[]
  image: ImageKey
  imageAlt: string
  /** Tailwind object-position class to steer the crop, e.g. 'object-[40%_center]' */
  imageFocus?: string
  /**
   * Tailwind aspect class for the card image below lg (default 'aspect-4/3').
   * Use the image's own ratio for wide banners so phones show it uncropped.
   */
  imageAspect?: string
  /** Public live site. Omit for private work. */
  live?: string
  /** Private work: hides live link, shows a request-by-email CTA */
  private?: boolean
  /** Optional looping preview (muted, inline). Poster comes from `image`. */
  video?: string
}

export const projects: Project[] = [
  {
    id: 'king-jacub',
    title: 'King Jacub',
    category: 'web',
    discipline: 'Web build',
    description:
      'Official site for creator King Jacub: content reel, custom statue shop, brand partnership bookings and a route into his TikTok kingdom, all wrapped in a black-and-gold look that matches the persona.',
    tags: ['Web Dev', 'UI/UX', 'Branding'],
    image: 'project-kingjacub',
    imageAlt: 'King Jacub banner: gold crowned wordmark and lion seal beside him in a black suit, embers drifting through smoke.',
    imageFocus: 'object-[42%_center]',
    // 1200×630 banner: show it whole on phones instead of cropping to 4:3
    imageAspect: 'aspect-[40/21]',
    live: 'https://www.kingjacub.co.za/',
  },
  {
    id: 'juul-engineering',
    title: 'Juul Engineering',
    category: 'web',
    discipline: 'Web build',
    description:
      'Website for a third-generation steel fabrication shop on the West Rand: draggable project gallery, spam-protected quote form, and responsive WebP imagery that loads fast on any connection.',
    tags: ['Web Dev', 'UI/UX', 'Performance'],
    image: 'project-juul',
    imageAlt: 'Sparks fly as a welder joins a steel frame on the Juul Engineering shop floor.',
    live: 'https://juulengineering.co.za/',
  },
  {
    id: 'sylk-studio',
    title: 'Sylk Studio',
    category: 'web',
    discipline: 'Web build',
    description:
      'Full website for a medical aesthetics and wellness studio: service showcase, brand-aligned design, and booking integration.',
    tags: ['Web Dev', 'UI/UX', 'Design'],
    image: 'project-sylk',
    imageAlt: 'Brass Sylk Aesthetic Studio lettering on a taupe wall between two sash windows.',
    live: 'https://sylkstudio.co.za/',
  },
  {
    id: 'redteam-ops',
    title: 'Red Team Engagements',
    category: 'security',
    discipline: 'Ethical hacking',
    description:
      'Confidential offensive security work: Active Directory attacks, phishing simulations, physical intrusion, and full-scope red team ops. Enquire via email.',
    tags: ['Active Directory', 'Phishing', 'OPSEC', 'Physical'],
    image: 'project-redteam',
    imageAspect: 'aspect-[11/6]', // 11:6 source, shown uncropped
    imageAlt: 'A metal challenge coin engraved Red Team Operations with a red-eyed raven emblem.',
    private: true,
  },
  {
    id: 'osint-toolkit',
    title: 'Private OSINT Toolkit',
    category: 'security',
    discipline: 'Web investigations',
    description:
      'Curated collection of OSINT tools, scripts, and intelligence workflows built over years of red team operations. Available on private request.',
    tags: ['OSINT', 'Intelligence', 'Recon'],
    image: 'project-osint',
    imageAspect: 'aspect-[11/6]', // 11:6 source, shown uncropped
    imageAlt: 'An operator at a dark multi-monitor desk next to a notebook embossed Private OSINT.',
    private: true,
  },
  {
    id: 'ai-automations',
    title: 'AI Workflow Automations',
    category: 'automation',
    discipline: 'AI automation',
    description:
      'Custom AI-powered automations built with n8n, Make, and the Claude API. Lead pipelines, document processing, Slack bots, internal tools. If it repeats, it gets automated.',
    tags: ['n8n', 'Claude API', 'Make'],
    image: 'project-automation',
    imageAspect: 'aspect-[11/6]', // 11:6 source, shown uncropped
    imageAlt: 'Blue infinity-loop gears logo with the word Automation, shown on light and dark backgrounds.',
    private: true,
  },
]

export interface ProjectGroup {
  category: ProjectCategory
  /** Section anchor */
  id: string
  index: string
  name: string
  kana: string
  /** Main heading line */
  title: string
  /** Optional second, smaller heading line */
  subtitle?: string
  intro: string
  /** What this discipline covers (shown beside the cards) */
  highlights?: string[]
  cta?: { label: string; channel: 'email' | 'instagram'; subject?: string }
}

/** Portfolio sections, in page order */
export const projectGroups: Record<ProjectCategory, ProjectGroup> = {
  web: {
    category: 'web',
    id: 'work',
    index: '02',
    name: 'Web development',
    kana: 'ウェブ開発',
    title: 'Web development',
    intro: 'Sites I have designed, built and launched for real businesses and creators.',
  },
  security: {
    category: 'security',
    id: 'security',
    index: '03',
    name: 'Ethical hacking',
    kana: 'セキュリティ',
    title: 'Ethical hacking',
    subtitle: '& private web investigations',
    intro:
      'Most of this work lives under NDA, so there are no screenshots. What I can share is what I do and how I do it.',
    highlights: [
      'Web app and network penetration testing',
      'Active Directory attacks and full-scope red team operations',
      'Private web investigations and OSINT on people, companies and infrastructure',
      'Clear reports with fixes, not just a list of findings',
    ],
    cta: { label: 'Request a confidential briefing', channel: 'email', subject: 'Confidential briefing request' },
  },
  automation: {
    category: 'automation',
    id: 'automation',
    index: '04',
    name: 'AI automations',
    kana: '自動化',
    title: 'AI automations',
    intro: 'Workflows that run themselves, so your team stops copy-pasting and starts closing.',
    highlights: [
      'Lead capture and follow-up pipelines',
      'Document processing and data extraction',
      'Slack and chat bots that answer for you',
      'Internal tools wired into the apps you already use',
    ],
    cta: { label: 'DM me about an automation', channel: 'instagram' },
  },
}

export const projectsIn = (category: ProjectCategory) => projects.filter((p) => p.category === category)