"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useLang } from "@/lib/language-context";
import { ArrowLeft, Check } from "lucide-react";

const allProducts = [
  {
    id: "1",
    file: "product_1.png",
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
    file: "product_2.png",
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
    file: "product_3.png",
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
    file: "product_4.png",
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
    file: "product_5.png",
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
    file: "product_6.png",
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
    file: "product_7.png",
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
    file: "product_8.png",
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
    file: "product_9.png",
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
    file: "product_10.png",
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

const sizes = ["XS", "S", "M", "L", "XL"];

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
              src={`/products/${product.file}`}
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
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-3xl font-medium text-charcoal">
                £{product.price.toFixed(2)}
              </span>
              <span className="text-xs text-muted">
                incl. VAT · Free UK shipping over £150
              </span>
            </div>

            <div className="h-px bg-sand mb-6" />

            {/* Size selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-widest text-charcoal/70">
                  Select Size
                </p>
                {sizeError && (
                  <p className="text-xs text-red-400">
                    Please select a size to continue
                  </p>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`w-12 h-12 text-sm border rounded-sm transition-all font-sans ${
                      selectedSize === size
                        ? "bg-charcoal text-cream border-charcoal"
                        : "border-charcoal/20 text-charcoal/60 hover:border-charcoal hover:text-charcoal"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted mt-2">
                Indian sizing — size up if you are between sizes. Each set
                includes 5 sizes.
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
                "Free UK returns within 30 days",
                "100% Cotton Flax · Ethically made in India",
                "Free UK shipping on orders over £150",
                "Delivered to UK in 5–8 working days",
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
              🇬🇧 UK Delivery 5–8 days &nbsp;·&nbsp; 🇮🇳 Handmade in India
              &nbsp;·&nbsp; 📦 Free returns 30 days &nbsp;·&nbsp; 🌿 100% Cotton
              Flax
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
                      src={`/products/${p.file}`}
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
                      £{p.price.toFixed(2)}
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
