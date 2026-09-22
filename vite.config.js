import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Org site: served from the domain root. Games live in their own repos at /<storyId>/.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
