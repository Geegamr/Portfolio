import { ArrowUpRight } from 'lucide-react'

import { site } from '../../data/site'
import { Lines, Parallax, Reveal } from '../components/motion'

export function About() {
  return (
    <article className="mx-auto max-w-[1400px] px-5 pt-28 sm:px-8 sm:pt-36">
      <Lines as="h1" className="font-display project-title text-balance text-[clamp(44px,7.5vw,112px)]" lines={['Developer, builder,', 'occasional toolmaker']} />
      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
        <Reveal>
          <Parallax src={`${import.meta.env.BASE_URL}images/portrait.jpg`} alt={`${site.name} sitting outside at night`} className="portrait-photo aspect-[3/4] rounded-image" strength={6} />
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="link-draw inline-flex items-center gap-1 text-muted hover:text-fg">
                  {s.label}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <div>
          <Reveal className="text-pretty text-[19px] leading-relaxed sm:text-[22px]">
            <p>
              If I have a problem and I can fix it with code, I will. That is the line from my GitHub bio, and it is the most accurate thing I can say about how I work: almost everything on this site started as a problem I had.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 flex flex-col gap-5 text-[17px] leading-relaxed text-muted">
            <p>
              I write Rust and TypeScript, reach for Python when a script is the honest answer, and ship desktop apps with Tauri and Electron. The common thread is tools that stay small, work offline where they can, and never make you create an account.
            </p>
            <p>
              I am based in {site.location}. Away from the keyboard I am usually playing the games the launchers are for or thinking about what tool to build next.
            </p>
          </Reveal>
        </div>
      </div>
    </article>
  )
}
