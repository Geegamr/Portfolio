import { motion, useMotionValue, useSpring } from 'motion/react'
import { useRef, useState } from 'react'
import { Link } from 'react-router'

import type { Project } from '../../data/site'
import { cx } from '../lib/cx'

export function WorkCard({ project, index = 0 }: { project: Project; index?: number }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [hover, setHover] = useState(false)
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="min-w-0"
    >
      <Link
        ref={ref}
        to={`/work/${project.slug}`}
        className="group relative block"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={(e) => {
          const rect = ref.current?.getBoundingClientRect()
          if (!rect) return
          x.set(e.clientX - rect.left)
          y.set(e.clientY - rect.top)
        }}
      >
        <div className="project-art relative aspect-[4/3] overflow-hidden rounded-image" style={{ background: project.tint }}>
          <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]">
            <img src={project.cover} alt={`${project.title} app interface`} className="absolute inset-0 size-full object-cover" loading="lazy" />
          </div>
          <motion.span
            aria-hidden
            style={{ x, y }}
            className={cx(
              'pointer-events-none absolute left-0 top-0 hidden -translate-x-1/2 -translate-y-1/2 items-center rounded-[14px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-navy-deep transition-[opacity,scale] duration-300 md:flex',
              hover ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
            )}
          >
            View project
          </motion.span>
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="font-display project-title text-[30px] sm:text-[36px]">{project.title}</h3>
          <p className="shrink-0 text-[13.5px] text-muted">
            {project.category}
            <span className="ml-3 tabular-nums text-faint">{project.year}</span>
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
