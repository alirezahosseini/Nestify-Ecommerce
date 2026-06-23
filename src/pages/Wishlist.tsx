import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../hooks/useCart";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const { wishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-rose-50"
        >
          <Heart className="h-10 w-10 text-rose-300" />
        </motion.div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Your wishlist is empty
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Save your favorite items here.
        </p>
        <Link
          to="/shop"
          className="mt-6 flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white"
        >
          Explore Products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 pb-12 sm:px-6 md:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            Wishlist
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {wishlist.length} saved item
            {wishlist.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => {
            wishlist.forEach((item) => addToCart(item));
          }}
          className="flex items-center justify-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white"
        >
          <ShoppingBag className="h-4 w-4" />
          Add all to cart
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
