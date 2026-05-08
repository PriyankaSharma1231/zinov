// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { useCart } from "@/lib/cart-context";

// type FormData = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   address: string;
//   city: string;
//   postcode: string;
//   country: string;
// };

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// // IMPORTANT: defined OUTSIDE the page component so React never treats it as a
// // new component on every render — which would unmount/remount the input and lose focus.
// function Field({
//   label,
//   name,
//   type = "text",
//   className = "",
//   value,
//   onChange,
//   error,
// }: {
//   label: string;
//   name: keyof FormData;
//   type?: string;
//   className?: string;
//   value: string;
//   onChange: (name: keyof FormData, val: string) => void;
//   error?: string;
// }) {
//   return (
//     <div className={className}>
//       <label className="block text-xs uppercase tracking-widest text-charcoal/60 mb-1.5">
//         {label}
//       </label>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(name, e.target.value)}
//         className={`w-full border rounded-sm px-4 py-2.5 text-sm text-charcoal bg-cream outline-none transition-colors focus:border-charcoal ${error ? "border-red-400" : "border-charcoal/20"}`}
//       />
//       {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
//     </div>
//   );
// }

// export default function CheckoutPage() {
//   const { cart, subtotal, clearCart } = useCart();
//   const router = useRouter();

//   const [form, setForm] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     address: "",
//     city: "",
//     postcode: "",
//     country: "United Kingdom",
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const shipping = subtotal >= 150 ? 0 : 8.95;
//   const total = subtotal + shipping;

//   if (cart.length === 0) {
//     return (
//       <div className="bg-cream min-h-screen pt-28 flex flex-col items-center justify-center gap-6">
//         <p className="font-serif text-3xl text-charcoal">Your cart is empty</p>
//         <Link
//           href="/shop"
//           className="btn-gold text-xs uppercase tracking-widest text-white px-8 py-3 rounded-sm"
//         >
//           Browse the Collection
//         </Link>
//       </div>
//     );
//   }

//   const validate = () => {
//     const e: Record<string, string> = {};
//     if (!form.firstName) e.firstName = "Required";
//     if (!form.lastName) e.lastName = "Required";
//     if (!form.email || !form.email.includes("@"))
//       e.email = "Valid email required";
//     if (!form.address) e.address = "Required";
//     if (!form.city) e.city = "Required";
//     if (!form.postcode) e.postcode = "Required";
//     return e;
//   };

//   const handleSubmit = async () => {
//     const e = validate();
//     if (Object.keys(e).length > 0) {
//       setErrors(e);
//       return;
//     }
//     setLoading(true);
//     await new Promise((r) => setTimeout(r, 1200));
//     clearCart();
//     router.push("/order-success");
//   };

//   const handleChange = (name: keyof FormData, val: string) => {
//     setForm((prev) => ({ ...prev, [name]: val }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };
// const loadRazorpay = () => {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => {
//       resolve(true);
//     };
//     script.onerror = () => {
//       resolve(false);
//     };
//     document.body.appendChild(script);
//   });
// };

//   return (
//     <div className="bg-cream min-h-screen pt-28">
//       <div className="max-w-6xl mx-auto px-6 pb-20">
//         <div className="pb-8 border-b border-sand">
//           <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">
//             Almost There
//           </p>
//           <h1 className="font-serif text-4xl text-charcoal">Checkout</h1>
//         </div>

//         <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
//           {/* Form */}
//           <div>
//             <h2 className="font-serif text-xl text-charcoal mb-6">
//               Delivery Details
//             </h2>

//             <div className="flex flex-col gap-5">
//               <div className="grid grid-cols-2 gap-4">
//                 <Field
//                   label="First Name"
//                   name="firstName"
//                   value={form.firstName}
//                   onChange={handleChange}
//                   error={errors.firstName}
//                 />
//                 <Field
//                   label="Last Name"
//                   name="lastName"
//                   value={form.lastName}
//                   onChange={handleChange}
//                   error={errors.lastName}
//                 />
//               </div>
//               <Field
//                 label="Email Address"
//                 name="email"
//                 type="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 error={errors.email}
//               />
//               <Field
//                 label="Street Address"
//                 name="address"
//                 value={form.address}
//                 onChange={handleChange}
//                 error={errors.address}
//               />
//               <div className="grid grid-cols-2 gap-4">
//                 <Field
//                   label="City"
//                   name="city"
//                   value={form.city}
//                   onChange={handleChange}
//                   error={errors.city}
//                 />
//                 <Field
//                   label="Postcode"
//                   name="postcode"
//                   value={form.postcode}
//                   onChange={handleChange}
//                   error={errors.postcode}
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs uppercase tracking-widest text-charcoal/60 mb-1.5">
//                   Country
//                 </label>
//                 <select
//                   value={form.country}
//                   onChange={(e) =>
//                     setForm((prev) => ({ ...prev, country: e.target.value }))
//                   }
//                   className="w-full border border-charcoal/20 rounded-sm px-4 py-2.5 text-sm text-charcoal bg-cream outline-none focus:border-charcoal"
//                 >
//                   {[
//                     "United Kingdom",
//                     "United States",
//                     "Canada",
//                     "Australia",
//                     "Germany",
//                     "France",
//                     "Netherlands",
//                     "India",
//                   ].map((c) => (
//                     <option key={c}>{c}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="mt-8 p-4 border border-sand rounded-sm bg-sand/30">
//               <p className="text-xs text-muted text-center uppercase tracking-widest">
//                 🔒 &nbsp;Secure checkout · Payment processed safely
//               </p>
//             </div>

//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="btn-gold w-full text-center text-xs uppercase tracking-widest text-white px-6 py-4 rounded-sm mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
//             >
//               {loading
//                 ? "Placing Order…"
//                 : `Place Order · £${total.toFixed(2)}`}
//             </button>

//             <Link
//               href="/cart"
//               className="block text-center text-xs uppercase tracking-widest text-charcoal/50 hover:text-charcoal mt-4 transition-colors"
//             >
//               ← Back to Cart
//             </Link>
//           </div>

//           {/* Order summary */}
//           <div>
//             <h2 className="font-serif text-xl text-charcoal mb-6">
//               Your Order
//             </h2>

//             <div className="flex flex-col gap-4 mb-6">
//               {cart.map((item) => (
//                 <div
//                   key={`${item.id}-${item.size}`}
//                   className="flex gap-4 items-center"
//                 >
//                   <div className="relative w-16 h-20 flex-shrink-0 rounded-sm overflow-hidden bg-sand">
//                     <Image
//                       src={item.img}
//                       alt={item.name}
//                       fill
//                       className="object-cover"
//                     />
//                     <span className="absolute -top-1 -right-1 bg-charcoal text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                       {item.qty}
//                     </span>
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm text-charcoal font-medium">
//                       {item.name}
//                     </p>
//                     <p className="text-xs text-muted mt-0.5">
//                       Size: {item.size}
//                     </p>
//                   </div>
//                   <p className="text-sm text-charcoal">
//                     £{(item.price * item.qty).toFixed(2)}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <div className="border-t border-sand pt-4 flex flex-col gap-3 text-sm">
//               <div className="flex justify-between text-charcoal/70">
//                 <span>Subtotal</span>
//                 <span>£{subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-charcoal/70">
//                 <span>Shipping</span>
//                 <span>
//                   {shipping === 0 ? (
//                     <span className="text-gold">Free</span>
//                   ) : (
//                     `£${shipping.toFixed(2)}`
//                   )}
//                 </span>
//               </div>
//               <div className="border-t border-sand pt-3 flex justify-between font-medium text-charcoal text-base">
//                 <span>Total</span>
//                 <span>£{total.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { Shield, Lock, Smartphone, CheckCircle } from "lucide-react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

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
        className={`w-full border rounded-sm px-4 py-2.5 text-sm text-charcoal bg-cream outline-none transition-colors focus:border-gold ${
          error ? "border-red-400" : "border-charcoal/20"
        }`}
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
    phone: "",
    address: "",
    city: "",
    state: "Gujarat",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paySuccess, setPaySuccess] = useState(false);

  // INR pricing — convert £ price to ₹ (approximate rate)
  const GBP_TO_INR = 107;
  const subtotalINR = Math.round(subtotal * GBP_TO_INR);
  const shipping = subtotalINR >= 999 ? 0 : 99;
  const total = 10;

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
    if (!form.phone || form.phone.length < 10)
      e.phone = "Valid 10-digit number required";
    if (!form.address) e.address = "Required";
    if (!form.city) e.city = "Required";
    if (!form.pincode || form.pincode.length !== 6)
      e.pincode = "Valid 6-digit pincode required";
    return e;
  };

  const loadRazorpayScript = (): Promise<boolean> =>
    new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    setLoading(true);

    // Step 1 — Create order on server
    const orderRes = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    });

    if (!orderRes.ok) {
      alert("Could not initiate payment. Please try again.");
      setLoading(false);
      return;
    }

    const order = await orderRes.json();

    // Step 2 — Load Razorpay SDK
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Payment gateway failed to load. Check your internet connection.");
      setLoading(false);
      return;
    }

    // Step 3 — Open Razorpay checkout
   const options = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  amount: order.amount,
  currency: "INR",
  name: "ZINOV",
  description: `Order for ${cart.length} item(s)`,
  order_id: order.id,

  prefill: {
    name: `${form.firstName} ${form.lastName}`,
    email: form.email,
    contact: form.phone,
  },

  notes: {
    address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
  },

  theme: {
    color: "#b8943f",
  },

  method: {
    upi: true,
  },

  config: {
    display: {
      blocks: {
        upi: {
          name: "Pay via UPI",
          instruments: [
            {
              method: "upi",
            },
          ],
        },
      },

      sequence: ["block.upi"],

      preferences: {
        show_default_blocks: false,
      },
    },
  },

  handler: function (response: any) {
    setPaySuccess(true);
    clearCart();

    router.push(
      `/order-success?ref=ZNV-${Date.now()
        .toString()
        .slice(-6)}&total=${total}&email=${form.email}&payment_id=${response.razorpay_payment_id}`,
    );
  },

  modal: {
    ondismiss: () => setLoading(false),
  },
};

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response: any) => {
      alert(`Payment failed: ${response.error.description}`);
      setLoading(false);
    });
    rzp.open();
    setLoading(false);
  };

  const handleChange = (name: keyof FormData, val: string) => {
    setForm((prev) => ({ ...prev, [name]: val }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="bg-cream min-h-screen pt-28">
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {/* Header */}
        <div className="pb-8 border-b border-sand">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">
            Almost There
          </p>
          <h1 className="font-serif text-4xl text-charcoal">Checkout</h1>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT — Form */}
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
                label="Mobile Number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
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
                  label="Pincode"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  error={errors.pincode}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-charcoal/60 mb-1.5">
                  State
                </label>
                <select
                  value={form.state}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, state: e.target.value }))
                  }
                  className="w-full border border-charcoal/20 rounded-sm px-4 py-2.5 text-sm text-charcoal bg-cream outline-none focus:border-gold"
                >
                  {[
                    "Gujarat",
                    "Maharashtra",
                    "Rajasthan",
                    "Delhi",
                    "Karnataka",
                    "Tamil Nadu",
                    "Uttar Pradesh",
                    "West Bengal",
                    "Madhya Pradesh",
                    "Punjab",
                  ].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Payment methods */}
            <div className="mt-8 border border-sand rounded-sm overflow-hidden">
              <div className="bg-charcoal px-4 py-3 flex items-center gap-2">
                <Lock size={14} className="text-gold" />
                <span className="text-xs uppercase tracking-widest text-cream">
                  Secure Payment via Razorpay
                </span>
              </div>
              <div className="p-4 grid grid-cols-4 gap-3">
                {[
                  { icon: "📱", label: "UPI", sub: "GPay · PhonePe · Paytm" },
                  { icon: "💳", label: "Card", sub: "Visa · Mastercard" },
                  { icon: "🏦", label: "Net Banking", sub: "All major banks" },
                  { icon: "👛", label: "Wallets", sub: "Paytm · Mobikwik" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="text-center p-2 border border-sand rounded-sm bg-cream/50"
                  >
                    <div className="text-xl mb-1">{m.icon}</div>
                    <div className="text-xs font-medium text-charcoal">
                      {m.label}
                    </div>
                    <div className="text-xs text-muted mt-0.5 leading-tight">
                      {m.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-4 flex items-center justify-center gap-6 py-3 border border-sand rounded-sm bg-sand/20">
              {[
                {
                  icon: <Shield size={14} className="text-gold" />,
                  text: "100% Secure",
                },
                {
                  icon: <Lock size={14} className="text-gold" />,
                  text: "Encrypted",
                },
                {
                  icon: <CheckCircle size={14} className="text-gold" />,
                  text: "Razorpay Verified",
                },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-1.5">
                  {b.icon}
                  <span className="text-xs text-muted">{b.text}</span>
                </div>
              ))}
            </div>

            {/* Pay button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="btn-gold w-full text-center text-sm uppercase tracking-widest text-white px-6 py-4 rounded-sm mt-6 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{" "}
                  Processing...
                </>
              ) : (
                <>
                  <Smartphone size={16} /> Pay ₹{total.toLocaleString("en-IN")}{" "}
                  via UPI / Card
                </>
              )}
            </button>

            <Link
              href="/cart"
              className="block text-center text-xs uppercase tracking-widest text-charcoal/50 hover:text-charcoal mt-4 transition-colors"
            >
              ← Back to Cart
            </Link>
          </div>

          {/* RIGHT — Order Summary */}
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
                      className="object-cover object-top"
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
                    <p className="text-xs text-gold mt-0.5">
                      ₹
                      {Math.round(
                        item.price * GBP_TO_INR * item.qty,
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <p className="text-sm text-charcoal font-medium">
                    ₹
                    {Math.round(
                      item.price * GBP_TO_INR * item.qty,
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-sand pt-4 flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-charcoal/70">
                <span>Subtotal</span>
                <span>₹{subtotalINR.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-charcoal/70">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-gold">Free</span>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-muted">
                  Free shipping on orders above ₹999
                </p>
              )}
              <div className="border-t border-sand pt-3 flex justify-between font-medium text-charcoal text-base">
                <span className="font-serif">Total</span>
                <span className="font-serif text-lg">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Delivery info */}
            <div className="mt-6 bg-sand/40 rounded-sm p-4 text-xs text-muted space-y-2">
              <p>📦 Delivery within Gujarat: 2–4 working days</p>
              <p>🚚 Other states: 5–7 working days</p>
              <p>↩️ Easy returns within 7 days</p>
              <p>📞 Support: hello@zinov.co.uk</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
