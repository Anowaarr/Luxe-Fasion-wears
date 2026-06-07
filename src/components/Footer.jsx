/**
 * @file Footer.jsx
 * @description Luxury 4-column responsive footer with brand logo, quick links,
 *   customer service links, newsletter signup, social icons, and copyright bar.
 *   Dark theme with subtle borders (border-white/10) and amber hover accents.
 */

import { Link } from "react-router-dom";
import {
  Send,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

/* Custom social media SVG icons (not available in lucide-react) */
const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);
const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
import { useState } from "react";

/** Quick-links column data */
const QUICK_LINKS = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

/** Customer-service column data */
const SERVICE_LINKS = [
  { name: "FAQ", path: "#" },
  { name: "Shipping", path: "#" },
  { name: "Returns", path: "#" },
  { name: "Size Guide", path: "#" },
];

/** Social media definitions */
const SOCIALS = [
  { Icon: FacebookIcon, label: "Facebook", href: "#" },
  { Icon: InstagramIcon, label: "Instagram", href: "#" },
  { Icon: TwitterIcon, label: "X (Twitter)", href: "#" },
];

/**
 * Footer — site-wide footer component.
 *
 * Layout (responsive):
 * - sm: single column stacked
 * - md: 2-column grid
 * - lg: 4-column grid
 *
 * @returns {JSX.Element}
 */
const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  /** Handle newsletter form submission */
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer
      className="relative border-t border-white/10 bg-gray-950"
      role="contentinfo"
    >
      {/* ── Decorative top gradient line ── */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      {/* ═══════════════ MAIN GRID ═══════════════ */}
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* ── Column 1 — Brand ── */}
        <div className="space-y-6">
          <Link
            to="/"
            className="inline-block text-2xl font-bold tracking-widest"
            aria-label="LUXE — Home"
          >
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              LUXE
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-gray-400">
            Curating the finest in premium fashion &amp; accessories since 2020.
            Elevate your style with handpicked luxury pieces from world-renowned
            designers.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-3 pt-2">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* ── Column 2 — Quick Links ── */}
        <div>
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-sm text-gray-400 transition-colors duration-300 hover:text-amber-400"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Column 3 — Customer Service ── */}
        <div>
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
            Customer Service
          </h3>
          <ul className="space-y-3">
            {SERVICE_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-sm text-gray-400 transition-colors duration-300 hover:text-amber-400"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Column 4 — Newsletter ── */}
        <div>
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
            Newsletter
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-gray-400">
            Subscribe for exclusive offers, early access drops, and style
            inspiration delivered straight to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
            />
            <button
              type="submit"
              className="flex items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 px-4 text-gray-950 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30"
              aria-label="Subscribe to newsletter"
            >
              <Send size={18} />
            </button>
          </form>
          {subscribed && (
            <p className="mt-3 text-xs font-medium text-emerald-400 animate-fadeIn">
              ✓ Thank you for subscribing!
            </p>
          )}
        </div>
      </div>

      {/* ═══════════════ BOTTOM BAR ═══════════════ */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} LUXE. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Visa &bull; Mastercard &bull; Amex &bull; PayPal &bull; Apple&nbsp;Pay
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
