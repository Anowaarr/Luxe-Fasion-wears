/**
 * @file App.jsx
 * @description Root application component. Sets up routing via react-router-dom,
 *   wraps everything in CartProvider for global cart state, and renders the shared
 *   layout (Navbar → page routes → Footer). Dark bg-gray-950 base theme.
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

/* ── Page imports ── */
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";

/* ── Shared component imports ── */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

/**
 * App — top-level component.
 *
 * Provides:
 * - Client-side routing (BrowserRouter)
 * - Global cart state (CartProvider)
 * - Shared layout: Navbar + main content + Footer
 *
 * @returns {JSX.Element}
 */
const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        {/* Scroll to top on route change */}
        <ScrollToTop />

        <div className="flex min-h-screen flex-col bg-gray-950 font-sans text-white">
          {/* ── Persistent Navbar ── */}
          <Navbar />

          {/* ── Route-driven page content ── */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          {/* ── Persistent Footer ── */}
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
