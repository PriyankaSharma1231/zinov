'use client'
// src/app/about/page.tsx
import { useEffect } from 'react'
import Image from 'next/image'
import { useLang } from '@/lib/language-context'
import RangoliDecor from '@/components/ui/RangoliDecor'
import { CheckCircle } from 'lucide-react'

export default function AboutPage() {
  const { t, lang } = useLang()

  useEffect(() => {
    fetch('/api/analytics', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ page: '/about' }) })
  }, [])

  return (
    <div className="bg-cream min-h-screen pt-28">

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pb-20 text-center">
        <RangoliDecor size={80} className="mx-auto mb-8 opacity-40" />
        <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-6">{t.about.title}</h1>
        <p className="text-muted text-xl max-w-2xl mx-auto leading-relaxed">{t.about.sub}</p>
      </div>

      {/* Story */}
      <section className="bg-charcoal text-cream py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] relative rounded-sm overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=700&q=80" alt="Artisan" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-gold/30 rounded-sm hidden md:block" />
          </div>
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Our Story</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 leading-tight">
              From Ahmedabad to London
            </h2>
            <p className="text-cream/70 leading-relaxed mb-6">{t.about.story}</p>
            <p className="text-cream/70 leading-relaxed">
              {lang === 'hi'
                ? 'हम मानते हैं कि सच्ची लक्जरी टिकाऊपन से आती है — जो कपड़े दशकों तक चलते हैं, कारीगर समुदायों का समर्थन करते हैं, और हल्के ढंग से पहने जाते हैं।'
                : 'We believe that true luxury comes from durability — garments that last decades, support artisan communities, and are worn lightly on the earth.'}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {t.about.values.map((val) => (
                <div key={val} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-gold shrink-0" />
                  <span className="text-sm text-cream/80">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="font-serif text-3xl text-charcoal text-center mb-16">How We Work</h2>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gold/20" />
          {[
            { step: '01', title: 'Source', desc: 'We visit artisans across India — Kutch, Jaipur, Varanasi, Bengal — and select only the finest handmade fabrics.' },
            { step: '02', title: 'Design', desc: 'Our team in Ahmedabad designs minimal, clean silhouettes that honour the fabric without overwhelming it.' },
            { step: '03', title: 'Craft', desc: 'Each garment is made to order or in small runs. Nothing sits in a warehouse for years.' },
            { step: '04', title: 'Ship', desc: 'We export directly from India to our UK base in London, cutting out all middlemen to keep prices honest.' },
          ].map((item, i) => (
            <div key={item.step} className={`relative flex gap-8 mb-12 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="flex-1" />
              <div className="relative z-10 w-10 h-10 rounded-full bg-gold flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">{item.step}</span>
              </div>
              <div className="flex-1 bg-white p-6 rounded-sm shadow-sm">
                <h3 className="font-serif text-xl text-charcoal mb-2">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-charcoal mb-4">The Founders</h2>
          <p className="text-muted mb-14 max-w-md mx-auto">Two cousins, two cities, one mission.</p>
          <div className="grid md:grid-cols-2 gap-10 max-w-2xl mx-auto">
            {[
              { name: 'India Studio', city: 'Ahmedabad, Gujarat', role: 'Design & Sourcing', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
              { name: 'UK Operations', city: 'London, England', role: 'Sales & Distribution', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
            ].map((person) => (
              <div key={person.name} className="text-center">
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-4 border-gold/20">
                  <Image src={person.img} alt={person.name} width={112} height={112} className="object-cover w-full h-full" />
                </div>
                <h3 className="font-serif text-xl text-charcoal">{person.name}</h3>
                <p className="text-gold text-xs tracking-wider uppercase mt-1">{person.role}</p>
                <p className="text-muted text-sm mt-1">{person.city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
