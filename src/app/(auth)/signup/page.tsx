'use client'
// src/app/(auth)/signup/page.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import RangoliDecor from '@/components/ui/RangoliDecor'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) {
      setError(data.error || 'Signup failed')
    } else {
      router.push('/login?registered=1')
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <RangoliDecor size={60} className="mx-auto mb-5 opacity-30" />
          <h1 className="font-serif text-4xl text-charcoal">Join ZINOV</h1>
          <p className="text-muted mt-2">Create your account — it's free</p>
        </div>

        <div className="bg-white p-10 rounded-sm shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal/60 block mb-2">Full Name</label>
              <input
                type="text" required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full border border-charcoal/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold rounded-sm"
              />
            </div>
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
                type="password" required minLength={6}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="Min. 6 characters"
                className="w-full border border-charcoal/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold rounded-sm"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full text-white py-3.5 text-xs uppercase tracking-widest rounded-sm disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            Have an account?{' '}
            <Link href="/login" className="text-gold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
