'use client'
// src/lib/cart-context.tsx
import { createContext, useContext, useState, ReactNode } from 'react'

export type CartItem = {
  id: string
  name: string
  price: number
  img: string
  size: string
  qty: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string, size: string) => void
  updateQty: (id: string, size: string, qty: number) => void
  clearCart: () => void
  cartCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType>({
  cart: [], addToCart: () => {}, removeFromCart: () => {},
  updateQty: () => {}, clearCart: () => {}, cartCount: 0, subtotal: 0,
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id && i.size === item.size)
      if (exists) {
        return prev.map(i =>
          i.id === item.id && i.size === item.size
            ? { ...i, qty: Math.min(10, i.qty + item.qty) }
            : i
        )
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (id: string, size: string) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.size === size)))
  }

  const updateQty = (id: string, size: string, qty: number) => {
    if (qty < 1) { removeFromCart(id, size); return }
    setCart(prev => prev.map(i => i.id === id && i.size === size ? { ...i, qty: Math.min(10, qty) } : i))
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
