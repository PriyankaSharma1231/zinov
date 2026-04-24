'use client'
// src/app/contact/page.tsx
import { useEffect, useState } from 'react'
import { useLang } from '@/lib/language-context'
import { Mail, MapPin, Instagram } from 'lucide-react'

export default function ContactPage() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  // useEffect(() => {
  //   fetch('/api/analytics', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ page: '/contact' }) })
  // }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div className="bg-cream min-h-screen pt-28">
      <div className="max-w-7xl mx-auto px-6 pb-24">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Say Hello</p>
          <h1 className="font-serif text-5xl text-charcoal mb-4">{t.contact.title}</h1>
          <p className="text-muted max-w-md mx-auto">{t.contact.sub}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Form */}
          <div className="bg-white p-10 rounded-sm shadow-sm">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✦</span>
                </div>
                <h3 className="font-serif text-2xl text-charcoal mb-2">Message Sent</h3>
                <p className="text-muted">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-xs uppercase tracking-wider text-charcoal/60 block mb-2">
                    {t.contact.namePlaceholder}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder={t.contact.namePlaceholder}
                    className="w-full border border-charcoal/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-charcoal/60 block mb-2">
                    {t.contact.emailPlaceholder}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder={t.contact.emailPlaceholder}
                    className="w-full border border-charcoal/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-charcoal/60 block mb-2">
                    {t.contact.messagePlaceholder}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full border border-charcoal/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm resize-none"
                  />
                </div>
                <button type="submit" className="btn-gold w-full text-white py-3.5 text-xs uppercase tracking-widest rounded-sm">
                  {t.contact.send}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-10">
            <div>
              <h3 className="font-serif text-xl text-charcoal mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-gold" /> {t.contact.ukTitle}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                London, United Kingdom<br />
                hello@zinov.com<br />
                Mon–Fri, 9am–6pm GMT
              </p>
            </div>

            <div className="w-full h-px bg-charcoal/10" />

            <div>
              <h3 className="font-serif text-xl text-charcoal mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-gold" /> {t.contact.inTitle}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Ahmedabad, Gujarat, India<br />
                india@zinov.com<br />
                Mon–Sat, 10am–7pm IST
              </p>
            </div>

            <div className="w-full h-px bg-charcoal/10" />

            <div>
              <h3 className="font-serif text-xl text-charcoal mb-4 flex items-center gap-2">
                <Instagram size={18} className="text-gold" /> Instagram
              </h3>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-gold hover:text-gold-light transition-colors text-sm">
                @zinov.official
              </a>
              <p className="text-muted text-sm mt-1">DMs welcome for wholesale enquiries</p>
            </div>

            {/* Shipping info */}
            <div className="bg-charcoal text-cream p-6 rounded-sm">
              <p className="text-gold text-xs tracking-widest uppercase mb-3">Shipping Info</p>
              <ul className="space-y-2 text-sm text-cream/70">
                <li>🇬🇧 UK — 3–5 business days</li>
                <li>🇮🇳 India — 5–7 business days</li>
                <li>🌍 International — 7–14 days</li>
                <li className="text-cream/50 text-xs pt-2">Free shipping on UK orders over £150</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
