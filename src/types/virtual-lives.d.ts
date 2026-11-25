// Generated at build time from content/lives/*.md by scripts/vite-plugin-lives.ts
declare module 'virtual:lives' {
  export type Topic = 'Business' | 'Marketing' | 'Security' | 'AI News'

  /** Every allowed topic, in filter order */
  export const topics: readonly Topic[]

  export interface Live {
    slug: string
    title: string
    /** YYYY-MM-DD */
    date: string
    topic: Topic
    summary: string
    keyPoints: [string, string, string]
    /** Words in the post (key points + body) */
    wordCount: number
    /** Minutes to read at 220 words a minute, at least 1 */
    readingMinutes: number
    /** Public path to an optional cover image */
    cover?: string
    /** The post body, already rendered to HTML */
    html: string
  }

  /** Newest first */
  export const lives: Live[]
}
