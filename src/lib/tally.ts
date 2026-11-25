// Loads Tally's embed script on demand (never on first paint).
// https://tally.so/help/developer-resources

export interface TallyApi {
  /** Turns every iframe[data-tally-src] on the page into a live form */
  loadEmbeds: () => void
}

declare global {
  interface Window {
    Tally?: TallyApi
  }
}

const SRC = 'https://tally.so/widgets/embed.js'
let pending: Promise<TallyApi> | null = null

export function loadTally(): Promise<TallyApi> {
  if (window.Tally) return Promise.resolve(window.Tally)
  if (pending) return pending

  pending = new Promise<TallyApi>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SRC
    script.async = true
    script.onload = () => (window.Tally ? resolve(window.Tally) : reject(new Error('Tally failed to initialise')))
    script.onerror = () => {
      pending = null
      script.remove()
      reject(new Error('Tally failed to load'))
    }
    document.head.appendChild(script)
  })
  return pending
}
