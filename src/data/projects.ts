import type { ImageKey } from './images'

export type Discipline = 'Web build' | 'Red team' | 'Automation'

export interface Project {
  id: string
  title: string
  discipline: Discipline
  /** Leave empty until confirmed; the card hides it */
  year?: string
  description: string
  tags: string[]
  image: ImageKey
  imageAlt: string
  /** Public live site. Omit for private work. */
  live?: string
  /** Private work: hides live link, shows a request-by-email CTA */
  private?: boolean
  /** Optional looping preview (muted, inline). Poster comes from `image`. */
  video?: string
}

export const projects: Project[] = [
  {
    id: 'juul-engineering',
    title: 'Juul Engineering',
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
    discipline: 'Web build',
    description:
      'Full website for a medical aesthetics and wellness studio: service showcase, brand-aligned design, and booking integration.',
    tags: ['Web Dev', 'UI/UX', 'Design'],
    image: 'project-sylk',
    imageAlt: 'Brass Sylk Aesthetic Studio lettering on a taupe wall between two sash windows.',
    live: 'https://sylkstudio.co.za/',
  },
  {
    id: 'osint-toolkit',
    title: 'Private OSINT Toolkit',
    discipline: 'Red team',
    description:
      'Curated collection of OSINT tools, scripts, and intelligence workflows built over years of red team operations. Available on private request.',
    tags: ['OSINT', 'Intelligence', 'Recon'],
    image: 'project-osint',
    imageAlt: 'An operator at a dark multi-monitor desk next to a notebook embossed Private OSINT.',
    private: true,
  },
  {
    id: 'redteam-ops',
    title: 'Red Team Engagements',
    discipline: 'Red team',
    description:
      'Confidential offensive security work: Active Directory attacks, phishing simulations, physical intrusion, and full-scope red team ops. Enquire via email.',
    tags: ['Active Directory', 'Phishing', 'OPSEC', 'Physical'],
    image: 'project-redteam',
    imageAlt: 'A metal challenge coin engraved Red Team Operations with a red-eyed raven emblem.',
    private: true,
  },
  {
    id: 'ai-automations',
    title: 'AI Workflow Automations',
    discipline: 'Automation',
    description:
      'Custom AI-powered automations built with n8n, Make, and the Claude API. Lead pipelines, document processing, Slack bots, internal tools. If it repeats, it gets automated.',
    tags: ['n8n', 'Claude API', 'Make'],
    image: 'project-automation',
    imageAlt: 'Blue infinity-loop gears logo with the word Automation, shown on light and dark backgrounds.',
    private: true,
  },
]
