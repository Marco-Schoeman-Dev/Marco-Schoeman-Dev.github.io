import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// User site (marco-schoeman-dev.github.io): base stays '/'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  // Bundle GSAP/Lenis into the prerender build so Node doesn't have to
  // resolve their deep imports (gsap/ScrollTrigger) on its own.
  ssr: { noExternal: ['gsap', 'lenis'] },
})
