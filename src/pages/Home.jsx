/**
 * Home.jsx
 * Ultra-premium landing page: hero → categories → featured products →
 * features strip → newsletter. Dark theme with amber/gold accents,
 * glassmorphism cards, fade-in animations, and parallax-like layering.
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
  Headphones,
  Mail,
  Sparkles,
} from "lucide-react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

/* ── Intersection-observer-based fade-in hook ────────────────────── */
function useFadeIn(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ── Category data ───────────────────────────────────────────────── */
const categories = [
  {
    name: "Watches",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop",
  },
  {
    name: "Bags",
    image:
      "https://images.unsplash.com/photo-1548036328-c11fac7de6ef?w=600&h=400&fit=crop",
  },
  {
    name: "Jewelry",
    image:
      "https://images.unsplash.com/photo-1515562141-5d1879b209a7?w=600&h=400&fit=crop",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&h=400&fit=crop",
  },
];

/* ── Feature strip items ─────────────────────────────────────────── */
const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
  { icon: Shield, title: "Secure Payment", desc: "256-bit SSL encryption" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated help desk" },
];

/* ═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [catRef, catVisible] = useFadeIn();
  const [featProdRef, featProdVisible] = useFadeIn();
  const [stripRef, stripVisible] = useFadeIn();
  const [newsRef, newsVisible] = useFadeIn();

  // Pick 4 featured products (mix of badges)
  const featured = products.filter((p) => p.badge).slice(0, 4);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* ── Hero Section ───────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[640px] flex items-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[1500ms]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop')",
            transform: heroLoaded ? "scale(1)" : "scale(1.08)",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div
            className={`max-w-2xl transition-all duration-1000 ${
              heroLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-2 text-amber-400 mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm tracking-widest uppercase font-medium">
                Premium Collection 2026
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Redefine{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">
                Your Style
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
              Discover hand-curated luxury pieces crafted with passion and
              precision. Elevate every moment with timeless elegance.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-400/40"
              >
                Explore Collection
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-amber-400/60 text-white px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm hover:bg-white/5"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-gray-400 tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-amber-400 to-transparent" />
        </div>
      </section>

      {/* ── Featured Categories ────────────────────────────────────── */}
      <section
        ref={catRef}
        className={`py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto transition-all duration-700 ${
          catVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Shop by{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Explore our meticulously curated collections, each piece chosen for
            its exceptional craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="group relative h-72 rounded-2xl overflow-hidden"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{cat.name}</h3>
                  <p className="text-sm text-gray-400">Explore →</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center backdrop-blur-sm border border-amber-500/30 transition-all duration-300 group-hover:bg-amber-500 group-hover:border-amber-400">
                  <ChevronRight className="w-5 h-5 text-amber-400 transition-colors group-hover:text-gray-950" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ──────────────────────────────────────── */}
      <section
        ref={featProdRef}
        className={`py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto transition-all duration-700 ${
          featProdVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Featured{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">
                Products
              </span>
            </h2>
            <p className="text-gray-400 max-w-md">
              Our editors' picks — the most coveted items this season.
            </p>
          </div>
          <Link
            to="/products"
            className="group inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <div
              key={product.id}
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`transition-all duration-500 ${
                featProdVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Features Strip ─────────────────────────────────────────── */}
      <section
        ref={stripRef}
        className={`py-16 border-y border-white/5 transition-all duration-700 ${
          stripVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="flex items-center gap-4 group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 transition-all duration-300 group-hover:bg-amber-500/20 group-hover:border-amber-400/40 shrink-0">
                <Icon className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white">{title}</h4>
                <p className="text-sm text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter ─────────────────────────────────────────────── */}
      <section
        ref={newsRef}
        className={`py-24 px-6 sm:px-10 lg:px-16 transition-all duration-700 ${
          newsVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-amber-400 mb-6">
            <Mail className="w-5 h-5" />
            <span className="text-sm tracking-widest uppercase font-medium">
              Newsletter
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Stay in the{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">
              Loop
            </span>
          </h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto">
            Subscribe for early access to new arrivals, exclusive deals, and
            style inspiration.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold rounded-full transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-400/40"
            >
              Subscribe
            </button>
          </form>

          {subscribed && (
            <p className="mt-4 text-amber-400 animate-pulse">
              ✓ Thank you for subscribing!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
