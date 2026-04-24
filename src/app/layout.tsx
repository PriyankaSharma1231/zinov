// src/app/layout.tsx
// ── REPLACE your existing layout.tsx with this ──
import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from '@/lib/language-context'
import { CartProvider } from '@/lib/cart-context'
import { SessionProviderWrapper } from '@/components/layout/SessionProviderWrapper'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'ZINOV — Crafted in India. Worn in London.',
  description: 'Minimalist essentials rooted in Indian craft tradition. Handmade, ethical, and timeless.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <LangProvider>
            <CartProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </CartProvider>
          </LangProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
