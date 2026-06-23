import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../hooks/useCart";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "horizontal" | "compact";
}

export default function ProductCard({
  product,
  variant = "default",
}: ProductCardProps) {
  const { toggleWishlist, addToCart, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  if (variant === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="group relative flex gap-4 overflow-hidden rounded-3xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.isExclusive && (
            <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-gray-900 backdrop-blur-sm">
              EXCLUSIVE
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <h3 className="text-base font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-gray-500">
            {product.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">
              ${product.price}
            </span>
            <div className="flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {product.rating}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -4 }}
        className="group relative overflow-hidden rounded-3xl bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-rose-500 shadow-sm backdrop-blur-sm transition-transform hover:scale-110"
          >
            <Heart
              className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`}
            />
          </button>
        </div>
        <div className="mt-3 px-1">
          <h3 className="text-sm font-semibold text-gray-900">
            {product.name}
          </h3>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              ${product.price}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {product.rating}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      className="group relative overflow-hidden rounded-3xl bg-white p-3 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-gray-900 px-3 py-1 text-[10px] font-medium text-white">
            NEW
          </span>
        )}
        {product.isExclusive && (
          <span className="absolute left-3 top-3 rounded-full border border-gray-200 bg-white/90 px-3 py-1 text-[10px] font-medium text-gray-900 backdrop-blur-sm">
            EXCLUSIVE
          </span>
        )}
        {product.discount && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-3 py-1 text-[10px] font-medium text-white">
            -{product.discount}
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-rose-500 shadow-sm backdrop-blur-sm transition-transform hover:scale-110"
        >
          <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
        </button>

        <Link
          to={`/product/${product.id}`}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white opacity-0 shadow-lg transition-all group-hover:opacity-100"
        >
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="p-2 pt-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {product.name}
            </h3>
            <p className="mt-0.5 text-xs text-gray-500">{product.category}</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {product.rating}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
