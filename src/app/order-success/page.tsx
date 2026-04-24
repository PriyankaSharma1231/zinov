'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'

export default function OrderSuccessPage() {
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => {
    // Generate a random order number
    setOrderNumber('ZNV-' + Math.random().toString(36).substring(2, 8).toUpperCase())
  }, [])

  return (
    <div className="bg-cream min-h-screen pt-28 flex flex-col items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <CheckCircle size={64} className="text-gold" strokeWidth={1.2} />
        </div>

        {/* Heading */}
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Order Confirmed</p>
        <h1 className="font-serif text-4xl text-charcoal mb-4">Thank you for your order</h1>
        <p className="text-muted text-sm leading-relaxed mb-2">
          We've received your order and our team in India will begin preparing it with care.
        </p>
        <p className="text-muted text-sm">You'll receive a confirmation email shortly.</p>

        {/* Order number */}
        {orderNumber && (
          <div className="mt-8 inline-block border border-sand rounded-sm px-8 py-4 bg-sand/30">
            <p className="text-xs uppercase tracking-widest text-charcoal/50 mb-1">Order Number</p>
            <p className="font-serif text-xl text-charcoal">{orderNumber}</p>
          </div>
        )}

        {/* Delivery info */}
        <div className="mt-10 grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'Processing', value: '1–2 days' },
            { label: 'Dispatch', value: '3–5 days' },
            { label: 'Delivery', value: '7–10 days' },
          ].map(item => (
            <div key={item.label} className="bg-sand/40 border border-sand rounded-sm p-4">
              <p className="font-medium text-charcoal text-sm">{item.value}</p>
              <p className="text-xs text-muted mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        {/* What next */}
        <div className="mt-10 text-left border-t border-sand pt-8">
          <p className="text-xs uppercase tracking-widest text-charcoal/60 mb-4">What happens next</p>
          <div className="flex flex-col gap-4">
            {[
              { step: '01', text: 'Our team confirms and inspects your items before packing.' },
              { step: '02', text: 'Your order is carefully packaged using recycled materials.' },
              { step: '03', text: 'We ship from Jaipur and you\'ll receive a tracking link via email.' },
            ].map(item => (
              <div key={item.step} className="flex gap-4 items-start">
                <span className="text-gold font-serif text-lg leading-none">{item.step}</span>
                <p className="text-sm text-muted leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop" className="btn-gold text-xs uppercase tracking-widest text-white px-8 py-3 rounded-sm text-center">
            Continue Shopping
          </Link>
          <Link href="/" className="border border-charcoal/20 text-xs uppercase tracking-widest text-charcoal px-8 py-3 rounded-sm hover:border-charcoal transition-colors text-center">
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  )
}
