import { useState } from "react";
import { motion } from "framer-motion";

const categories = [
  "All",
  "Table",
  "Dressers",
  "Sofa",
  "Chair",
  "Bed",
  "Lamps",
  "Speakers",
];

interface FilterBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterBar({
  activeCategory,
  onCategoryChange,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex items-center gap-3 px-4 py-4 sm:px-6 md:px-8">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
      >
        <i className="fa-solid fa-sliders text-sm"></i>
      </button>

      <div className="hide-scrollbar flex flex-1 gap-2 overflow-x-auto">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              whileTap={{ scale: 0.96 }}
              className={`relative flex-shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white text-gray-900 shadow-sm"
                  : "bg-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              {category}
              {isActive && (
                <motion.div
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full border border-gray-100 bg-white shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Expanded filters placeholder */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="absolute left-0 right-0 top-full z-30 border-b border-gray-100 bg-white/95 px-4 py-3 backdrop-blur-md"
        >
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            <span className="rounded-lg bg-gray-50 px-3 py-1.5">Price: Low to High</span>
            <span className="rounded-lg bg-gray-50 px-3 py-1.5">Price: High to Low</span>
            <span className="rounded-lg bg-gray-50 px-3 py-1.5">Top Rated</span>
            <span className="rounded-lg bg-gray-50 px-3 py-1.5">Newest</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
