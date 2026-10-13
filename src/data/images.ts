// Typed access to the manifest written by scripts/optimize-images.mjs.
import manifest from './images.generated.json'

export interface ImageEntry {
  width: number
  height: number
  avif: string[]
  webp: string[]
  fallback: string
}

export type ImageKey =
  | 'hero-desktop'
  | 'hero-mobile'
  | 'avatar-ring'
  | 'project-juul'
  | 'project-sylk'
  | 'project-osint'
  | 'project-redteam'
  | 'project-automation'
  | 'method-operative'
  | 'badge-crta'
  | 'badge-ctia'
  | 'badge-itacademy'
  | 'badge-cisco-eh'
  | 'badge-cisco-ic'
  | 'badge-cisco-nb'

export const images = manifest as Record<ImageKey, ImageEntry>
