"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useLang } from "@/lib/language-context";
import { allProducts } from "@/lib/products";
import { ArrowLeft, Check } from "lucide-react";

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function ProductDetailPage() {
  const { id } = useParams();
  const { lang } = useLang();
  const { addToCart } = useCart();
  const router = useRouter();

  const product = allProducts.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    return (
      <div className="bg-cream min-h-screen pt-28 flex flex-col items-center justify-center gap-4">
        <p className="font-serif text-3xl text-charcoal">Product not found</p>
        <Link href="/shop" className="text-sm text-muted underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      img: `/products/${product.file}`,
      size: selectedSize,
      qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      img: `/products/${product.file}`,
      size: selectedSize,
      qty,
    });
    router.push("/checkout");
  };

  const related = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="bg-cream min-h-screen pt-28">
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted mb-8">
          <Link href="/" className="hover:text-charcoal transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-charcoal transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-charcoal truncate max-w-[200px]">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-sand">
            <Image
              src={`${product.file}`}
              alt={product.name}
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute top-4 left-4">
              <span className="bg-gold text-white text-xs px-3 py-1 tracking-wider uppercase">
                {product.category}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">
              ZINOV · {product.vibe}
            </p>

            <h1 className="font-serif text-4xl text-charcoal mb-3 leading-tight">
              {lang === "hi" ? product.nameHi : product.name}
            </h1>

            <p className="text-muted text-sm leading-relaxed mb-5">
              {lang === "hi" ? product.descriptionHi : product.description}
            </p>

            {/* Price */}
            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-3xl font-medium text-charcoal">
                ₹{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted line-through">
                    ₹{product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100,
                    )}
                    % OFF
                  </span>
                </>
              )}
            </div>

            <div className="h-px bg-sand mb-6" />

            {/* Size selector */}
            {/* Size selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-widest text-charcoal/70">
                  Select Size
                </p>

                {sizeError && (
                  <p className="text-xs text-red-500">
                    Please select a size to continue
                  </p>
                )}
              </div>

              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => {
                  const isAvailable = product.availableSizes.includes(size);

                  return (
                    <button
                      key={size}
                      disabled={!isAvailable}
                      onClick={() => {
                        if (!isAvailable) return;

                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      className={`w-12 h-12 text-sm border rounded-sm transition-all relative
            ${
              selectedSize === size
                ? "bg-charcoal text-white border-charcoal"
                : isAvailable
                  ? "border-charcoal/20 text-charcoal hover:border-charcoal"
                  : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {product.availableSizes.length === 1 && (
                <p className="mt-3 text-red-600 text-sm font-medium">
                  ⚠️ Only Size {product.availableSizes[0]} Available
                </p>
              )}

              <p className="text-xs text-muted mt-2">
                Indian sizing — size up if you are between sizes.
              </p>
            </div>
            {/* Quantity */}
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-charcoal/70 mb-3">
                Quantity
              </p>
              <div className="flex items-center border border-charcoal/20 rounded-sm w-fit">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-2.5 text-charcoal/60 hover:text-charcoal transition-colors text-lg"
                >
                  −
                </button>
                <span className="px-5 py-2.5 text-sm text-charcoal font-medium border-x border-charcoal/20">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  className="px-4 py-2.5 text-charcoal/60 hover:text-charcoal transition-colors text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex items-center justify-center gap-3 w-full py-4 text-xs uppercase tracking-widest rounded-sm transition-all ${
                  added
                    ? "bg-green-700 text-white"
                    : "border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-cream"
                }`}
              >
                {added ? (
                  <>
                    <Check size={15} /> Added to Bag
                  </>
                ) : (
                  "Add to Bag"
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="btn-gold w-full py-4 text-xs uppercase tracking-widest rounded-sm text-white"
              >
                Buy Now
              </button>
            </div>

            {added && (
              <button
                onClick={() => router.push("/cart")}
                className="mt-3 w-full py-3 text-xs uppercase tracking-widest border border-charcoal/30 rounded-sm text-muted hover:border-charcoal hover:text-charcoal transition-colors"
              >
                View Cart & Checkout →
              </button>
            )}

            <div className="h-px bg-sand my-6" />

            {/* Product details */}
            <div className="mb-5">
              <p className="text-xs uppercase tracking-widest text-charcoal/70 mb-3">
                Product Details
              </p>
              <p className="text-sm text-muted leading-relaxed">
                {product.details}
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-2 mb-6">
              {product.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-sm text-muted border-b border-sand pb-2"
                >
                  <span className="text-gold text-xs flex-shrink-0">✦</span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Assurances */}
            <div className="space-y-2 mb-5">
              {[
                "Free returns within 30 days",
                "100% Cotton Flax · Ethically made in India",
                "Delivered in 3–5 working days",
              ].map((item) => (
                <p
                  key={item}
                  className="text-xs text-muted flex items-center gap-2"
                >
                  <Check size={12} className="text-gold flex-shrink-0" /> {item}
                </p>
              ))}
            </div>

            {/* Info strip */}
            <div className="bg-sand rounded-sm p-4 text-xs text-muted leading-relaxed">
              🇮🇳 Handmade in India &nbsp;·&nbsp; 📦 Free returns 30 days
              &nbsp;·&nbsp; 🌿 100% Cotton Flax
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-sand">
            <h2 className="font-serif text-2xl text-charcoal mb-8">
              You might also like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link href={`/shop/${p.id}`} key={p.id} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-sand">
                    <Image
                      src={`${p.file}`}
                      alt={p.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-gold tracking-wider uppercase">
                      {p.category}
                    </p>
                    <h3 className="font-serif text-sm text-charcoal mt-0.5">
                      {p.name}
                    </h3>
                    <p className="text-sm text-charcoal/70 mt-1">
                      ₹{p.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
