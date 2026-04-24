"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useLang } from "@/lib/language-context";
const allProducts = [
  {
    id: "1",
    file: "/products/product_1.png",
    name: "Ivory Black Abstract Wave Coord",
    nameHi: "आइवरी ब्लैक एब्स्ट्रैक्ट वेव को-ऑर्ड",
    category: "Coord Sets",
    price: 30,
    vibe: "Statement · Urban · Fashion-Forward",
    description:
      "A bold and contemporary ivory cotton flax coord featuring a large-scale abstract wave and geometric shape print in black and graphite. The maxi-length mandarin-collar shirt with full front button opening and wide-leg matching trousers give an editorial, fashion-forward feel — designed in India, made for London streets.",
    descriptionHi:
      "आइवरी कॉटन फ्लैक्स को-ऑर्ड में लार्ज-स्केल एब्स्ट्रैक्ट वेव और जियोमेट्रिक शेप प्रिंट। मैक्सी-लेंथ मंदारिन कॉलर शर्ट और वाइड-लेग ट्राउज़र्स के साथ।",
    details:
      "Shell: 100% cotton flax. Off-white base with bold large-scale abstract wave and geometric shape print in black, graphite and grey. Maxi-length mandarin collar shirt with full-length front button opening and roll-up sleeve tab. Matching wide-leg trousers with the same graphic print. The oversized scale of the print gives a truly editorial feel. Pair with gold hoop earrings and block heels to complete the look. Machine washable on cold.",
    features: [
      "100% Cotton Flax",
      "Bold abstract geometric print",
      "Maxi-length mandarin collar shirt",
      "Full front button opening",
      "Matching wide-leg trousers",
      "Roll-up sleeve tabs",
    ],
  },
  {
    id: "2",
    file: "/products/product_2.png",
    name: "Charcoal Terracotta Floral 3-Piece Suit",
    nameHi: "चारकोल टेराकोटा फ्लोरल 3-पीस सूट",
    category: "3-Piece Suits",
    price: 34,
    vibe: "Office · Festive · Traditional",
    description:
      "A sophisticated dark charcoal cotton flax suit with an all-over terracotta and blush floral sprig print. The decorative Kutchi-style yoke panel with red tassels anchors the look beautifully, while the coordinating striped dupatta with a geometric diamond border adds a layer of traditional craftsmanship. A complete 3-piece set of quiet luxury.",
    descriptionHi:
      "डार्क चारकोल कॉटन फ्लैक्स सूट में टेराकोटा और ब्लश फ्लोरल प्रिंट। कच्छी-स्टाइल योक पैनल, रेड टैसल और स्ट्राइप्ड दुपट्टा के साथ।",
    details:
      "Shell: 100% cotton flax. Deep charcoal brown kurta with all-over terracotta and coral floral sprig print. Decorative Kutchi-style yoke panel with geometric embroidery and signature red tassels. Three-quarter sleeves. Matching slim-leg trousers with coordinating striped print at hem. Striped dupatta with bold geometric diamond border — understated luxury in every detail. Complete 3-piece set. Dry clean or gentle hand wash recommended.",
    features: [
      "100% Cotton Flax",
      "Terracotta floral sprig print",
      "Kutchi-style embroidered yoke",
      "Red tassel detail",
      "Striped geometric dupatta",
      "Complete 3-piece set",
    ],
  },
  {
    id: "3",
    file: "/products/product_3.png",
    name: "Amber Leaf Print Button Coord",
    nameHi: "एम्बर लीफ प्रिंट बटन को-ऑर्ड",
    category: "Coord Sets",
    price: 30,
    vibe: "Casual · College · Artistic",
    description:
      "A warm amber and ivory cotton flax coord with an abstract botanical leaf and foliage print that feels both artistic and deeply wearable. The longline mandarin-collar shirt with full front button opening and wide-leg palazzo trousers make this an effortless all-day outfit. A comfortable, confident choice for college, work or weekends.",
    descriptionHi:
      "वार्म एम्बर और आइवरी कॉटन फ्लैक्स को-ऑर्ड में एब्स्ट्रैक्ट बॉटेनिकल लीफ प्रिंट। मंदारिन कॉलर शर्ट और वाइड-लेग पलाज़ो के साथ।",
    details:
      "Shell: 100% cotton flax. Warm amber orange and cream abstract leaf and botanical foliage print throughout. Longline mandarin collar shirt with full-length front button placket and roll-up sleeve tabs. Matching wide-leg palazzo trousers with elasticated waist. The print has an artistic painted quality — no two pieces look identical under different light. Machine washable, colours stay vibrant wash after wash.",
    features: [
      "100% Cotton Flax",
      "Abstract botanical leaf print",
      "Longline mandarin collar shirt",
      "Full front button placket",
      "Wide-leg palazzo trousers",
      "Roll-up sleeve tabs",
    ],
  },
  {
    id: "4",
    file: "/products/product_4.png",
    name: "Ivory Pink Floral 3-Piece Suit",
    nameHi: "आइवरी पिंक फ्लोरल 3-पीस सूट",
    category: "3-Piece Suits",
    price: 34,
    vibe: "Festive · Garden Party · Traditional",
    description:
      "A romantic ivory cotton flax suit with a delicate climbing rose and floral vine print in soft pinks and sage green. The V-neck with lace trim adds a timeless feminine grace, while the blush pink striped dupatta with an ornate Mughal-motif border makes this a complete celebration outfit. The kind of suit you wear to every occasion and never tire of.",
    descriptionHi:
      "आइवरी कॉटन फ्लैक्स सूट में डेलिकेट क्लाइम्बिंग रोज़ प्रिंट। लेस ट्रिम V-नेक और ब्लश पिंक दुपट्टा के साथ।",
    details:
      "Shell: 100% cotton flax. Ivory kurta with all-over climbing floral vine print in blush pink and sage green. V-neckline with delicate lace trim and pin-tuck panel. Three-quarter sleeves with embroidered cuff detail. Straight-leg matching trousers. Soft blush pink striped dupatta with ornate Mughal-motif and arched temple border. Complete 3-piece set — a wardrobe investment that pays for itself at every occasion.",
    features: [
      "100% Cotton Flax",
      "Climbing rose floral print",
      "Lace trim V-neckline",
      "Pin-tuck yoke panel",
      "Blush striped dupatta with ornate border",
      "Complete 3-piece set",
    ],
  },
  {
    id: "5",
    file: "/products/product_5.png",
    name: "Teal Ajrakh Geometric 3-Piece Suit",
    nameHi: "टील अजरख जियोमेट्रिक 3-पीस सूट",
    category: "3-Piece Suits",
    price: 34,
    vibe: "Heritage · Festive · Collector's Piece",
    description:
      "A richly detailed teal cotton flax suit with Ajrakh-inspired geometric block print in deep red and ochre — one of India's oldest textile traditions. The decorative yoke panel with red tassel draws the eye inward, while the patchwork-style Ajrakh dupatta is a collector's piece in itself. Centuries of Kutch craft heritage, worn today.",
    descriptionHi:
      "टील कॉटन फ्लैक्स सूट में अजरख-इंस्पायर्ड जियोमेट्रिक ब्लॉक प्रिंट और पैचवर्क दुपट्टा। कच्छ की सदियों पुरानी कला।",
    details:
      "Shell: 100% cotton flax. Teal ground with dense Ajrakh geometric print in deep red, ochre and cream — rooted in the 4,000-year-old block printing tradition of Kutch. Decorative yoke panel with Ajrakh motifs and signature red tassel. Three-quarter sleeves. Straight-leg trousers. Oversized patchwork-style dupatta combining multiple Ajrakh motifs — each is entirely unique. A true collector's piece. Gentle hand wash only.",
    features: [
      "100% Cotton Flax",
      "Ajrakh geometric block print",
      "Decorative Ajrakh yoke panel",
      "Red tassel detail",
      "Patchwork Ajrakh dupatta — each unique",
      "Kutch heritage craft, 4000 years old",
    ],
  },
  {
    id: "6",
    file: "/products/product_6.png",
    name: "Black Paisley Block Print Coord",
    nameHi: "ब्लैक पेस्ले ब्लॉक प्रिंट को-ऑर्ड",
    category: "Coord Sets",
    price: 30,
    vibe: "Office · Evening · Statement",
    description:
      "A bold and graphic black cotton flax coord with striking cream Mughal-inspired paisley block print arranged in a large diamond grid. The longline mandarin collar kurta and wide-leg palazzo trousers create a powerful, editorial silhouette — minimal effort, maximum presence. A ZINOV signature piece.",
    descriptionHi:
      "ब्लैक कॉटन फ्लैक्स को-ऑर्ड में क्रीम मुगल-इंस्पायर्ड पेस्ले ब्लॉक प्रिंट। लॉन्गलाइन मंदारिन कॉलर कुर्ता और वाइड-लेग पलाज़ो के साथ।",
    details:
      "Shell: 100% cotton flax. Black base with bold cream paisley motifs arranged in a precise diamond lattice — block printed by hand. Mandarin collar longline kurta with front button placket and roll-up sleeve tabs. Deep side slits. Matching wide-leg black palazzo trousers with the same paisley block print at the hem. Side pockets. Wear with minimal gold jewellery — the print does everything. Machine washable.",
    features: [
      "100% Cotton Flax",
      "Hand block printed paisley",
      "Mughal diamond grid pattern",
      "Mandarin collar with roll-up sleeves",
      "Wide-leg palazzo trousers",
      "Deep side slits + side pockets",
    ],
  },
  {
    id: "7",
    file: "/products/product_7.png",
    name: "Teal Floral Embroidered Kurta Set",
    nameHi: "टील फ्लोरल एम्ब्रॉयडर्ड कुर्ता सेट",
    category: "Kurta Sets",
    price: 30,
    vibe: "Office · Premium · Artisan",
    description:
      "A stunning teal blue cotton flax kurta with flowing cream thread floral embroidery across the yoke, hemline border and sleeves. The distinctive split-cuff sleeves with pearl buttons and tassel ties are a design detail you will not find on the high street. Paired with solid teal wide-leg trousers — a premium set that takes 2 full days to hand-embroider.",
    descriptionHi:
      "टील ब्लू कॉटन फ्लैक्स कुर्ता में क्रीम थ्रेड फ्लोरल एम्ब्रॉयडरी। स्प्लिट कफ, पर्ल बटन और टैसल टाई के साथ।",
    details:
      "Shell: 100% cotton flax. Solid teal blue kurta with all-over cream thread floral embroidery at the round neckline, hemline scallop border, sleeve cuffs and side panels. Distinctive split-cuff sleeve with pearl button and tassel tie — each tassel hand-knotted. Round neckline with subtle button placket and pearl detail. Matching wide-leg teal palazzo trousers. Each kurta takes a skilled artisan 2 full days to embroider by hand. Gentle hand wash only.",
    features: [
      "100% Cotton Flax",
      "Hand cream thread embroidery",
      "Split-cuff with pearl button",
      "Tassel tie sleeve detail",
      "Scallop embroidered hemline",
      "Wide-leg teal palazzo trousers",
    ],
  },
  {
    id: "8",
    file: "/products/product_8.png",
    name: "Blush Tulip Sleeveless Coord",
    nameHi: "ब्लश ट्यूलिप स्लीवलेस को-ऑर्ड",
    category: "Coord Sets",
    price: 29,
    vibe: "Summer · Casual · Garden",
    description:
      "A breezy blush pink cotton flax coord covered in a watercolour tulip, peach bloom and leaf print. The sleeveless notched-collar shirt with patch pockets and the relaxed straight-leg trousers make this the easiest, most joyful outfit you will reach for all summer — whether it's a picnic in the park or a stroll through London.",
    descriptionHi:
      "ब्लश पिंक कॉटन फ्लैक्स को-ऑर्ड में वॉटरकलर ट्यूलिप और पीच ब्लूम प्रिंट। स्लीवलेस नॉच्ड कॉलर शर्ट और स्ट्रेट-लेग ट्राउज़र्स के साथ।",
    details:
      "Shell: 100% cotton flax. Soft blush pink base with all-over watercolour tulip, peach bloom and sage leaf print. Sleeveless notched-collar shirt with front button placket and two patch pockets. Relaxed straight-leg trousers with elasticated waist and side pockets. Lightweight and breathable — perfect for the British summer. Machine washable on cold, hang dry for best results.",
    features: [
      "100% Cotton Flax",
      "Watercolour tulip & bloom print",
      "Sleeveless notched collar shirt",
      "Patch pockets on shirt",
      "Elasticated waist trousers",
      "Machine washable",
    ],
  },
  {
    id: "9",
    file: "/products/product_9.png",
    name: "Mustard Kutchi Embroidered Kurta Set",
    nameHi: "मस्टर्ड कच्छी एम्ब्रॉयडर्ड कुर्ता सेट",
    category: "Kurta Sets",
    price: 30,
    vibe: "Office · Festive · Heritage",
    description:
      "Rich deep mustard cotton flax with three hand-stitched Kutchi mirror-work medallions placed beautifully across the kurta front. The V-neck with embroidered geometric trim, tassel pendant and three-quarter embroidered cuffs make this a statement piece that transitions effortlessly from the boardroom to a celebration dinner.",
    descriptionHi:
      "डीप मस्टर्ड कॉटन फ्लैक्स में हाथ से सिले कच्छी मिरर-वर्क मेडलियन। एम्ब्रॉयडर्ड V-नेक, टैसल पेंडेंट और वाइड-लेग पलाज़ो के साथ।",
    details:
      "Shell: 100% cotton flax. Deep amber mustard kurta with V-neckline featuring hand-embroidered geometric yoke trim and a hanging tassel pendant. Three Kutchi mirror-work medallion appliqués placed on the front — each featuring mirror inlay and geometric hand-stitching. Three-quarter sleeves with embroidered cuff border. Matching wide-leg mustard palazzo trousers. Office-ready and celebration-worthy in equal measure. Gentle hand wash recommended.",
    features: [
      "100% Cotton Flax",
      "Kutchi mirror-work medallions",
      "Embroidered geometric V-neck",
      "Tassel pendant detail",
      "Three-quarter embroidered cuffs",
      "Wide-leg palazzo trousers",
    ],
  },
  {
    id: "10",
    file: "/products/product_10.png",
    name: "Rust Geometric Appliqué Kurta Set",
    nameHi: "रस्ट जियोमेट्रिक अप्लिक कुर्ता सेट",
    category: "Kurta Sets",
    price: 30,
    vibe: "Office · Everyday · Artisan",
    description:
      "A warm terracotta rust cotton flax kurta with three placed geometric appliqué medallions featuring bandhani-inspired dot work and cream thread stitching. The V-neck with embroidered trim and tassel pendant, combined with matching rust wide-leg trousers, creates a grounded, confident look that works as well at the office as it does on a rooftop at golden hour.",
    descriptionHi:
      "टेराकोटा रस्ट कॉटन फ्लैक्स कुर्ता में जियोमेट्रिक अप्लिक मेडलियन, बंधानी-इंस्पायर्ड डॉट वर्क और टैसल पेंडेंट के साथ।",
    details:
      "Shell: 100% cotton flax. Solid terracotta rust kurta with three placed geometric appliqué medallion patches — each featuring bandhani-style dot work, hand-stitched outline and cream thread detailing. V-neckline with embroidered geometric yoke trim and hanging tassel pendant. Three-quarter sleeves with embroidered cuff band. Matching wide-leg rust palazzo trousers. The warm burnt terracotta tone works beautifully across all skin tones and all seasons. Machine washable on cold.",
    features: [
      "100% Cotton Flax",
      "Geometric appliqué medallions",
      "Bandhani-inspired dot work",
      "Embroidered V-neck with tassel",
      "Three-quarter embroidered cuffs",
      "Matching wide-leg rust trousers",
    ],
  },
];
const categories = [
  "All",
  ...Array.from(new Set(allProducts.map((p) => p.category))),
];

export default function ShopPage() {
  const { lang } = useLang();
  const { addToCart } = useCart();
  const [active, setActive] = useState("All");
  const [toast, setToast] = useState("");

  // useEffect(() => {
  //   fetch("/api/analytics", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ page: "/shop" }),
  //   });
  // }, []);

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
        <p className="text-muted text-sm">
          Timeless pieces · Handmade in India · Delivered to the UK
        </p>

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
                <div className="flex items-center justify-between mt-2">
                  <p className="font-medium text-charcoal">
                    £{product.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted">M · L</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
