import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { livesPlugin } from './scripts/vite-plugin-lives.ts'

const root = fileURLToPath(new URL('.', import.meta.url))

// Served from the domain root (marcoschoeman.com on Cloudflare Pages)
export default defineConfig({
  plugins: [react(), tailwindcss(), livesPlugin(root)],
  base: '/',
  build: {
    // scripts/prerender.mjs reads this to preload each page's JS chunk,
    // then deletes it so it is never deployed.
    manifest: true,
  },
  // Bundle GSAP/Lenis into the prerender build so Node doesn't have to
  // resolve their deep imports (gsap/ScrollTrigger) on its own.
  ssr: { noExternal: ['gsap', 'lenis'] },
})
