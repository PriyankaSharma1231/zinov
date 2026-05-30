"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { allProducts } from "@/lib/products";
import { useLang } from "@/lib/language-context";

const categories = [
  "All",
  ...Array.from(new Set(allProducts.map((p) => p.category))),
];

export default function ShopPage() {
  const { lang } = useLang();
  const { addToCart } = useCart();
  const [active, setActive] = useState("All");
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "/shop" }),
    });
  }, []);

  const filtered =
    active === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === active);

  const handleQuickAdd = (
    e: React.MouseEvent,
    product: (typeof allProducts)[0],
  ) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...product, img: product.file, size: "M", qty: 1 });
    setToast(`${product.name} added ✦`);
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="bg-cream min-h-screen pt-28">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-charcoal text-cream text-sm px-6 py-3 rounded-sm z-50 shadow-lg">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pb-10 border-b border-sand">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">
          ZINOV Store
        </p>
        <h1 className="font-serif text-5xl text-charcoal mb-3">
          The Collection
        </h1>
        {/* <p className="text-muted text-sm">
          Timeless pieces · Handmade in India · Delivered to the UK
        </p> */}

        {/* Category Filter */}
        <div className="flex gap-2 mt-6 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-xs uppercase tracking-widest px-5 py-2 rounded-sm transition-all ${
                active === cat
                  ? "bg-charcoal text-cream"
                  : "border border-charcoal/20 text-charcoal/60 hover:border-charcoal hover:text-charcoal"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <Link
              href={`/shop/${product.id}`}
              key={product.id}
              className="product-card group block"
            >
              <div className="relative overflow-hidden rounded-sm aspect-[3/4] bg-sand">
                <Image
                  src={product.file}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors" />

                {/* Quick add on hover */}
                <button
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="absolute bottom-0 inset-x-0 py-3 text-xs uppercase tracking-widest bg-cream text-charcoal translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2"
                >
                  + Quick Add (M)
                </button>

                <div className="absolute top-3 left-3">
                  <span className="bg-gold text-white text-xs px-2 py-1 tracking-wider">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <h3 className="font-serif text-base text-charcoal">
                  {lang === "hi" ? product.nameHi : product.name}
                </h3>
                <p className="text-xs text-muted mt-1 line-clamp-1">
                  {lang === "hi" ? product.descriptionHi : product.description}
                </p>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-charcoal">
                    ₹{product.price.toFixed(2)}
                  </p>
                  {product.originalPrice && (
                    <p className="text-xs text-muted line-through">
                      ₹{product.originalPrice.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
