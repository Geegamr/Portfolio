import { Hono } from 'hono'

type Env = {
  ASSETS: Fetcher
  RESEND_API_KEY?: string
  CONTACT_FROM_EMAIL?: string
}

const app = new Hono<{ Bindings: Env }>()

app.get('/api/health', (c) => c.json({ ok: true }))

app.post('/api/contact', async (c) => {
  const body = await c.req.json<{ name?: string; email?: string; message?: string }>().catch(() => null)
  if (!body) return c.json({ error: 'Send the form as valid JSON.' }, 400)

  const name = body.name?.trim()
  const email = body.email?.trim()
  const message = body.message?.trim()
  if (!name || name.length > 120) return c.json({ error: 'Enter your name (up to 120 characters).' }, 400)
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return c.json({ error: 'Enter a valid email address.' }, 400)
  if (!message) return c.json({ error: 'Write a few words about the project.' }, 400)
  if (message.length > 10000) return c.json({ error: 'Keep your message under 10,000 characters.' }, 400)

  const apiKey = c.env.RESEND_API_KEY
  const from = c.env.CONTACT_FROM_EMAIL?.trim() || 'Gee | Portfolio <onboarding@resend.dev>'
  if (!apiKey) return c.json({ error: 'Email delivery is not configured yet. Please email geegamr@gmail.com directly.' }, 503)

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: ['geegamr@gmail.com'],
      reply_to: email,
      subject: `Portfolio contact: ${name}`,
      text: [`New message from ${name} (${email}):`, '', message].join('\\n'),
    }),
  }).catch(() => null)

  if (!response) return c.json({ error: 'Email delivery failed. Please try again or email geegamr@gmail.com directly.' }, 502)
  if (!response.ok) {
    console.error('Resend rejected contact email', response.status)
    return c.json({ error: 'Email delivery failed. Please try again or email geegamr@gmail.com directly.' }, 502)
  }

  return c.json({ ok: true })
})

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
