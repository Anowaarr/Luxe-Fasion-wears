/**
 * products.js
 * Premium product catalog – 12 luxury items across four categories.
 * Every image uses a verified Unsplash photo-ID so the URLs resolve to
 * real, high-quality product photography.
 */

const products = [
  // ── Watches ────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Chronograph Elite",
    price: 2499,
    originalPrice: 3199,
    description:
      "A masterfully engineered chronograph featuring a sapphire crystal face and Swiss-made automatic movement. The brushed titanium case exudes timeless sophistication.",
    category: "Watches",
    rating: 4.9,
    reviews: 234,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 2,
    name: "Midnight Aviator",
    price: 1899,
    originalPrice: 2400,
    description:
      "Inspired by vintage pilot watches, the Midnight Aviator combines a deep black dial with luminous hands for effortless readability. Water-resistant to 200 m.",
    category: "Watches",
    rating: 4.7,
    reviews: 187,
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop",
    badge: "New",
    inStock: true,
  },
  {
    id: 3,
    name: "Royal Skeleton",
    price: 3750,
    originalPrice: 4200,
    description:
      "Gaze into the heart of horology through the Royal Skeleton's open-worked dial. Each gear and spring is hand-finished with Côtes de Genève decoration.",
    category: "Watches",
    rating: 4.8,
    reviews: 96,
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b8?w=500&h=500&fit=crop",
    badge: "Hot",
    inStock: true,
  },

  // ── Bags ───────────────────────────────────────────────────────────
  {
    id: 4,
    name: "Milano Leather Tote",
    price: 1295,
    originalPrice: 1650,
    description:
      "Handcrafted in Italy from full-grain Vacchetta leather, the Milano Tote ages beautifully with use. Spacious interior with suede lining and brass hardware.",
    category: "Bags",
    rating: 4.6,
    reviews: 312,
    image:
      "https://images.unsplash.com/photo-1548036328-c11fac7de6ef?w=500&h=500&fit=crop",
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 5,
    name: "Parisian Crossbody",
    price: 895,
    originalPrice: 1100,
    description:
      "A compact yet versatile crossbody inspired by Parisian ateliers. Features an adjustable chain strap and signature quilted lambskin exterior.",
    category: "Bags",
    rating: 4.5,
    reviews: 208,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    badge: "Sale",
    inStock: true,
  },
  {
    id: 6,
    name: "Voyager Weekender",
    price: 1750,
    originalPrice: 2100,
    description:
      "Designed for the discerning traveler, this weekender bag combines durable canvas with saddle-leather trim. Expandable side compartments hold everything you need.",
    category: "Bags",
    rating: 4.4,
    reviews: 145,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop",
    badge: null,
    inStock: true,
  },

  // ── Jewelry ────────────────────────────────────────────────────────
  {
    id: 7,
    name: "Diamond Constellation Necklace",
    price: 4200,
    originalPrice: 5000,
    description:
      "Thirty-six ethically sourced diamonds are set in 18 k white gold to mirror the night sky. A statement piece that catches light from every angle.",
    category: "Jewelry",
    rating: 5.0,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1515562141-5d1879b209a7?w=500&h=500&fit=crop",
    badge: "Hot",
    inStock: true,
  },
  {
    id: 8,
    name: "Aureate Cuff Bracelet",
    price: 1850,
    originalPrice: 2300,
    description:
      "Bold yet refined, the Aureate Cuff is sculpted from solid 14 k gold with a brushed satin finish. An adjustable hinge ensures a comfortable, secure fit.",
    category: "Jewelry",
    rating: 4.7,
    reviews: 163,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop",
    badge: "New",
    inStock: true,
  },
  {
    id: 9,
    name: "Sapphire Halo Ring",
    price: 3400,
    originalPrice: 3900,
    description:
      "A vivid 2.5-carat Ceylon sapphire is encircled by a halo of micro-pavé diamonds. Set in platinum for enduring brilliance and strength.",
    category: "Jewelry",
    rating: 4.9,
    reviews: 52,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop",
    badge: null,
    inStock: false,
  },

  // ── Accessories ────────────────────────────────────────────────────
  {
    id: 10,
    name: "Silk Infinity Scarf",
    price: 345,
    originalPrice: 450,
    description:
      "Woven from 100 % mulberry silk in a limited-edition abstract print. Lightweight enough for layering yet sumptuous against the skin.",
    category: "Accessories",
    rating: 4.3,
    reviews: 421,
    image:
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500&h=500&fit=crop",
    badge: "Sale",
    inStock: true,
  },
  {
    id: 11,
    name: "Obsidian Aviator Sunglasses",
    price: 520,
    originalPrice: 680,
    description:
      "Polarised lenses in a lightweight titanium frame offer UV 400 protection without compromise. The obsidian-black coating is scratch-resistant and anti-reflective.",
    category: "Accessories",
    rating: 4.6,
    reviews: 289,
    image:
      "https://images.unsplash.com/photo-1473188588068-36a6e2f33c3c?w=500&h=500&fit=crop",
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 12,
    name: "Monogram Card Holder",
    price: 275,
    originalPrice: 350,
    description:
      "Slim, structured, and effortlessly elegant. Crafted from cross-grain calfskin with four card slots and a central pocket for folded notes.",
    category: "Accessories",
    rating: 3.9,
    reviews: 534,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38ef2a88b?w=500&h=500&fit=crop",
    badge: null,
    inStock: true,
  },
];

export default products;
