import { ArrowUpRight, Check } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { site } from '../../data/site'
import { Lines, Magnetic, Reveal } from './motion'
import { useLocalTime } from './Nav'

export function Footer() {
  const time = useLocalTime()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const emailDraftUrl = `mailto:${site.email}?subject=${encodeURIComponent(`Portfolio contact: ${form.name}`)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`

  async function submit(e: FormEvent) {
    e.preventDefault()
    setState('sending')

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()
    const openEmailFallback = (message: string) => {
      setError(message)
      setState('error')
      window.location.href = emailDraftUrl
    }

    if (!accessKey) {
      openEmailFallback('The online form is not configured yet. Opening an email draft instead.')
      return
    }

    try {
      const payload = new FormData()
      payload.append('access_key', accessKey)
      payload.append('name', form.name)
      payload.append('email', form.email)
      payload.append('replyto', form.email)
      payload.append('message', form.message)
      payload.append('subject', `Portfolio contact: ${form.name}`)

      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: payload })
      const result = await response.json().catch(() => null) as { success?: boolean } | null
      if (response.ok && result?.success) {
        setState('done')
        return
      }

      openEmailFallback('Web3Forms could not accept this message. Opening an email draft as a fallback.')
    } catch {
      openEmailFallback('The contact service could not be reached. Opening an email draft as a fallback.')
    }
  }

  const field = 'squircle-hit h-14 w-full border border-line-strong bg-transparent px-5 text-[15px] placeholder:text-faint transition-colors focus:border-fg focus:outline-none'
  const firstName = form.name.trim().split(/\s+/)[0] || 'there'

  return (
    <footer id="contact" className="mt-32 border-t border-line sm:mt-44">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <div>
            <Lines as="h2" className="font-display text-[clamp(48px,8vw,120px)]" lines={['Let’s make', <>something <span className="text-accent">good</span></>]} />
            <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Magnetic>
                <a href={`mailto:${site.email}`} className="squircle-hit inline-flex h-14 items-center gap-2 border border-accent bg-accent px-7 text-[16px] font-semibold text-navy-deep transition-colors hover:bg-accent-soft">
                  {site.email}
                  <ArrowUpRight className="size-4" />
                </a>
              </Magnetic>
              <p className="text-[14px] text-muted">
                {site.available ? 'Taking on projects for next quarter' : 'Fully booked at the moment'}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            {state === 'done' ? (
              <div role="status" aria-live="polite" className="squircle-hit flex h-full min-h-[320px] flex-col justify-center rounded-[24px] border border-line bg-surface-2/60 p-8 sm:p-10">
                <span className="round mb-7 inline-flex size-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                  <Check aria-hidden="true" className="size-5" strokeWidth={2.5} />
                </span>
                <p className="text-[13px] font-medium text-accent">Message sent</p>
                <h3 className="mt-3 font-display text-[clamp(34px,4vw,46px)]">Thanks, {firstName}.</h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">Your message is in my inbox. I’ll get back to you within two days.</p>
              </div>
            ) : (
              <form onSubmit={submit} aria-label="Tell me about your project" className="flex flex-col gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="sr-only" htmlFor="contact-name">Your name</label>
                  <input id="contact-name" name="name" autoComplete="name" required placeholder="Your name" className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <label className="sr-only" htmlFor="contact-email">Email</label>
                  <input id="contact-email" name="email" autoComplete="email" required type="email" placeholder="Email" className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <label className="sr-only" htmlFor="contact-message">A few words about the project</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  placeholder="A few words about the project"
                  className={`${field} h-auto min-h-[140px] resize-none py-4`}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <button type="submit" disabled={state === 'sending'} className="squircle-hit h-14 border border-accent text-[15px] font-medium transition-colors hover:bg-accent hover:text-navy-deep disabled:opacity-50">
                  {state === 'sending' ? 'Sending…' : 'Send project enquiry'}
                </button>
                {state === 'error' && (
                  <div className="text-[13px] text-accent">
                    <p>{error}</p>
                    <a href={emailDraftUrl} className="link-draw mt-2 inline-block text-fg">If your email app didn’t open, open the draft manually.</a>
                  </div>
                )}
              </form>
            )}
          </Reveal>
        </div>

        <div className="mt-24 grid gap-8 border-t border-line pt-8 text-[14px] sm:grid-cols-3">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="link-draw text-muted transition-colors hover:text-fg">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-faint sm:text-center">
            {site.location}, {time}
          </p>
          <p className="text-faint sm:text-right">© {new Date().getFullYear()} {site.name}</p>
        </div>
      </div>
    </footer>
  )
}
