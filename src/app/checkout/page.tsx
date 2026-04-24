"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
};

// IMPORTANT: defined OUTSIDE the page component so React never treats it as a
// new component on every render — which would unmount/remount the input and lose focus.
function Field({
  label,
  name,
  type = "text",
  className = "",
  value,
  onChange,
  error,
}: {
  label: string;
  name: keyof FormData;
  type?: string;
  className?: string;
  value: string;
  onChange: (name: keyof FormData, val: string) => void;
  error?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs uppercase tracking-widest text-charcoal/60 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full border rounded-sm px-4 py-2.5 text-sm text-charcoal bg-cream outline-none transition-colors focus:border-charcoal ${error ? "border-red-400" : "border-charcoal/20"}`}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
    country: "United Kingdom",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shipping = subtotal >= 150 ? 0 : 8.95;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="bg-cream min-h-screen pt-28 flex flex-col items-center justify-center gap-6">
        <p className="font-serif text-3xl text-charcoal">Your cart is empty</p>
        <Link
          href="/shop"
          className="btn-gold text-xs uppercase tracking-widest text-white px-8 py-3 rounded-sm"
        >
          Browse the Collection
        </Link>
      </div>
    );
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName) e.firstName = "Required";
    if (!form.lastName) e.lastName = "Required";
    if (!form.email || !form.email.includes("@"))
      e.email = "Valid email required";
    if (!form.address) e.address = "Required";
    if (!form.city) e.city = "Required";
    if (!form.postcode) e.postcode = "Required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    clearCart();
    router.push("/order-success");
  };

  const handleChange = (name: keyof FormData, val: string) => {
    setForm((prev) => ({ ...prev, [name]: val }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="bg-cream min-h-screen pt-28">
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="pb-8 border-b border-sand">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">
            Almost There
          </p>
          <h1 className="font-serif text-4xl text-charcoal">Checkout</h1>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h2 className="font-serif text-xl text-charcoal mb-6">
              Delivery Details
            </h2>

            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                />
                <Field
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                />
              </div>
              <Field
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Field
                label="Street Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                error={errors.address}
              />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  error={errors.city}
                />
                <Field
                  label="Postcode"
                  name="postcode"
                  value={form.postcode}
                  onChange={handleChange}
                  error={errors.postcode}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-charcoal/60 mb-1.5">
                  Country
                </label>
                <select
                  value={form.country}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, country: e.target.value }))
                  }
                  className="w-full border border-charcoal/20 rounded-sm px-4 py-2.5 text-sm text-charcoal bg-cream outline-none focus:border-charcoal"
                >
                  {[
                    "United Kingdom",
                    "United States",
                    "Canada",
                    "Australia",
                    "Germany",
                    "France",
                    "Netherlands",
                    "India",
                  ].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8 p-4 border border-sand rounded-sm bg-sand/30">
              <p className="text-xs text-muted text-center uppercase tracking-widest">
                🔒 &nbsp;Secure checkout · Payment processed safely
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-gold w-full text-center text-xs uppercase tracking-widest text-white px-6 py-4 rounded-sm mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "Placing Order…"
                : `Place Order · £${total.toFixed(2)}`}
            </button>

            <Link
              href="/cart"
              className="block text-center text-xs uppercase tracking-widest text-charcoal/50 hover:text-charcoal mt-4 transition-colors"
            >
              ← Back to Cart
            </Link>
          </div>

          {/* Order summary */}
          <div>
            <h2 className="font-serif text-xl text-charcoal mb-6">
              Your Order
            </h2>

            <div className="flex flex-col gap-4 mb-6">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 items-center"
                >
                  <div className="relative w-16 h-20 flex-shrink-0 rounded-sm overflow-hidden bg-sand">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute -top-1 -right-1 bg-charcoal text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-charcoal font-medium">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      Size: {item.size}
                    </p>
                  </div>
                  <p className="text-sm text-charcoal">
                    £{(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-sand pt-4 flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-charcoal/70">
                <span>Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-charcoal/70">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-gold">Free</span>
                  ) : (
                    `£${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="border-t border-sand pt-3 flex justify-between font-medium text-charcoal text-base">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
