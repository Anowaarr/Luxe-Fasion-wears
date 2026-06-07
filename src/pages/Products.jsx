/**
 * Products.jsx
 * Full catalogue page with sidebar filters, search, sort, and a
 * responsive masonry-like grid. Reads ?category= from the URL so
 * category links from the home page work seamlessly.
 */

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, ChevronDown, Sparkles } from "lucide-react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const CATEGORIES = ["All", "Watches", "Bags", "Jewelry", "Accessories"];

const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "All";

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Sync URL → state
  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  // Animate mount
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* ── Derived product list ─────────────────────────────────────────── */
  const filtered = useMemo(() => {
    let list = [...products];

    // Category
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Price
    list = list.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return list;
  }, [activeCategory, searchQuery, sortBy, priceRange]);

  /* ── Handlers ─────────────────────────────────────────────────────── */
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* ── Page Header ──────────────────────────────────────────── */}
        <div
          className={`mb-12 transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm tracking-widest uppercase font-medium">
              Catalogue
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">
            Our{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">
              Collection
            </span>
          </h1>
        </div>

        {/* ── Toolbar ──────────────────────────────────────────────── */}
        <div
          className={`flex flex-col md:flex-row gap-4 mb-8 transition-all duration-700 delay-100 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search products…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-gray-900 text-white"
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden inline-flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white transition-all duration-300 hover:border-amber-500/50"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* ── Sidebar ──────────────────────────────────────────── */}
          <aside
            className={`w-60 shrink-0 space-y-8 ${
              showFilters ? "block" : "hidden"
            } md:block transition-all duration-300`}
          >
            {/* Categories */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeCategory === cat
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "text-gray-300 hover:bg-white/5 hover:text-white border border-transparent"
                    }`}
                  >
                    {cat}
                    <span className="float-right text-xs text-gray-500">
                      {cat === "All"
                        ? products.length
                        : products.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Price Range
              </h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min={0}
                  max={5000}
                  step={50}
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>${priceRange[0].toLocaleString()}</span>
                  <span>${priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Product Grid ─────────────────────────────────────── */}
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-6">
              Showing{" "}
              <span className="text-white font-medium">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "product" : "products"}
            </p>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product, i) => (
                  <div
                    key={product.id}
                    className={`transition-all duration-500 ${
                      loaded
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${150 + i * 60}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Search className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 max-w-sm">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
