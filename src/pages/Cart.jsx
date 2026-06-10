/**
 * Cart Page Component
 *
 * Displays the shopping cart with item management,
 * quantity controls, order summary, and checkout.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  // Access cart state and actions from context
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  // Calculate order totals
  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  // Handle coupon application
  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'LUXE10') {
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code. Try "LUXE10" for 10% off!');
    }
  };

  // Handle checkout (placeholder)
  const handleCheckout = () => {
    alert('✨ Thank you for your order! This is a demo checkout.');
  };

  // ── Empty Cart State ──
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-950 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
            {/* Empty cart icon */}
            <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8">
              <ShoppingCart className="w-16 h-16 text-gray-600" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h2>
            <p className="text-gray-400 text-lg mb-8 text-center max-w-md">
              Looks like you haven't added any items to your cart yet.
              Explore our collection and find something you love!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold px-8 py-3 rounded-full hover:from-amber-400 hover:to-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ── Cart with Items ──
  return (
    <main className="min-h-screen bg-gray-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-10 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <p className="text-gray-400 mt-2">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Cart Items List ── */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 hover:bg-white/[0.07] transition-all duration-300 animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Product image */}
                <Link to={`/product/${item.id}`} className="shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-28 h-28 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Product details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="text-lg font-semibold text-white hover:text-amber-400 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-400 mt-1">{item.category}</p>
                    </div>
                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-300"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Price and quantity */}
                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4 text-gray-400" />
                      </button>
                      <span className="w-8 text-center font-medium text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>

                    {/* Item total */}
                    <p className="text-lg font-bold text-amber-400">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear cart button */}
            <button
              onClick={clearCart}
              className="text-sm text-gray-500 hover:text-red-400 transition-colors mt-4 underline underline-offset-4"
            >
              Clear entire cart
            </button>
          </div>

          {/* ── Order Summary ── */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-28 animate-fadeIn">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

              {/* Coupon input */}
              <div className="flex gap-2 mb-6">
                <div className="flex-1 relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                    disabled={couponApplied}
                  />
                </div>
                <button
                  onClick={handleApplyCoupon}
                  disabled={couponApplied}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    couponApplied
                      ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                      : 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                  }`}
                >
                  {couponApplied ? '✓ Applied' : 'Apply'}
                </button>
              </div>

              {/* Price breakdown */}
              <div className="space-y-3 border-b border-white/10 pb-4 mb-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400' : ''}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-amber-400">${total.toFixed(2)}</span>
              </div>

              {/* Free shipping notice */}
              {subtotal < 100 && (
                <p className="text-xs text-gray-500 mb-4 text-center">
                  Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}

              {/* Checkout button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold py-3.5 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Continue shopping */}
              <Link
                to="/products"
                className="block text-center text-sm text-gray-400 hover:text-amber-400 transition-colors mt-4"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
// cart.jsx