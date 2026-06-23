import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Package,
} from "lucide-react";
import { useCart } from "../hooks/useCart";

export default function Cart() {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } =
    useCart();

  const shipping = cartTotal > 500 ? 0 : 25;
  const total = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50"
        >
          <ShoppingBag className="h-10 w-10 text-gray-300" />
        </motion.div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Your cart is empty
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/shop"
          className="mt-6 flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white"
        >
          Start Shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 pb-12 sm:px-6 md:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
        Shopping Cart
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        {cart.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="mb-4 flex gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <Link
                  to={`/product/${item.id}`}
                  className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="text-base font-semibold text-gray-900 hover:underline"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <p className="text-base font-semibold text-gray-900">
                      ${item.price * item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-xl border border-gray-100 bg-white p-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-700"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-700"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <button
            onClick={clearCart}
            className="mt-2 text-sm font-medium text-gray-400 hover:text-rose-500"
          >
            Clear cart
          </button>
        </div>

        {/* Order summary */}
        <div className="h-fit rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-center justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <span>Tax</span>
              <span>Calculated at checkout</span>
            </div>
          </div>

          <div className="my-6 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between text-lg font-semibold text-gray-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.02]">
            Checkout
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
            <Package className="h-3 w-3" />
            Free shipping on orders over $500
          </div>
        </div>
      </div>
    </div>
  );
}
