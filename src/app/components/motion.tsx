import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'

import { cx } from '../lib/cx'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Lines of text that rise out of a mask, one after another. The wrapper is
 * what gets observed: a line translated out of its overflow-hidden mask has
 * no visible area, so observing the line itself would never fire.
 */
export function Lines({ lines, className, delay = 0, as: Tag = 'h1' }: { lines: ReactNode[]; className?: string; delay?: number; as?: 'h1' | 'h2' | 'p' }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' })
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span className="block" initial={{ y: '110%' }} animate={inView ? { y: 0 } : { y: '110%' }} transition={{ duration: 1, delay: delay + i * 0.1, ease }}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export function Reveal({ children, delay = 0, className, y = 24 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/** An image that drifts slightly slower than the page while it scrolls past. */
export function Parallax({ src, alt, className, strength = 8 }: { src: string; alt: string; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])
  return (
    <div ref={ref} className={cx('image-frame relative', className)}>
      <motion.img src={src} alt={alt} style={{ y }} className="absolute inset-0 size-full scale-[1.12] object-cover" loading="lazy" />
    </div>
  )
}

/** A button that leans toward the cursor. */
export function Magnetic({ children, className, strength = 0.3 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={cx('inline-block', className)}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        x.set((e.clientX - rect.left - rect.width / 2) * strength)
        y.set((e.clientY - rect.top - rect.height / 2) * strength)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}