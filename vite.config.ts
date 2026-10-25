import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true'
const pagesSecret = process.env.VITE_WEB3FORMS_ACCESS_KEY ?? ''

export default defineConfig({
  base: isGitHubPagesBuild ? '/Portfolio/' : '/',
  plugins: [react(), tailwindcss(), ...(isGitHubPagesBuild ? [] : [cloudflare()])],
  define: isGitHubPagesBuild && pagesSecret ? { 'import.meta.env.VITE_WEB3FORMS_ACCESS_KEY': JSON.stringify(pagesSecret) } : {},
  server: { port: 5173, strictPort: false },
})
