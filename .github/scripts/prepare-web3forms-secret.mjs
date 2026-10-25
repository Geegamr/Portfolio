import sodium from 'libsodium-wrappers'
import { readFileSync, writeFileSync } from 'node:fs'

const secret = process.env.WEB3FORMS_ACTIONS_SECRET
if (!secret) {
  console.error('The VITE_WEB3FORMS_ACCESS_KEY repository secret is not configured.')
  process.exit(1)
}

await sodium.ready
const response = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/actions/secrets/public-key`, {
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28',
  },
})
if (!response.ok) throw new Error(`Could not retrieve repository public key (HTTP ${response.status}).`)
const { key, key_id: keyId } = await response.json()
const publicKey = sodium.from_base64(key, sodium.base64_variants.ORIGINAL)
const encrypted = sodium.crypto_box_seal(new TextEncoder().encode(secret), publicKey)
const encryptedBase64 = sodium.to_base64(encrypted, sodium.base64_variants.ORIGINAL)
// Keep ciphertext out of logs and the Pages artifact; Vite reads it only while building.
writeFileSync('.github/.web3forms-encrypted', encryptedBase64, { mode: 0o600 })
writeFileSync('.github/.web3forms-public-key', key, { mode: 0o600 })
writeFileSync('.github/.web3forms-key-id', String(keyId), { mode: 0o600 })
console.log('Web3Forms key encrypted for the build without logging its value.')
