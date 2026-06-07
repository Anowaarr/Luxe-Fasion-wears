/**
 * ProductDetail.jsx
 * Single-product view with zoom-on-hover image, star rating,
 * quantity selector, animated add-to-cart, breadcrumb, and a
 * "Related Products" row from the same category.
 */

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
  Package,
} from "lucide-react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold">Product not found</h2>
        <Link
          to="/products"
          className="text-amber-400 hover:text-amber-300 transition-colors"
        >
          ← Back to products
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  /* ── Star renderer ────────────────────────────────────────────────── */
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-gray-600"
          }`}
        />
      );
    }
    return stars;
  };

  /* ── Image zoom handler ───────────────────────────────────────────── */
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* ── Breadcrumb ───────────────────────────────────────────── */}
        <nav
          className={`flex items-center gap-2 text-sm text-gray-400 mb-8 transition-all duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link to="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            to="/products"
            className="hover:text-amber-400 transition-colors"
          >
            Products
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            to={`/products?category=${product.category}`}
            className="hover:text-amber-400 transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white">{product.name}</span>
        </nav>

        {/* ── Back button ──────────────────────────────────────────── */}
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 text-sm text-gray-400 hover:text-amber-400 transition-all duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          ← Back
        </button>

        {/* ── Main content ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <div
            className={`transition-all duration-700 ${
              loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div
              className="relative aspect-square rounded-3xl overflow-hidden bg-gray-900 border border-white/10 cursor-zoom-in"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300"
                style={{
                  transform: isZooming ? "scale(1.8)" : "scale(1)",
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                }}
              />

              {/* Badge */}
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full bg-amber-500 text-gray-950">
                  {product.badge}
                </span>
              )}

              {/* Like */}
              <button
                onClick={() => setLiked(!liked)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-950/60 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:border-amber-500/40 transition-all duration-300"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    liked
                      ? "text-red-500 fill-red-500"
                      : "text-white"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Info */}
          <div
            className={`transition-all duration-700 delay-150 ${
              loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <span className="text-sm text-amber-400 tracking-widest uppercase font-medium">
              {product.category}
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">{renderStars(product.rating)}</div>
              <span className="text-sm text-gray-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-white">
                ${product.price.toLocaleString()}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-emerald-400">
                {discount}% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-8">
              <span
                className={`w-2 h-2 rounded-full ${
                  product.inStock ? "bg-emerald-400" : "bg-red-500"
                }`}
              />
              <span
                className={`text-sm ${
                  product.inStock ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex flex-wrap gap-4 mb-8">
              {/* Quantity selector */}
              <div className="flex items-center border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-white/5 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 h-12 flex items-center justify-center text-sm font-semibold border-x border-white/10">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-white/5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  added
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                    : product.inStock
                    ? "bg-amber-500 hover:bg-amber-400 text-gray-950 shadow-lg shadow-amber-500/25 hover:shadow-amber-400/40"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {added ? "Added!" : "Add to Cart"}
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Truck, text: "Free Shipping" },
                { icon: Shield, text: "2-Year Warranty" },
                { icon: RotateCcw, text: "30-Day Returns" },
                { icon: Package, text: "Premium Packaging" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-sm text-gray-400"
                >
                  <Icon className="w-4 h-4 text-amber-500/70" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Related Products ─────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  You May Also{" "}
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">
                    Like
                  </span>
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  More from {product.category}
                </p>
              </div>
              <Link
                to={`/products?category=${product.category}`}
                className="group hidden sm:inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
              >
                View All
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
