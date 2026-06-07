/**
 * @file Navbar.jsx
 * @description Premium sticky navigation bar with glassmorphism backdrop-blur,
 *   mobile slide-in drawer, cart badge, search toggle, and active-link highlighting.
 *   Uses the Inter font, dark theme, and amber (#F59E0B) accents throughout.
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Heart,
  User,
} from "lucide-react";
import { useCart } from "../context/CartContext";

/** Navigation link definitions */
const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

/**
 * Navbar — top-level navigation component.
 *
 * Features:
 * - Sticky positioning with backdrop-blur glass effect on scroll
 * - Animated mobile hamburger menu (slide-in drawer from right)
 * - Cart icon with live item-count badge via CartContext
 * - Active link amber underline via react-router-dom useLocation
 *
 * @returns {JSX.Element}
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { cartItems } = useCart();

  /** Total number of items in the cart */
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  /* ── Scroll listener — toggles glass background after 20 px ── */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Lock body scroll when mobile drawer is open ── */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* ═══════════════════ NAVBAR ═══════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-gray-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* ── Logo ── */}
          <Link
            to="/"
            className="group flex items-center gap-1 text-2xl font-bold tracking-widest"
            aria-label="LUXE — Home"
          >
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-yellow-300 group-hover:to-amber-500">
              LUXE
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <ul className="hidden items-center gap-8 md:flex" role="menubar">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.path} role="none">
                  <Link
                    to={link.path}
                    role="menuitem"
                    className={`relative py-1 text-sm font-medium tracking-wide transition-colors duration-300 ${
                      isActive
                        ? "text-amber-400"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {/* Active underline indicator */}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-amber-500 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Right-side action icons ── */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              className="rounded-full p-2 text-gray-300 transition-colors duration-300 hover:bg-white/10 hover:text-amber-400"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist (desktop only) */}
            <Link
              to="/products"
              className="hidden rounded-full p-2 text-gray-300 transition-colors duration-300 hover:bg-white/10 hover:text-amber-400 sm:inline-flex"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative rounded-full p-2 text-gray-300 transition-colors duration-300 hover:bg-white/10 hover:text-amber-400"
              aria-label={`Shopping cart — ${cartCount} items`}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-gray-950 shadow-lg shadow-amber-500/30 animate-scaleIn">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="rounded-full p-2 text-gray-300 transition-colors duration-300 hover:bg-white/10 hover:text-amber-400 md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* ═══════════════ MOBILE DRAWER OVERLAY ═══════════════ */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ═══════════════ MOBILE DRAWER ═══════════════ */}
      <aside
        id="mobile-menu"
        className={`fixed right-0 top-0 z-[70] flex h-full w-72 flex-col bg-gray-950/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        {/* Close button */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-xl font-bold tracking-widest text-transparent">
            LUXE
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="rounded-full p-2 text-gray-400 transition-colors duration-300 hover:bg-white/10 hover:text-white"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link, idx) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-base font-medium tracking-wide transition-all duration-300 ${
                      isActive
                        ? "bg-amber-500/10 text-amber-400"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom CTA */}
        <div className="border-t border-white/10 px-6 py-5">
          <Link
            to="/cart"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 px-4 py-3 text-sm font-semibold text-gray-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:shadow-amber-500/40"
          >
            <ShoppingBag size={18} />
            View Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
