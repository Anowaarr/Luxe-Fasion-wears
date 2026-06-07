/**
 * @file ProductCard.jsx
 * @description Premium product card with glassmorphism styling, hover zoom image,
 *   dynamic badge system, wishlist toggle, star ratings, slide-up "Add to Cart"
 *   button, and a quick-view icon. Uses CartContext for addToCart functionality.
 *
 * @typedef {Object} Product
 * @property {string|number} id        — Unique product identifier
 * @property {string}  name            — Product display name
 * @property {string}  category        — Product category label
 * @property {number}  price           — Current / sale price
 * @property {number}  [originalPrice] — Original price (shows strikethrough if set & different)
 * @property {string}  image           — Product image URL
 * @property {number}  [rating]        — Rating out of 5 (defaults to 0)
 * @property {number}  [reviews]       — Number of reviews
 * @property {string}  [badge]         — "New" | "Sale" | "Hot" | "Bestseller"
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Eye,
  Star,
} from "lucide-react";
import { useCart } from "../context/CartContext";

/** Badge colour map */
const BADGE_STYLES = {
  New: "bg-emerald-500 text-white",
  Sale: "bg-red-500 text-white",
  Hot: "bg-orange-500 text-white",
  Bestseller: "bg-purple-500 text-white",
};

/**
 * ProductCard — renders a single product in a visually rich card layout.
 *
 * @param {{ product: Product }} props
 * @returns {JSX.Element}
 */
const ProductCard = ({ product }) => {
  const {
    id,
    name,
    category,
    price,
    originalPrice,
    image,
    rating = 0,
    reviews = 0,
    badge,
  } = product;

  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  /** Whether a discount is shown */
  const hasDiscount = originalPrice && originalPrice !== price;

  /** Render star icons (filled + empty) */
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          className={
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-none text-gray-600"
          }
        />
      );
    }
    return stars;
  };

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl hover:shadow-amber-500/5"
      aria-label={`Product: ${name}`}
    >
      {/* ═══════════════ IMAGE CONTAINER ═══════════════ */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
        <Link to={`/product/${id}`} aria-label={`View ${name}`}>
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>

        {/* ── Badge (top-left) ── */}
        {badge && BADGE_STYLES[badge] && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider shadow-lg ${BADGE_STYLES[badge]}`}
          >
            {badge}
          </span>
        )}

        {/* ── Wishlist toggle (top-right) ── */}
        <button
          onClick={() => setIsWishlisted((prev) => !prev)}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
            isWishlisted
              ? "border-red-500/50 bg-red-500/20 text-red-400"
              : "border-white/20 bg-black/40 text-white hover:border-red-500/50 hover:bg-red-500/20 hover:text-red-400"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
        >
          <Heart
            size={16}
            className={isWishlisted ? "fill-red-400" : "fill-none"}
          />
        </button>

        {/* ── Quick-view & Add-to-Cart overlay (slides up on hover) ── */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-4 pb-4 pt-12 transition-transform duration-500 ease-out group-hover:translate-y-0">
          {/* Quick View */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-amber-500/50 hover:bg-amber-500/20 hover:text-amber-400"
            aria-label="Quick view"
          >
            <Eye size={18} />
          </button>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 px-5 py-2.5 text-sm font-semibold text-gray-950 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:shadow-amber-500/40"
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingBag size={16} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* ═══════════════ INFO SECTION ═══════════════ */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Category */}
        <span className="text-[11px] font-medium uppercase tracking-wider text-amber-500/70">
          {category}
        </span>

        {/* Name */}
        <Link
          to={`/product/${id}`}
          className="text-base font-semibold leading-tight text-white transition-colors duration-300 hover:text-amber-400 line-clamp-2"
        >
          {name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">{renderStars()}</div>
          {reviews > 0 && (
            <span className="text-xs text-gray-500">({reviews})</span>
          )}
        </div>

        {/* Price */}
        <div className="mt-auto flex items-center gap-2 pt-1">
          <span className="text-lg font-bold text-white">
            ${price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
          {hasDiscount && (
            <span className="rounded-md bg-red-500/15 px-1.5 py-0.5 text-[11px] font-semibold text-red-400">
              -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
