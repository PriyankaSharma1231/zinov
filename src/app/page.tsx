"use client";
// src/app/page.tsx
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/language-context";
import RangoliDecor from "@/components/ui/RangoliDecor";

const featured = [
  {
    id: "8",
    name: "Rust Geometric Appliqué Kurta Set",
    nameHi: "रस्ट जियोमेट्रिक अप्लिक कुर्ता सेट",
    price: 1998,
    image: "/products/product_8.jpeg",
    category: "Coord Sets",
  },
  {
    id: "9",
    name: "Blush Tulip Sleeveless Coord ",
    nameHi: "ब्लश ट्यूलिप स्लीवलेस को-ऑर्ड",
    price: 1598,
    image: "/products/product_9.png",
    category: "Kurta Sets",
  },
  {
    id: "1",
    name: "Ivory Black Abstract Wave Coord",
    nameHi: "आइवरी ब्लैक एब्स्ट्रैक्ट वेव को-ऑर्ड",
    price: 1998,
    image: "/products/product_1.png",
    category: "Coord Sets",
  },
];

export default function HomePage() {
  const { t, lang } = useLang();

  useEffect(() => {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "/" }),
    });
  }, []);

  return (
    <div className="bg-cream min-h-screen">
      {/* HERO */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/products/product_4.png"
            alt="ZINOV Hero"
            fill
            className="object-cover object-top pt-[56px] md:pt-[70px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/80" />
        </div>

        <div className="absolute top-24 right-12 opacity-20">
          <RangoliDecor size={180} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 w-full">
          <div className="max-w-2xl">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 animate-fade-up">
              {t.home.newCollection} — 2024
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-cream leading-tight mb-6 animate-fade-up delay-100">
              {t.hero.tagline}
            </h1>
            <p className="text-cream/70 text-lg mb-10 animate-fade-up delay-200">
              {t.hero.sub}
            </p>
            <div className="flex gap-4 flex-wrap animate-fade-up delay-300">
              <Link
                href="/shop"
                className="btn-gold text-white px-8 py-3.5 text-sm tracking-widest uppercase rounded-sm"
              >
                {t.hero.cta}
              </Link>
              <Link
                href="/about"
                className="border border-cream/50 text-cream px-8 py-3.5 text-sm tracking-widest uppercase rounded-sm hover:bg-cream/10 transition-colors"
              >
                {t.hero.cta2}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-cream text-xs tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-cream/50 animate-pulse" />
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="bg-charcoal py-4 overflow-hidden border-y border-gold/20">
        <div className="marquee-inner">
          {Array(10)
            .fill(
              "✦  HANDCRAFTED IN INDIA ✦  COTTON FLAX  ✦  ETHICAL FASHION  ✦  ARTISAN MADE  ✦",
            )
            .map((item, i) => (
              <span
                key={i}
                className="text-xs tracking-[0.2em] text-gold/60 mx-6"
              >
                {item}
              </span>
            ))}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
            Curated for you
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
            {t.home.featuredTitle}
          </h2>
          <p className="text-muted mt-4 max-w-md mx-auto">
            {t.home.featuredSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((product) => (
            <Link
              href={`/shop/${product.id}`}
              key={product.id}
              className="product-card group cursor-pointer block"
            >
              <div className="relative overflow-hidden rounded-sm bg-sand aspect-[3/4]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    50% OFF
                  </span>
                </div>
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="block w-full bg-cream text-charcoal text-xs uppercase tracking-widest py-3 text-center rounded-sm">
                    {t.shop.viewDetails}
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-gold text-white text-xs px-2 py-1 tracking-wider">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-400 line-through text-sm">
                  ₹{product.price}
                </p>
                <p className="text-gold font-bold text-lg">
                  ₹{Math.round(product.price * 0.5)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/shop"
            className="border border-charcoal/30 text-charcoal text-xs uppercase tracking-widest px-10 py-4 hover:bg-charcoal hover:text-cream transition-colors rounded-sm inline-block"
          >
            View All 10 Pieces
          </Link>
        </div>
      </section>
      <div className="bg-gold py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-center">
          <span className="font-serif text-3xl md:text-4xl font-bold text-white tracking-wide">
            🎉 50% OFF
          </span>
          <span className="hidden md:block w-px h-8 bg-white/30" />
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            {/* <span className="text-white text-sm md:text-base tracking-widest uppercase font-medium">
              Use coupon code at checkout
            </span>
            <span className="bg-white text-gold font-bold text-xl md:text-2xl px-5 py-1.5 rounded-sm tracking-[0.2em] border-2 border-white/30">
              ZINOV50
            </span> */}
          </div>
          <span className="hidden md:block w-px h-8 bg-white/30" />
          <span className="text-white/80 text-xs tracking-widest uppercase">
            Limited Time Offer
          </span>
        </div>
      </div>
      {/* NEW ARRIVALS GRID - shows 4 more products */}
      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
              New In
            </p>
            <h2 className="font-serif text-3xl text-charcoal">
              The Full Collection
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                id: "5",
                file: "product_5.png",
                name: "Teal Ajrakh 3-Piece",
                price: 1998,
              },
              {
                id: "6",
                file: "product_6.png",
                name: "Black Paisley Coord",
                price: 2198,
              },
              {
                id: "7",
                file: "product_7.png",
                name: "Teal Embroidered Set",
                price: 1998,
              },
              {
                id: "10",
                file: "product_10.png",
                name: "Rust Appliqué Set",
                price: 1998,
              },
            ].map((p) => (
              <Link href={`/shop/${p.id}`} key={p.id} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-cream">
                  <Image
                    src={`/products/${p.file}`}
                    alt={p.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="mt-1">
                  <p className="text-xs text-gray-400 line-through">
                    ₹{p.price}
                  </p>
                  <p className="text-gold font-bold">
                    ₹{Math.round(p.price * 0.5)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CRAFT STORY SECTION */}
      <section className="bg-charcoal text-cream py-24 px-6 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5">
          <RangoliDecor size={400} color="#b8943f" />
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">
              Our Philosophy
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6">
              {t.home.craftTitle}
            </h2>
            <p className="text-cream/60 text-lg leading-relaxed">
              {t.home.craftSub}
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                "100% Cotton Flax",
                "Alwar, Rajasthan",
                "Ethical Sourcing",
                "UK Delivered",
              ].map((item) => (
                <div key={item} className="border-l-2 border-gold pl-4">
                  <p className="text-sm text-cream/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
            <Image
              src="/products/product_2.png"
              alt="ZINOV craft"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 border border-gold/20" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-cream py-16 border-t border-sand">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "10", label: "Designs" },
            { num: "5", label: "Sizes Available" },
            { num: "100%", label: "Cotton Flax" },
            // { num: "🇬🇧", label: "UK Delivered" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-4xl font-bold text-gold">
                {stat.num}
              </p>
              <p className="text-xs uppercase tracking-widest text-muted mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INSTAGRAM CTA */}
      <section className="py-20 px-6 text-center bg-sand">
        <RangoliDecor size={60} className="mx-auto mb-6 opacity-30" />
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
          {t.home.instagramTitle}
        </h2>
        <p className="text-muted mb-8">{t.home.instagramSub}</p>

        <a
          href="https://www.instagram.com/zin.0v?igsh=dGw2c21oN3ptdTh6&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold text-white px-8 py-3.5 text-sm tracking-widest uppercase rounded-sm inline-block"
        >
          @zin.0v
        </a>
      </section>
    </div>
  );
}
