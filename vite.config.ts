import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import sodium from 'libsodium-wrappers'
import { defineConfig } from 'vite'

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true'
const pagesSecret = process.env.GITHUB_PAGES_PRIVATE_KEY ? loadPagesSecret() : ''

function loadPagesSecret() {
  try {
    const encryptedBase64 = readFileSync('.github/.web3forms-encrypted', 'utf8').trim()
    const keyId = readFileSync('.github/.web3forms-key-id', 'utf8').trim()
    if (!encryptedBase64 || !keyId) return ''
    const publicKeyText = readFileSync('.github/.web3forms-public-key', 'utf8').trim()
    if (!publicKeyText) return ''
    const publicKey = sodium.from_base64(publicKeyText, sodium.base64_variants.ORIGINAL)
    const workflowPrivateKey = process.env.GITHUB_PAGES_PRIVATE_KEY
    if (!workflowPrivateKey) return ''
    const privateKey = sodium.from_base64(workflowPrivateKey, sodium.base64_variants.ORIGINAL)
    const ciphertext = sodium.from_base64(encryptedBase64, sodium.base64_variants.ORIGINAL)
    const plaintext = sodium.crypto_box_seal_open(ciphertext, publicKey, privateKey)
    return new TextDecoder().decode(plaintext)
  } catch {
    // An unset repository secret leaves the form's existing mailto fallback active.
    return ''
  }
}

export default defineConfig({
  base: isGitHubPagesBuild ? '/Portfolio/' : '/',
  plugins: [react(), tailwindcss(), ...(isGitHubPagesBuild ? [] : [cloudflare()])],
  define: isGitHubPagesBuild && pagesSecret ? { 'import.meta.env.VITE_WEB3FORMS_ACCESS_KEY': JSON.stringify(pagesSecret) } : {},
  server: { port: 5173, strictPort: false },
})
