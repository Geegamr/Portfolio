import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  base: isGitHubPagesBuild ? '/Portfolio/' : '/',
  plugins: [react(), tailwindcss(), ...(isGitHubPagesBuild ? [] : [cloudflare()])],
  server: { port: 5173, strictPort: false },
})
