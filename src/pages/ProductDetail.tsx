import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
} from "lucide-react";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";
import { useCart } from "../hooks/useCart";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = productsData.products.find((p) => p.id === Number(id));
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Product not found
        </h2>
        <button
          onClick={() => navigate("/shop")}
          className="mt-4 rounded-full bg-gray-900 px-6 py-2 text-sm font-medium text-white"
        >
          Back to shop
        </button>
      </div>
    );
  }

  const relatedProducts = productsData.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const thumbnails = [product.image, product.image, product.image];

  return (
    <div className="px-4 py-6 pb-12 sm:px-6 md:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="aspect-square overflow-hidden rounded-[32px] bg-gray-100">
            <img
              src={thumbnails[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {thumbnails.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square overflow-hidden rounded-2xl bg-gray-100 ${
                  selectedImage === idx ? "ring-2 ring-gray-900" : ""
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                {product.category}
              </span>
              <h1 className="mt-2 text-3xl font-semibold text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
            </div>
            <button
              onClick={() => toggleWishlist(product)}
              className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gray-100 transition-colors ${
                isInWishlist(product.id)
                  ? "bg-rose-500 text-white border-rose-500"
                  : "bg-white text-gray-700"
              }`}
            >
              <Heart
                className={`h-5 w-5 ${
                  isInWishlist(product.id) ? "fill-current" : ""
                }`}
              />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {product.rating}
            </div>
            <span className="text-sm text-gray-400">128 reviews</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
            {product.discount && (
              <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-500">
                Save {product.discount}
              </span>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-gray-600">
            {product.description} Designed with comfort and elegance in mind,
            this piece will transform your living space into a serene retreat.
            Crafted from premium materials with attention to every detail.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm">
              <Truck className="mx-auto h-5 w-5 text-gray-700" />
              <p className="mt-2 text-xs font-medium text-gray-600">
                Free Shipping
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm">
              <Shield className="mx-auto h-5 w-5 text-gray-700" />
              <p className="mt-2 text-xs font-medium text-gray-600">
                2 Year Warranty
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm">
              <RotateCcw className="mx-auto h-5 w-5 text-gray-700" />
              <p className="mt-2 text-xs font-medium text-gray-600">
                30 Day Returns
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-2xl border border-gray-100 bg-white p-1 shadow-sm">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-700"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center text-sm font-semibold text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-700"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => {
                for (let i = 0; i < quantity; i++) {
                  addToCart(product);
                }
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gray-900 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart — ${product.price * quantity}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h3 className="mb-6 text-xl font-semibold text-gray-900">
            You may also like
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
