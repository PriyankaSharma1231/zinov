'use client'
// src/app/admin/page.tsx
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { Users, Eye, ShoppingBag, TrendingUp, LogIn } from 'lucide-react'

type Stats = {
  totalVisitors: number
  totalSignups: number
  totalLogins: number
  totalOrders: number
  pageViews: { page: string; count: number }[]
  signupsOverTime: { date: string; count: number }[]
  visitsOverTime: { date: string; count: number }[]
  countries: { country: string; count: number }[]
  recentUsers: { id: string; email: string; name: string | null; createdAt: string }[]
}

const GOLD = '#b8943f'
const CHARCOAL = '#1a1a1a'
const PIE_COLORS = ['#b8943f', '#d4af6a', '#1a1a1a', '#6b6560', '#e8dcc8']

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    const role = (session?.user as any)?.role
    if (!session || role !== 'admin') { router.push('/login'); return }
    // fetch('/api/analytics?full=1')
    //   .then(r => r.json())
    //   .then(data => { setStats(data); setLoading(false) })
  }, [session, status])

  if (loading) return (
    <div className="min-h-screen bg-cream pt-28 flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted text-sm">Loading dashboard...</p>
      </div>
    </div>
  )

  if (!stats) return null

  const statCards = [
    { label: 'Total Visitors', value: stats.totalVisitors, icon: Eye, color: 'text-blue-500' },
    { label: 'Signups', value: stats.totalSignups, icon: Users, color: 'text-green-600' },
    { label: 'Logins', value: stats.totalLogins, icon: LogIn, color: 'text-gold' },
    { label: 'Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'text-purple-500' },
  ]

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-1">Admin</p>
          <h1 className="font-serif text-4xl text-charcoal">Analytics Dashboard</h1>
          <p className="text-muted mt-1 text-sm">Real-time overview of your ZINOV store</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {statCards.map((s) => (
            <div key={s.label} className="bg-white rounded-sm p-6 shadow-sm border border-charcoal/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-muted">{s.label}</span>
                <s.icon size={18} className={s.color} />
              </div>
              <p className="font-serif text-3xl text-charcoal">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* Visits Over Time */}
          <div className="bg-white rounded-sm p-6 shadow-sm">
            <h3 className="font-serif text-lg text-charcoal mb-1">Visitor Traffic</h3>
            <p className="text-xs text-muted mb-5">Last 30 days</p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={stats.visitsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ece3" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6b6560' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6b6560' }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: '1px solid #e8dcc8' }} />
                <Line type="monotone" dataKey="count" stroke={GOLD} strokeWidth={2} dot={false} name="Visits" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Signups Over Time */}
          <div className="bg-white rounded-sm p-6 shadow-sm">
            <h3 className="font-serif text-lg text-charcoal mb-1">New Signups</h3>
            <p className="text-xs text-muted mb-5">Last 30 days</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stats.signupsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ece3" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6b6560' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6b6560' }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: '1px solid #e8dcc8' }} />
                <Bar dataKey="count" fill={GOLD} radius={[3, 3, 0, 0]} name="Signups" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">

          {/* Page Views breakdown */}
          <div className="bg-white rounded-sm p-6 shadow-sm">
            <h3 className="font-serif text-lg text-charcoal mb-1">Page Views</h3>
            <p className="text-xs text-muted mb-5">By page</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={stats.pageViews} dataKey="count" nameKey="page" cx="50%" cy="50%" outerRadius={70} label={({ page }) => page}>
                  {stats.pageViews.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Countries */}
          <div className="bg-white rounded-sm p-6 shadow-sm">
            <h3 className="font-serif text-lg text-charcoal mb-1">Top Countries</h3>
            <p className="text-xs text-muted mb-5">Visitor origins</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats.countries} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 11, fill: '#6b6560' }} />
                <YAxis dataKey="country" type="category" tick={{ fontSize: 11, fill: '#6b6560' }} width={50} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="count" fill={CHARCOAL} radius={[0, 3, 3, 0]} name="Visitors" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick summary */}
          <div className="bg-charcoal rounded-sm p-6 text-cream flex flex-col justify-between">
            <div>
              <p className="text-gold text-xs tracking-widest uppercase mb-3">Summary</p>
              <h3 className="font-serif text-2xl mb-6">Store Health</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Conversion Rate', value: stats.totalVisitors > 0 ? ((stats.totalSignups / stats.totalVisitors) * 100).toFixed(1) + '%' : '0%' },
                { label: 'Avg. Visits/Day', value: Math.round(stats.totalVisitors / 30) },
                { label: 'Active Countries', value: stats.countries.length },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center border-b border-cream/10 pb-3">
                  <span className="text-xs text-cream/50 uppercase tracking-wider">{item.label}</span>
                  <span className="font-serif text-xl text-gold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Users Table */}
        <div className="bg-white rounded-sm shadow-sm overflow-hidden">
          <div className="p-6 border-b border-charcoal/5">
            <h3 className="font-serif text-lg text-charcoal">Recent Signups</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-charcoal/5">
                  {['Name', 'Email', 'Joined'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-xs uppercase tracking-wider text-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stats.recentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-charcoal/5 hover:bg-cream/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{user.name || '—'}</td>
                    <td className="px-6 py-4 text-muted">{user.email}</td>
                    <td className="px-6 py-4 text-muted">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
