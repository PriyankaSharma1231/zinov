// src/app/api/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { page } = await req.json()
  await prisma.pageView.create({ data: { page: page || '/' } })
  return NextResponse.json({ ok: true })
}

export async function GET(req: NextRequest) {
  const full = req.nextUrl.searchParams.get('full')

  if (!full) {
    const count = await prisma.pageView.count()
    return NextResponse.json({ count })
  }

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  const [totalVisitors, totalSignups, totalLogins, totalOrders, pageViewsRaw, allVisits, allSignups, countriesRaw, recentUsers] =
    await Promise.all([
      prisma.pageView.count(),
      prisma.user.count({ where: { role: 'customer' } }),
      prisma.userSession.count(),
      prisma.order.count(),
      prisma.pageView.groupBy({ by: ['page'], _count: { page: true } }),
      prisma.pageView.findMany({ where: { createdAt: { gte: thirtyDaysAgo } }, select: { createdAt: true } }),
      prisma.user.findMany({ where: { createdAt: { gte: thirtyDaysAgo }, role: 'customer' }, select: { createdAt: true } }),
      prisma.pageView.groupBy({ by: ['country'], _count: { country: true }, where: { country: { not: null } } }),
      prisma.user.findMany({ where: { role: 'customer' }, orderBy: { createdAt: 'desc' }, take: 10, select: { id: true, email: true, name: true, createdAt: true } }),
    ])

  // Build daily buckets for last 30 days
  const dayBuckets: Record<string, number> = {}
  const signupBuckets: Record<string, number> = {}
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    const key = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
    dayBuckets[key] = 0
    signupBuckets[key] = 0
  }
  allVisits.forEach(v => {
    const key = new Date(v.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
    if (dayBuckets[key] !== undefined) dayBuckets[key]++
  })
  allSignups.forEach(s => {
    const key = new Date(s.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
    if (signupBuckets[key] !== undefined) signupBuckets[key]++
  })

  return NextResponse.json({
    totalVisitors,
    totalSignups,
    totalLogins,
    totalOrders,
    pageViews: pageViewsRaw.map(p => ({ page: p.page, count: p._count.page })),
    visitsOverTime: Object.entries(dayBuckets).map(([date, count]) => ({ date, count })),
    signupsOverTime: Object.entries(signupBuckets).map(([date, count]) => ({ date, count })),
    countries: countriesRaw.map(c => ({ country: c.country || 'Unknown', count: c._count.country })),
    recentUsers,
  })
}
