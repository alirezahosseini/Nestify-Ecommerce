import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Grid3X3, LayoutList, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import productsData from "../data/products.json";

type SortOption = "default" | "price-low" | "price-high" | "rating" | "newest";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    if (category) setActiveCategory(category);
    if (search) setSearchQuery(search);
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    let result = productsData.products;

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy, priceRange]);

  return (
    <div className="pb-8">
      <FilterBar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="px-4 py-4 sm:px-6 md:px-8">
        {/* Search & controls */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-full border border-gray-100 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none focus:border-gray-300 focus:bg-white"
            />
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-10 rounded-full border border-gray-100 bg-white px-4 text-sm text-gray-700 outline-none"
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
            </select>

            <div className="hidden rounded-full border border-gray-100 bg-white p-1 sm:flex">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  viewMode === "grid" ? "bg-gray-900 text-white" : "text-gray-500"
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  viewMode === "list" ? "bg-gray-900 text-white" : "text-gray-500"
                }`}
              >
                <LayoutList className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop filters sidebar */}
          <aside className="hidden w-56 flex-shrink-0 lg:block">
            <div className="sticky top-24 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <h4 className="mb-4 text-sm font-semibold text-gray-900">Filters</h4>

              <div className="mb-5">
                <p className="mb-2 text-xs font-medium text-gray-500">Price Range</p>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-full accent-gray-900"
                  />
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <p className="mb-2 text-xs font-medium text-gray-500">Categories</p>
                <div className="space-y-1">
                  {[
                    "All",
                    "Sofa",
                    "Chair",
                    "Table",
                    "Bed",
                    "Lamps",
                    "Dressers",
                    "Speakers",
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                        activeCategory === cat
                          ? "bg-gray-900 text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            <p className="mb-4 text-sm text-gray-500">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""} found
            </p>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white py-16">
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">
                  No products found
                </h4>
                <p className="text-sm text-gray-500">
                  Try adjusting your filters or search query.
                </p>
              </div>
            ) : (
              <motion.div
                layout
                className={`grid gap-4 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant={viewMode === "list" ? "horizontal" : "default"}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters modal */}
      {showMobileFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setShowMobileFilters(false)}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="h-full w-[300px] bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">Filters</h4>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-6">
              <p className="mb-2 text-sm font-medium text-gray-900">Price Range</p>
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-full accent-gray-900"
              />
              <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-gray-900">Categories</p>
              <div className="space-y-1">
                {[
                  "All",
                  "Sofa",
                  "Chair",
                  "Table",
                  "Bed",
                  "Lamps",
                  "Dressers",
                  "Speakers",
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      activeCategory === cat
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
