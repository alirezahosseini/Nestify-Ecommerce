import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, Home, ShoppingCart, Users, User } from "lucide-react";
import { useCart } from "../hooks/useCart";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/shop", label: "Shop", icon: ShoppingCart },
  { path: "/team", label: "Team", icon: Users },
  { path: "/profile", label: "Profile", icon: User },
];

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, wishlistCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto min-h-[calc(100vh-24px)] max-w-[1440px] overflow-hidden rounded-[32px] bg-white shadow-2xl sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:min-h-[calc(100vh-64px)]">
        {/* Header */}
        <header
          className={`sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-gray-100 bg-white/95 px-4 py-3 backdrop-blur-md transition-shadow sm:px-6 md:px-8 ${
            scrolled ? "shadow-sm" : ""
          }`}
        >
          <div className="flex items-center gap-3 md:gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-2xl bg-gray-50 px-3 py-2 transition-colors hover:bg-gray-100"
            >
              <i className="fa-solid fa-layer-group text-sm text-gray-900"></i>
              <span className="hidden text-sm font-semibold text-gray-900 sm:inline">
                Nestify
              </span>
            </Link>

            <div className="hidden items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-2 sm:flex">
              <span className="text-sm text-gray-500">Sofa Collection</span>
              <i className="fa-solid fa-chevron-down text-xs text-gray-400"></i>
            </div>
          </div>

          {/* Search - desktop */}
          <div className="hidden flex-1 justify-center md:flex">
            <form
              onSubmit={handleSearch}
              className="relative w-full max-w-md"
            >
              <input
                type="text"
                placeholder="Search furniture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-full border border-gray-100 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100"
              />
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </form>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white transition-transform hover:scale-105 md:hidden"
            >
              <Search className="h-4 w-4" />
            </button>

            <button className="hidden items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 sm:flex">
              <i className="fa-solid fa-mobile-screen"></i>
              <span>App</span>
            </button>

            <Link
              to="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-medium text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-700 transition-colors hover:bg-gray-50"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-[10px] font-medium text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/profile"
              className="hidden items-center gap-2 rounded-full border border-gray-100 bg-white px-3 py-1.5 transition-colors hover:bg-gray-50 sm:flex"
            >
              <span className="text-sm text-gray-700">Candice Wu</span>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
                alt="Profile"
                className="h-7 w-7 rounded-full object-cover"
              />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-700 md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="relative">{children}</main>

        {/* Mobile search overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 p-4 pt-24 backdrop-blur-sm md:hidden"
              onClick={() => setSearchOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <form onSubmit={handleSearch} className="relative">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search furniture..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 w-full rounded-2xl bg-gray-50 pl-11 pr-12 text-base text-gray-900 outline-none"
                  />
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-gray-200 text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm md:hidden"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 z-50 h-full w-[280px] bg-white shadow-2xl md:hidden"
              >
                <div className="flex items-center justify-between border-b border-gray-100 p-5">
                  <span className="text-lg font-semibold text-gray-900">Menu</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="mb-6 flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
                      alt="Profile"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Candice Wu</p>
                      <p className="text-xs text-gray-500">Creative Director</p>
                    </div>
                  </div>

                  <nav className="space-y-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const active = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                            active
                              ? "bg-gray-900 text-white"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <Link
                      to="/cart"
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <span className="flex items-center gap-3">
                        <ShoppingBag className="h-5 w-5" />
                        Cart
                      </span>
                      {cartCount > 0 && (
                        <span className="rounded-full bg-gray-900 px-2 py-0.5 text-xs text-white">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      to="/wishlist"
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <span className="flex items-center gap-3">
                        <Heart className="h-5 w-5" />
                        Wishlist
                      </span>
                      {wishlistCount > 0 && (
                        <span className="rounded-full bg-rose-500 px-2 py-0.5 text-xs text-white">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
