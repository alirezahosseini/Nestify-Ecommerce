import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart, ShoppingBag, Star, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { Link } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";
import { useCart } from "../hooks/useCart";
import productsData from "../data/products.json";
import type { Product } from "../types";

const teamMembers = productsData.team.slice(0, 5);

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [email, setEmail] = useState("");
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const featuredProducts = productsData.products.filter(
    (p) => p.isNew || p.isExclusive
  );
  const dealProducts: Product[] = featuredProducts.length
    ? featuredProducts
    : productsData.products.slice(0, 4);

  const currentDeal = dealProducts[currentDealIndex];

  const nextDeal = () => {
    setCurrentDealIndex((prev) => (prev + 1) % dealProducts.length);
  };

  const prevDeal = () => {
    setCurrentDealIndex(
      (prev) => (prev - 1 + dealProducts.length) % dealProducts.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextDeal, 5000);
    return () => clearInterval(timer);
  }, [dealProducts.length]);

  const filteredProducts =
    activeCategory === "All"
      ? productsData.products
      : productsData.products.filter((p) => p.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      alert("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <div className="pb-8">
      <FilterBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Hero grid */}
      <div className="grid gap-4 px-4 sm:px-6 md:grid-cols-12 md:px-8 md:pb-6">
        {/* New Deals - left large card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[32px] bg-[#e8e8e8] p-5 sm:p-6 md:col-span-5 md:row-span-2"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-light text-white sm:text-4xl md:text-5xl">
              New Deals
            </h2>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row md:mt-8 md:flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDeal.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="relative flex-1 overflow-hidden rounded-[28px] bg-white p-4 shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                      ${currentDeal.price}
                    </p>
                    <p className="text-sm text-gray-500">{currentDeal.name}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {currentDeal.rating}
                  </div>
                </div>

                <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                  <img
                    src={currentDeal.image}
                    alt={currentDeal.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/90 p-1.5 shadow-lg backdrop-blur-sm">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(currentDeal);
                      }}
                      className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                        isInWishlist(currentDeal.id)
                          ? "bg-rose-500 text-white"
                          : "bg-white text-rose-500"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isInWishlist(currentDeal.id) ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(currentDeal);
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white"
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination dots */}
            <div className="flex items-center justify-center gap-2 md:absolute md:bottom-6 md:left-6 md:justify-start">
              {dealProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentDealIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentDealIndex
                      ? "w-6 bg-gray-900"
                      : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Slide controls */}
          <div className="mt-4 flex items-center justify-between md:absolute md:bottom-6 md:right-6 md:left-auto md:mt-0">
            <span className="hidden text-xs text-gray-500 md:inline">
              Slide left and right
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={prevDeal}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-sm transition-transform hover:scale-105"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextDeal}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white shadow-sm transition-transform hover:scale-105"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Great Value Deals - center top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative overflow-hidden rounded-[32px] bg-[#e8e8e8] p-6 md:col-span-5"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-light text-white sm:text-4xl">
              Great Value Deals
            </h2>
            <p className="mt-1 text-sm text-white/70">
              Find Items On Sale With 50 - 75%
            </p>
          </div>

          <div className="relative mt-4 flex aspect-[16/10] items-center justify-center md:aspect-auto md:h-64">
            <img
              src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&h=600&fit=crop"
              alt="Great value chair"
              className="max-h-full max-w-full object-contain drop-shadow-2xl"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-900 backdrop-blur-sm">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              4.9
            </div>
          </div>
        </motion.div>

        {/* Right sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-4 md:col-span-2"
        >
          {/* Our Team card */}
          <div className="flex-1 rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-wider text-gray-400">
                  OUR TEAM
                </p>
                <p className="mt-2 text-sm font-medium leading-snug text-gray-900">
                  Our Team designs luxurious minimalist furniture.
                </p>
              </div>
              <button className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-100 text-gray-400">
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="mt-4 flex -space-x-2">
              {teamMembers.map((member) => (
                <img
                  key={member.id}
                  src={member.avatar}
                  alt={member.name}
                  className="h-9 w-9 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
          </div>

          {/* Get a bonus card */}
          <div className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <p className="text-[10px] font-bold tracking-wider text-gray-900">
                GET A BONUS
              </p>
              <button className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-100 text-gray-400">
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <p className="mt-2 text-sm leading-snug text-gray-600">
              <span className="font-semibold text-gray-900">Discover</span> our
              latest exclusive items.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 w-full rounded-xl border border-gray-100 bg-gray-50 pl-3 pr-10 text-sm text-gray-900 outline-none focus:border-gray-300"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-gray-900 text-white"
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Bottom center cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-4 md:col-span-5 md:flex-row"
        >
          <div className="flex flex-1 flex-col justify-center rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
            <span className="w-fit rounded-full border border-gray-100 px-3 py-1 text-[10px] font-medium text-gray-600">
              EXCLUSIVE
            </span>
            <h3 className="mt-3 text-xl font-semibold text-gray-900">
              PureSpace Focus Duo
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Sleek, minimalist design for ultimate productivity and comfort.
            </p>
          </div>
          <div className="relative flex-1 overflow-hidden rounded-[28px] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop"
              alt="Focus Duo"
              className="h-full w-full object-cover"
            />
            <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-rose-500 backdrop-blur-sm">
              <Heart className="h-4 w-4" />
            </button>
            <Link
              to="/shop"
              className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 backdrop-blur-sm"
            >
              Open
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </motion.div>

        {/* Bottom right team card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative overflow-hidden rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm md:col-span-2"
        >
          <div className="flex items-start justify-between">
            <p className="text-[10px] font-bold tracking-wider text-gray-400">
              OUR TEAM
            </p>
            <button className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-100 text-gray-400">
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <p className="mt-2 text-sm leading-snug text-gray-900">
            Join us, stay tuned for more news and share your thoughts.
          </p>
          <div className="relative mt-4 h-24 overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=600&h=300&fit=crop"
              alt="Furniture"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Featured products section */}
      <section className="mt-8 px-4 sm:px-6 md:px-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            {activeCategory === "All" ? "Trending Now" : activeCategory}
          </h3>
          <Link
            to="/shop"
            className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            View all
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.slice(0, 4).map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
