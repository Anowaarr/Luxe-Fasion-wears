/**
 * CartContext.jsx
 * Global cart state powered by useReducer.
 * Provides addToCart, removeFromCart, updateQuantity, clearCart,
 * getCartTotal and getCartCount through the useCart() hook.
 */

import { createContext, useContext, useReducer, useCallback, useMemo } from "react";

// ── Action types ─────────────────────────────────────────────────────
const ACTIONS = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
};

// ── Reducer ──────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        // Increment quantity if already in cart
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case ACTIONS.REMOVE_FROM_CART:
      return state.filter((item) => item.id !== action.payload);

    case ACTIONS.UPDATE_QUANTITY:
      if (action.payload.quantity < 1) {
        return state.filter((item) => item.id !== action.payload.id);
      }
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case ACTIONS.CLEAR_CART:
      return [];

    default:
      return state;
  }
}

// ── Context ──────────────────────────────────────────────────────────
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  /* ── Dispatch helpers ─────────────────────────────────────────────── */
  const addToCart = useCallback((product) => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
  }, []);

  const removeFromCart = useCallback((id) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: id });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  }, []);

  /* ── Derived values ───────────────────────────────────────────────── */
  const getCartTotal = useCallback(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const getCartCount = useCallback(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems]
  );

  /* ── Memoised context value ───────────────────────────────────────── */
  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
    }),
    [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ── Custom hook ──────────────────────────────────────────────────────
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a <CartProvider>");
  }
  return context;
}

export default CartContext;
// CartContext.jsx