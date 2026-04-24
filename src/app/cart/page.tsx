'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { Trash2, Minus, Plus } from 'lucide-react'

export default function CartPage() {
  const { cart, removeFromCart, updateQty, subtotal, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="bg-cream min-h-screen pt-28 flex flex-col items-center justify-center gap-6">
        <p className="font-serif text-4xl text-charcoal">Your bag is empty</p>
        <p className="text-muted text-sm">Looks like you haven't added anything yet.</p>
        <Link href="/shop" className="btn-gold text-xs uppercase tracking-widest text-white px-8 py-3 rounded-sm mt-2">
          Browse the Collection
        </Link>
      </div>
    )
  }

  const shipping = subtotal >= 150 ? 0 : 8.95
  const total = subtotal + shipping

  return (
    <div className="bg-cream min-h-screen pt-28">
      <div className="max-w-6xl mx-auto px-6 pb-20">

        {/* Header */}
        <div className="pb-8 border-b border-sand">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">Your Bag</p>
          <h1 className="font-serif text-4xl text-charcoal">Shopping Cart</h1>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cart.map(item => (
              <div key={`${item.id}-${item.size}`} className="flex gap-5 pb-6 border-b border-sand">
                <div className="relative w-24 h-32 flex-shrink-0 rounded-sm overflow-hidden bg-sand">
                  <Image src={item.img} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-base text-charcoal">{item.name}</h3>
                      <p className="text-xs text-muted mt-1 uppercase tracking-wider">Size: {item.size}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-charcoal/30 hover:text-charcoal transition-colors p-1"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty controls */}
                    <div className="flex items-center border border-charcoal/20 rounded-sm">
                      <button
                        onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                        className="px-3 py-1.5 text-charcoal/60 hover:text-charcoal transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-sm text-charcoal font-medium">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                        className="px-3 py-1.5 text-charcoal/60 hover:text-charcoal transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <p className="font-medium text-charcoal">£{(item.price * item.qty).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={clearCart} className="self-start text-xs text-muted uppercase tracking-widest underline underline-offset-4 hover:text-charcoal transition-colors mt-2">
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-sand/40 border border-sand rounded-sm p-6 sticky top-28">
              <h2 className="font-serif text-xl text-charcoal mb-6">Order Summary</h2>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between text-charcoal/70">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-charcoal/70">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-gold">Free</span> : `£${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted">Free shipping on orders over £150</p>
                )}
                <div className="border-t border-sand pt-3 flex justify-between font-medium text-charcoal text-base">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn-gold block text-center text-xs uppercase tracking-widest text-white px-6 py-4 rounded-sm mt-8">
                Proceed to Checkout
              </Link>

              <Link href="/shop" className="block text-center text-xs uppercase tracking-widest text-charcoal/50 hover:text-charcoal mt-4 transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
