import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

import { projects, services, site } from '../../data/site'
import { Lines, Parallax, Reveal } from '../components/motion'
import { WorkCard } from '../components/WorkCard'
import { cx } from '../lib/cx'

const ease = [0.22, 1, 0.36, 1] as const

export function Home() {
  const prefersReducedMotion = useReducedMotion()
  const years = projects.map((p) => Number(p.year))
  const first = Math.min(...years)
  const last = Math.max(...years)
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-navy-deep">
        <HeroField />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-10 pt-28 sm:px-8 sm:pb-14">
          <h1 className="font-display text-[clamp(64px,13.5vw,210px)] text-fg">
            {site.name.split(' ').map((word, i) => (
              <span key={word} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <motion.span className="block" initial={prefersReducedMotion ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 1.1, delay: prefersReducedMotion ? 0 : 0.25 + i * 0.12, ease }}>
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.9, delay: prefersReducedMotion ? 0 : 0.7, ease }} className="mt-8 max-w-2xl border-t border-fg/15 pt-6 sm:mt-10">
            <p className="max-w-xl text-pretty text-[16px] leading-relaxed text-muted sm:text-[19px]">I build apps, desktop software, useful tools, and web projects—made to solve a real problem and feel good to use.</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href={`mailto:${site.email}?subject=${encodeURIComponent('Let’s talk about a project')}`} className="squircle-hit inline-flex min-h-12 items-center gap-2 rounded-[16px] bg-accent px-6 py-3 text-[15px] font-semibold text-navy-deep transition-colors hover:bg-accent-soft">
                Tell me what you’re building <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
              <Link to="/#work" className="link-draw inline-flex min-h-11 items-center gap-1.5 text-[14px] font-medium text-fg">
                See selected work <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-line bg-surface py-5" aria-hidden>
        <ul className="font-display flex w-max animate-marquee items-center gap-10 whitespace-nowrap text-[28px] text-fg/70 sm:text-[36px]">
          {[...site.marquee, ...site.marquee].map((item, i) => (
            <li key={i} className="flex items-center gap-10">
              {item}
              <span className="round size-2 rounded-full bg-accent" />
            </li>
          ))}
        </ul>
      </div>

      {/* About teaser */}
      <section className="mx-auto max-w-[1400px] px-5 pt-32 sm:px-8 sm:pt-44">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <Parallax src={`${import.meta.env.BASE_URL}images/portrait.jpg`} alt={`${site.name} sitting outside at night`} className="portrait-photo aspect-[3/4] max-w-[460px] rounded-image" strength={6} />
          </Reveal>
          <div className="flex flex-col justify-center">
            <Lines
              as="h2"
              className="font-display text-balance text-[40px] sm:text-[56px] lg:text-[64px]"
              lines={['I build the tool', 'I wanted', 'to use']}
            />
            <Reveal delay={0.2} className="mt-8 max-w-xl text-pretty text-[17px] leading-relaxed text-muted">
              <p>
                Most of what is here started as something I needed: an authenticator that does not phone home, a Minecraft launcher that manages modpacks, or a better way to browse my game library. Then I kept going until other people could use it too.
              </p>
              <p className="mt-4">
                Rust and TypeScript mostly, Python when a script is the honest answer, Tauri and Electron for the desktop. I build from {site.location}, and I go by Gee.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-8">
              <Link to="/about" className="link-draw inline-flex items-center gap-1.5 text-[15px] font-medium">
                More about me
                <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 pt-24 sm:px-8 sm:pt-32">
        <div className="flex items-end justify-between">
          <Lines as="h2" className="font-display text-[44px] sm:text-[64px]" lines={['Selected work']} />
          <Reveal className="hidden text-[14px] text-muted sm:block">
            {projects.length} projects, {first === last ? first : `${first}—${last}`}
          </Reveal>
        </div>
        <div className="mt-12 grid items-start gap-x-5 gap-y-12 md:grid-cols-3 lg:gap-x-8">
          {projects.map((p, i) => (
            <WorkCard key={p.slug} project={p} index={i} />
          ))}
        </div>
        <div className="mt-20 border-t border-line pt-10 sm:mt-24">
          <div className="flex items-end justify-between gap-4">
            <h3 className="font-display text-[32px] text-fg sm:text-[40px]">CurseForge projects</h3>
            <a href="https://www.curseforge.com/members/geegamr/projects" target="_blank" rel="noreferrer" className="link-draw inline-flex shrink-0 items-center gap-1 text-[14px] text-muted transition-colors hover:text-fg">
              All projects <ArrowUpRight className="size-4" />
            </a>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <a href="https://www.curseforge.com/minecraft/mc-mods/relic-hunter" target="_blank" rel="noreferrer" className="squircle-hit group flex min-h-40 flex-col justify-between rounded-[24px] border border-line bg-surface p-6 transition-colors hover:bg-surface-2 sm:p-8">
              <div>
                <p className="text-[13px] text-muted">Minecraft mod · Forge 1.20.1</p>
                <h4 className="mt-3 font-display text-[30px] text-project-blue sm:text-[36px]">Relic Hunter</h4>
                <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">Explore the world, take on bosses, and collect relics on the path to a mega-boss.</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">View on CurseForge <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
            </a>
            <a href="https://www.curseforge.com/minecraft/mc-mods/contra" target="_blank" rel="noreferrer" className="squircle-hit group flex min-h-40 flex-col justify-between rounded-[24px] border border-line bg-surface p-6 transition-colors hover:bg-surface-2 sm:p-8">
              <div>
                <p className="text-[13px] text-muted">Minecraft mod · Forge 1.20.1</p>
                <h4 className="mt-3 font-display text-[30px] text-project-blue sm:text-[36px]">Contra</h4>
                <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">Grow “stuff” and sell “stuff” in a mod built around real-life synthesis paths.</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">View on CurseForge <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
            </a>
          </div>
        </div>
      </section>


      {/* Services */}
      <section className="mx-auto max-w-[1400px] px-5 pt-32 sm:px-8 sm:pt-44">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <Lines as="h2" className="font-display text-[40px] sm:text-[56px]" lines={['What I do']} />
            <Reveal delay={0.1} className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted">
              Apps, desktop software, web projects, and practical tools—scoped to the problem you actually need solved.
            </Reveal>
            <Reveal delay={0.2} className="mt-8 max-w-sm border-t border-line pt-5 text-[15px] leading-relaxed text-muted">
              {site.projectProcess}
            </Reveal>
          </div>
          <Services />
        </div>
      </section>
    </>
  )
}

// A quiet cool-toned field gives the navy hero depth without competing with its type.
function HeroField() {
  return (
    <div aria-hidden="true" className="hero-mask pointer-events-none absolute inset-0">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, ease }} className="absolute inset-0">
        <div className="round hero-glow-blue absolute -top-[18%] right-[-8%] h-[78%] w-[62%] animate-drift-a rounded-full blur-[56px]" />
        <div className="round hero-glow-violet absolute -top-[8%] left-[-8%] h-[62%] w-[48%] animate-drift-b rounded-full blur-[56px]" />
        <div className="round hero-glow-cyan absolute top-[24%] left-[34%] h-[58%] w-[48%] animate-drift-c rounded-full blur-[56px]" />
      </motion.div>
      <div className="grain absolute inset-0" />
    </div>
  )
}

function Services() {
  const [open, setOpen] = useState(0)
  return (
    <ul className="border-t border-line">
      {services.map((s, i) => {
        const isOpen = open === i
        return (
          <li key={s.title} className="border-b border-line">
            <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)} className="group flex w-full items-center gap-6 py-7 text-left">
              <span className="w-10 shrink-0 text-[14px] tabular-nums text-faint">0{i + 1}</span>
              <span className={cx('font-display flex-1 text-[32px] transition-colors sm:text-[44px]', isOpen ? 'text-fg' : 'text-fg/60 group-hover:text-fg')}>{s.title}</span>
              <span className={cx('grid size-10 shrink-0 place-items-center rounded-[12px] border border-line-strong transition-colors duration-300', isOpen && 'border-fg bg-fg text-bg')}>
                <Plus className={cx('size-4 transition-transform duration-500', isOpen && 'rotate-45')} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease }} className="overflow-hidden">
                  <p className="max-w-xl pb-8 pl-16 text-pretty text-[16px] leading-relaxed text-muted">{s.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
