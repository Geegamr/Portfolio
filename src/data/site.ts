// Everything about you lives here. The pages read from this file.

export const site = {
  name: 'Enrique Ramirez',
  role: 'Developer and builder',
  location: 'New Mexico',
  timezone: 'America/Denver',
  email: 'geegamr@gmail.com',
  available: true,
  intro: 'I build small, sharp tools: desktop apps that work offline, game launchers and the odd web thing. I go by Gee.',
  projectProcess: 'We start by getting clear on the problem and agreeing on a focused first version. I build it, share progress as we go, then refine it with your feedback.',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Geegamr' },
    { label: 'Instagram', href: 'https://www.instagram.com/575.gambler' },
    { label: 'CurseForge', href: 'https://www.curseforge.com/members/geegamr/projects' },
  ],
  marquee: ['Desktop apps', 'Web tools', 'Rust and Tauri', 'Electron', 'Python', 'Game libraries'],
}

export interface Project {
  slug: string
  title: string
  client: string
  category: string
  year: string
  cover: string
  screenshots?: { src: string; label: string }[]
  tint: string
  summary: string
  role: string[]
  deliverables: string[]
  link?: string
  body: string[]
  size: 'large' | 'small'
}

export const projects: Project[] = [
  {
    slug: 'offline-authenticator',
    title: 'Offline Authenticator',
    client: 'Self-initiated',
    category: 'Desktop app',
    year: '2026',
    cover: '/images/offline-authenticator-real.png',
    tint: 'hsl(222 47% 12%)',
    summary: 'A desktop authenticator for people who want their two-factor codes without trusting a cloud account. Codes and recovery keys stay in an encrypted local vault.',
    role: ['Rust', 'Tauri', 'Design'],
    deliverables: ['Windows desktop app', 'TOTP engine', 'Encrypted vault', 'Imports from Aegis and Bitwarden'],
    link: 'https://github.com/Geegamr/offline-authenticator',
    body: [
      'I wanted a desktop authenticator I could trust, and I wanted it to be open source. So I built one: a Tauri app backed by Rust, storing everything in an encrypted vault file on my own machine.',
      'It solves the tradeoff between convenient two-factor codes and keeping sensitive account data off a third-party cloud. Manual keys, authenticator links, QR images, and a camera can add codes; the vault encrypts them locally.',
      'It makes codes from manual keys, authenticator links, QR images or a camera, and imports Aegis and Bitwarden exports plus Google transfer QR codes. Recovery codes live in separate named lists that remember which ones you have already spent, which is the part you actually need when a phone is gone.',
      'The vault is encrypted with a password before it is written, and there is no reset, by design. Backups are password-protected files you can restore into another vault. No telemetry, no network calls, no account.',
    ],
    size: 'large',
  },
  {
    slug: 'craftdock',
    title: 'CraftDock',
    client: 'Self-initiated',
    category: 'Desktop app',
    year: '2026',
    cover: '/images/craftdock-home.png',
    screenshots: [
      { src: '/images/craftdock-instance.png', label: 'Instance management and launch settings' },
      { src: '/images/craftdock-browser.png', label: 'Modpack browser' },
      { src: '/images/craftdock-server.png', label: 'Minecraft server manager' },
      { src: '/images/craftdock-skins.png', label: 'Skin manager' },
    ],
    tint: 'hsl(224 46% 13%)',
    summary: 'Minecraft files, packs, and test servers can end up scattered across folders and tools. CraftDock brings instances, modpacks, accounts, worlds, and server testing into one desktop launcher.',
    role: ['Electron', 'JavaScript', 'Design'],
    deliverables: ['Organized multi-instance launcher', 'Multi-account switching', 'Modrinth and CurseForge browsing and import/export', 'Synced worlds, resource packs and shaders', 'Built-in server manager', 'Direct Minecraft launch'],
    link: 'https://github.com/Geegamr/CraftDock',
    body: [
      'I wanted a launcher that looked good in my favorite colors and brought the parts of Minecraft I use together. CraftDock is built around organized instances, with linked worlds, resource packs, shaders, server lists and settings that can stay in sync.',
      'The problem it tackles is the sprawl: different instances, accounts, packs, worlds, and test servers often mean switching between folders and launcher tools. CraftDock gives those tasks one desktop home.',
      'Instances can install, browse, import and export modpacks from Modrinth and CurseForge. Multiple accounts are easy to switch between, and the built-in server manager makes creating servers and testing plugins quicker. Skin and cape changes are close at hand, and CraftDock launches Minecraft directly instead of handing off to the official launcher.',
      'CraftDock is built with Electron. The goal is one place to organize instances, switch accounts, explore modpacks and get a test server running without wrestling with files or bouncing between tools.',
    ],
    size: 'small',
  },
  {
    slug: 'mgba-launcher',
    title: 'mGBA Launcher',
    client: 'Self-initiated',
    category: 'Desktop app',
    year: '2026',
    cover: '/images/mgba-launcher-real.png',
    tint: 'hsl(220 48% 11%)',
    summary: 'A game library is easier to browse than a folder full of ROM files. This small Python launcher turns a ROM directory into a searchable shelf and matches artwork automatically.',
    role: ['Python', 'Tkinter', 'Pillow'],
    deliverables: ['Tile-based ROM library', 'Automatic icon matching', 'Search and sorting', 'Dark and light themes'],
    link: 'https://github.com/Geegamr/mGBA-launcher',
    body: [
      'I made the mGBA Launcher to make playing retro games easier for my friends. Instead of asking them to dig through folders and figure out which file to open, it turns a ROM directory into a simple, browsable game shelf.',
      'Its job is to make a folder of game files understandable at a glance: it finds matching artwork, then lets you search and sort the resulting library.',
      'It scans the ROM folder, lays games out as tiles and automatically looks for matching icons. Search, sorting and the option to show or hide titles make the collection easy to browse without handling files one by one.',
      'Built with Python, Tkinter and Pillow, the launcher supports dark and light themes and common image formats. When artwork is missing it can create a placeholder, so the shelf stays usable without extra file setup.',
    ],
    size: 'large',
  },
]

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug)

export const services = [
  {
    title: 'Desktop apps',
    body: 'Tauri and Rust when it has to be small and work offline, Electron when the ecosystem matters more. Packaged installers, no account required.',
  },
  {
    title: 'Web tools',
    body: 'Single-purpose sites and interfaces that load fast and do one thing properly, from a cipher toy to a page like this one.',
  },
  {
    title: 'Automation',
    body: 'Python scripts and launchers that take a repetitive job and turn it into one command, with sane defaults and readable errors.',
  },
  {
    title: 'Open source',
    body: 'Public repos with READMEs someone can follow: build steps, requirements, and honest notes about what does not work yet.',
  },
]
