import type { ImageKey } from './images'

export interface Project {
  id: string
  title: string
  /** Chip on the card image */
  discipline: string
  /** Leave empty until confirmed; the card hides it */
  year?: string
  description: string
  tags: string[]
  image: ImageKey
  imageAlt: string
  /** Tailwind object-position class to steer the crop, e.g. 'object-[40%_center]' */
  imageFocus?: string
  /**
   * Tailwind aspect class for the card image (default 'aspect-4/3').
   * Use the image's own ratio for wide banners so it shows uncropped.
   */
  imageAspect?: string
  /** Public live site */
  live: string
  /** Optional looping preview (muted, inline). Poster comes from `image`. */
  video?: string
}

/** Client work, newest first. Only these three are named anywhere on the site. */
export const projects: Project[] = [
  {
    id: 'king-jacub',
    title: 'King Jacub',
    discipline: 'Web build',
    description:
      'Official site for creator King Jacub: content reel, custom statue shop, brand partnership bookings and a route into his TikTok kingdom, all wrapped in a black-and-gold look that matches the persona.',
    tags: ['Web Dev', 'UI/UX', 'Branding'],
    image: 'project-kingjacub',
    imageAlt: 'King Jacub banner: gold crowned wordmark and lion seal beside him in a black suit, embers drifting through smoke.',
    imageFocus: 'object-[42%_center]',
    // 1200×630 banner: show it whole instead of cropping to 4:3
    imageAspect: 'aspect-[40/21]',
    live: 'https://www.kingjacub.co.za/',
  },
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
]
