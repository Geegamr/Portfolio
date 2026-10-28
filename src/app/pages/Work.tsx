import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'

import { bySlug, projects } from '../../data/site'
import { Lines, Reveal } from '../components/motion'

const ease = [0.22, 1, 0.36, 1] as const

export function Work() {
  const { slug } = useParams()
  const project = slug ? bySlug(slug) : undefined
  const [activeSlide, setActiveSlide] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1)

  useEffect(() => {
    setActiveSlide(0)
    setSlideDirection(1)
  }, [slug])

  if (!project) return <Navigate to="/" replace />
  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(index + 1) % projects.length]
  const gallery = [{ src: project.cover, label: 'App overview' }, ...(project.screenshots ?? [])]
  const hasMultipleSlides = gallery.length > 1
  const activeImage = gallery[activeSlide] ?? gallery[0]
  const hasPreviousImage = activeSlide > 0
  const hasNextImage = activeSlide < gallery.length - 1

  function changeSlide(nextSlide: number) {
    if (nextSlide < 0 || nextSlide >= gallery.length || nextSlide === activeSlide) return
    setSlideDirection(nextSlide > activeSlide ? 1 : -1)
    setActiveSlide(nextSlide)
  }

  return (
    <article className="mx-auto max-w-[1400px] px-5 pt-28 sm:px-8 sm:pt-36">
      <Link to="/#work" className="inline-flex h-9 items-center gap-1.5 text-[14px] text-muted transition-colors hover:text-fg">
        <ArrowLeft className="size-4" />
        All work
      </Link>

      <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <Lines as="h1" className="font-display project-title text-[clamp(56px,10vw,150px)]" lines={[project.title]} />
        <Reveal delay={0.2} className="max-w-md text-pretty text-[17px] leading-relaxed text-muted lg:pb-4">
          {project.summary}
        </Reveal>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease }}
        role="region"
        aria-label={`${project.title} image gallery`}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            changeSlide(activeSlide - 1)
          } else if (event.key === 'ArrowRight') {
            event.preventDefault()
            changeSlide(activeSlide + 1)
          }
        }}
        className="relative isolate mt-12 aspect-[16/10] overflow-hidden rounded-[32px] border border-zinc-800 bg-black outline-none focus-visible:ring-2 focus-visible:ring-accent sm:aspect-[16/9]"
      >
        <div className="absolute inset-0 flex min-h-0 min-w-0 items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
          key={activeImage.src}
          initial={{ opacity: 0, x: slideDirection * 44, scale: 0.99 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: slideDirection * -44, scale: 0.99 }}
          transition={{ duration: 0.3, ease }}
          src={`${import.meta.env.BASE_URL}${activeImage.src.replace(/^\//, '')}`}
          alt={`${project.title} — ${activeImage.label}`}
          className="size-full object-fill"
            />
          </AnimatePresence>
        </div>

        {hasMultipleSlides && (
          <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 flex items-center justify-between sm:inset-x-5 sm:bottom-5">
            <div className="pointer-events-auto flex items-center gap-2">
              <button type="button" aria-label="Previous image" disabled={!hasPreviousImage} onClick={() => changeSlide(activeSlide - 1)} className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/75 text-white shadow-lg backdrop-blur transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-35">
                <ArrowLeft aria-hidden="true" className="size-5" />
              </button>
              <button type="button" aria-label="Next image" disabled={!hasNextImage} onClick={() => changeSlide(activeSlide + 1)} className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/75 text-white shadow-lg backdrop-blur transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-35">
                <ArrowRight aria-hidden="true" className="size-5" />
              </button>
            </div>
            <span className="rounded-full border border-white/20 bg-black/75 px-3.5 py-2 text-[13px] font-medium tabular-nums text-white shadow-lg backdrop-blur">{activeSlide + 1} / {gallery.length}</span>
          </div>
        )}
      </motion.div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-24">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 text-[14px] lg:grid-cols-1">
          {[
            ['Client', project.client],
            ['Year', project.year],
            ['Role', project.role.join(', ')],
            ['Delivered', project.deliverables.join(', ')],
          ].map(([label, value]) => (
              <div key={label} className="border-t border-line pt-3">
                <dt className="text-muted">{label}</dt>
                <dd className="mt-1 text-fg">{value}</dd>
              </div>
            ))}
            {project.link && (
              <div className="border-t border-line pt-3">
                <a href={project.link} target="_blank" rel="noreferrer" className="link-draw inline-flex items-center gap-1 font-medium text-accent">
                  Visit the site
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            )}
          </dl>
        </Reveal>
        <div className="max-w-2xl">
          {project.body.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className={`text-pretty leading-relaxed text-fg/90 ${i === 0 ? 'font-display text-[28px] leading-[1.2] sm:text-[36px]' : 'mt-6 text-[17px] text-muted'}`}>{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>


      <Link
        to={`/work/${next.slug}`}
        className="squircle-hit group mt-24 grid min-h-[240px] items-center gap-8 border border-line bg-surface px-6 py-10 transition-colors hover:bg-navy-raised sm:mt-32 sm:min-h-[300px] sm:grid-cols-[minmax(0,1fr)_260px] sm:gap-12 sm:px-10 sm:py-12 lg:px-14"
      >
        <div className="flex min-w-0 flex-col justify-center gap-5 sm:gap-7">
          <p className="text-[14px] text-muted">Next project</p>
          <h2 className="font-display project-title text-[clamp(40px,7vw,96px)] leading-[0.98] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">{next.title}</h2>
          <span className="inline-flex items-center gap-2 text-[14px] font-medium text-accent">
            Explore project
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </div>
        <span className="squircle-hit image-frame hidden aspect-[4/3] w-full overflow-hidden border border-line-strong sm:block" style={{ background: next.tint }}>
          <img src={`${import.meta.env.BASE_URL}${next.cover.replace(/^\//, '')}`} alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        </span>
      </Link>
    </article>
  )
}
