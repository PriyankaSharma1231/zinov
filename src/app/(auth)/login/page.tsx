'use client'
// src/app/(auth)/login/page.tsx
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import RangoliDecor from '@/components/ui/RangoliDecor'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', { ...form, redirect: false })
    setLoading(false)
    if (res?.error) {
      setError('Invalid email or password')
    } else {
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <RangoliDecor size={60} className="mx-auto mb-5 opacity-30" />
          <h1 className="font-serif text-4xl text-charcoal">Welcome Back</h1>
          <p className="text-muted mt-2">Sign in to your ZINOV account</p>
        </div>

        <div className="bg-white p-10 rounded-sm shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal/60 block mb-2">Email</label>
              <input
                type="email" required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full border border-charcoal/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold rounded-sm"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal/60 block mb-2">Password</label>
              <input
                type="password" required
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full border border-charcoal/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold rounded-sm"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full text-white py-3.5 text-xs uppercase tracking-widest rounded-sm disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            No account?{' '}
            <Link href="/signup" className="text-gold hover:underline">Sign up</Link>
          </p>
        </div>

        <p className="text-center text-xs text-muted mt-6">
          Admin demo: admin@zinov.com / admin123
        </p>
      </div>
    </div>
  )
}
