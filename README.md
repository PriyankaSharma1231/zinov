# ZINOV — Clothing Brand Website

A full-stack Next.js 14 website for ZINOV, a minimalist Indian clothing brand selling to the UK market.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + Custom CSS |
| Database | SQLite via Prisma ORM |
| Auth | NextAuth.js (credentials) |
| Charts | Recharts |
| Animations | CSS keyframes + Tailwind |
| Deployment | Vercel (recommended) |

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — Hero, Featured Products, Craft Story, Stats, Instagram CTA |
| `/shop` | Full product grid with category filter |
| `/about` | Brand story, timeline, founders |
| `/contact` | Contact form + office info |
| `/login` | Sign in page |
| `/signup` | Create account page |
| `/admin` | Analytics dashboard (admin only) |

---

## Setup (Run Locally)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
The `.env.local` file is already created. For production, change `NEXTAUTH_SECRET` to something random.

### 3. Set up the database
```bash
# Push the schema to SQLite
npm run db:push

# Seed with products, admin user, and dummy analytics
npm run db:seed
```

### 4. Run the development server
```bash
npm run dev
```

Visit http://localhost:3000

---

## Admin Dashboard

Login with:
- **Email:** admin@zinov.com
- **Password:** admin123

Then visit http://localhost:3000/admin

You'll see:
- Total visitors, signups, logins, orders
- Visitor traffic chart (30 days)
- New signups chart (30 days)
- Page views breakdown (pie chart)
- Top countries bar chart
- Recent signups table

---

## Language Support

- **English** (default) — toggle in navbar top right
- **Hindi** — all UI text, product names, descriptions translate

---

## Database Models

- `User` — customers and admins
- `UserSession` — login tracking
- `PageView` — visitor analytics
- `Product` — clothing products
- `Order` + `OrderItem` — orders

---

## Deployment to Vercel

1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard
4. For production, switch `DATABASE_URL` to PostgreSQL (PlanetScale, Neon, or Supabase — all free tiers available)
5. Deploy

---

## Connecting to Shopify (Future)

When ready, install the Shopify Storefront API:
```bash
npm install @shopify/storefront-api-client
```

Then replace the static product arrays with live Shopify data, keeping all analytics and auth in your own database.

---

## Instagram Marketing Tips

- Post Reels 3x/week minimum
- Hashtags: #MinimalistFashion #LondonStyle #EthicalFashion #IndianCraft #SlowFashion
- DM 10 UK micro-influencers (5k–50k followers) per week for gifting
- Tag location: London, UK on every post

---

Built with ❤️ — Crafted in India. Worn in London.
