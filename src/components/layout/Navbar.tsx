'use client'
// src/components/layout/Navbar.tsx
// ── REPLACE your existing Navbar.tsx with this ──
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useLang } from '@/lib/language-context'
import { useCart } from '@/lib/cart-context'
import { Menu, X, ShoppingBag } from 'lucide-react'

export default function Navbar() {
  const { t, lang, setLang } = useLang()
  const { data: session } = useSession()
  const { cartCount } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const role = (session?.user as any)?.role

  return (
   <nav className="fixed max-w-7xl top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm shadow-sm py-3 md:h-[70px] flex w-100 items-center">
      <div className=" mx-auto px-6 flex items-center justify-between w-100">

        {/* Logo */}
        <Link href="/" className="font-serif text-2xl font-bold tracking-widest text-charcoal">ZINOV</Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: '/', label: t.nav.home },
            { href: '/shop', label: t.nav.shop },
            { href: '/about', label: t.nav.about },
            { href: '/contact', label: t.nav.contact },
          ].map(item => (
            <Link key={item.href} href={item.href} className="text-sm tracking-wider uppercase text-charcoal/70 hover:text-gold transition-colors">
              {item.label}
            </Link>
          ))}
          {role === 'admin' && (
            <Link href="/admin" className="text-sm tracking-wider uppercase text-gold font-medium">{t.nav.admin}</Link>
          )}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Toggle */}
          <div className="flex items-center border border-charcoal/20 rounded-full overflow-hidden text-xs">
            <button onClick={() => setLang('en')} className={`px-3 py-1 transition-colors ${lang === 'en' ? 'bg-charcoal text-cream' : 'text-charcoal/60 hover:text-charcoal'}`}>EN</button>
            <button onClick={() => setLang('hi')} className={`px-3 py-1 transition-colors ${lang === 'hi' ? 'bg-charcoal text-cream' : 'text-charcoal/60 hover:text-charcoal'}`}>हि</button>
          </div>

          {/* Cart */}
          <Link href="/cart" className="relative flex items-center gap-2 text-xs uppercase tracking-wider border border-charcoal/20 px-3 py-2 rounded-sm hover:border-charcoal transition-colors">
            <ShoppingBag size={15} />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </Link>

          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-charcoal/60">{session.user?.name || session.user?.email}</span>
              <button onClick={() => signOut()} className="text-xs uppercase tracking-wider border border-charcoal/30 px-3 py-1.5 rounded hover:bg-charcoal hover:text-cream transition-colors">
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="text-xs uppercase tracking-wider text-charcoal/70 hover:text-charcoal">{t.nav.login}</Link>
              <Link href="/signup" className="btn-gold text-xs uppercase tracking-wider text-white px-4 py-2 rounded-sm">{t.nav.signup}</Link>
            </div>
          )}
        </div>

        {/* Mobile right */}
        <div className="flex md:hidden items-center gap-3">
          <Link href="/cart" className="relative">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-charcoal/10 px-6 py-6 flex flex-col gap-4">
          {[
            { href: '/', label: t.nav.home },
            { href: '/shop', label: t.nav.shop },
            { href: '/about', label: t.nav.about },
            { href: '/contact', label: t.nav.contact },
          ].map(item => (
            <Link key={item.href} href={item.href} className="text-sm tracking-wider uppercase" onClick={() => setMenuOpen(false)}>{item.label}</Link>
          ))}
          <div className="flex gap-2 pt-2">
            <button onClick={() => setLang('en')} className={`px-3 py-1 text-xs border rounded-full ${lang === 'en' ? 'bg-charcoal text-cream border-charcoal' : 'border-charcoal/30'}`}>EN</button>
            <button onClick={() => setLang('hi')} className={`px-3 py-1 text-xs border rounded-full ${lang === 'hi' ? 'bg-charcoal text-cream border-charcoal' : 'border-charcoal/30'}`}>हि</button>
          </div>
          {!session && (
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="text-sm" onClick={() => setMenuOpen(false)}>{t.nav.login}</Link>
              <Link href="/signup" className="btn-gold text-xs text-white px-4 py-2 rounded-sm" onClick={() => setMenuOpen(false)}>{t.nav.signup}</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
