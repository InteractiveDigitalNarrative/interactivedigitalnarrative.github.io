import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Org site: served from the domain root. Games live in their own repos at /<storyId>/.
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    // Dev only: serve a locally running game under the same address, so the library
    // and the game share browser storage like they will on the live site.
    // Start the game's own dev server first (it runs on port 5173).
    proxy: {
      '/storm-alert': { target: 'http://localhost:5173', ws: true },
    },
  },
})
