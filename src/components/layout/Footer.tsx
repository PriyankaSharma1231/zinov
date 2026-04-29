'use client'
// src/components/layout/Footer.tsx
import Link from 'next/link'
import { useLang } from '@/lib/language-context'
import { Instagram, Mail } from 'lucide-react'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="bg-charcoal text-cream/80">
      {/* Decorative rangoli strip */}
      <div className="border-t border-gold/30 py-3 overflow-hidden">
        <div className="marquee-inner">
          {Array(12).fill('✦  ZINOV  ✦  INDIA TO LONDON  ✦  HANDCRAFTED  ✦  ETHICAL  ✦').map((t, i) => (
            <span key={i} className="text-xs tracking-widest text-gold/50 mx-4">{t}</span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <h3 className="font-serif text-3xl font-bold text-cream mb-4">ZINOV</h3>
          <p className="text-sm text-cream/50 leading-relaxed max-w-xs">{t.footer.tagline}</p>
          <div className="flex gap-4 mt-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 border border-cream/20 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
              <Instagram size={16} />
            </a>
            <a href="mailto:zinovorders@gmail.com"
              className="w-10 h-10 border border-cream/20 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-gold mb-5">Navigate</h4>
          <ul className="space-y-3 text-sm text-cream/50">
            {[['/', t.nav.home], ['/shop', t.nav.shop], ['/about', t.nav.about], ['/contact', t.nav.contact]].map(([href, label]) => (
              <li key={href}><Link href={href} className="hover:text-cream transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-gold mb-5">Info</h4>
          <ul className="space-y-3 text-sm text-cream/50">
            <li>🇬🇧 Leicester, UK</li>
            <li>🇮🇳 Anand, India</li>
            <li>zinovorders@gmail.com</li>
            {/* <li className="pt-2 text-xs">Free shipping to UK over £150</li> */}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/30">
        {t.footer.rights}
      </div>
    </footer>
  )
}
