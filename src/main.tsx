import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

// Self-hosted brand fonts (latin subset only, font-display: swap).
// One weight per body/label family keeps first-load font bytes low; emphasis
// comes from Chakra Petch rather than a medium body weight.
import '@fontsource/chakra-petch/latin-600.css'
import '@fontsource/chakra-petch/latin-700.css'
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/jetbrains-mono/latin-400.css'

import './styles/index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production HTML is prerendered at build time (scripts/prerender.mjs): hydrate it.
// The dev server serves an empty root: render from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
