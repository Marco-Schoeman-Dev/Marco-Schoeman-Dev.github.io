// Typed access to the manifest written by scripts/optimize-images.mjs.
import manifest from './images.generated.json'

export interface ImageEntry {
  width: number
  height: number
  avif: string[]
  webp: string[]
  fallback: string
  /** 1200×630 JPEG share image (Lives covers only) */
  og?: string
}

export type ImageKey =
  | 'hero-desktop'
  | 'hero-mobile'
  | 'logo-emblem'
  | 'logo-lockup'
  | 'profile'
  | 'project-kingjacub'
  | 'project-juul'
  | 'project-sylk'
  | 'method-operative'
  | 'badge-crta'
  | 'badge-ctia'
  | 'badge-itacademy'
  | 'badge-cisco-eh'
  | 'badge-cisco-ic'
  | 'badge-cisco-nb'

const all = manifest as Record<string, ImageEntry>

export const images = all as Record<ImageKey, ImageEntry>

/**
 * Optimised copies of a file in public/images/lives/, by its public path:
 * "/images/lives/what-is-seo/cover.png" → key "lives/what-is-seo/cover".
 * Undefined if the image step hasn't processed it (then use the original).
 */
export function imageForPath(path: string): ImageEntry | undefined {
  const key = path.replace(/^\/?images\//, '').replace(/\.\w+$/, '')
  return all[key]
}
