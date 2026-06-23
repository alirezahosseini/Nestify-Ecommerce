import { useState, useCallback, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import Layout from "./components/Layout";
import { CartProvider } from "./hooks/useCart";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Team from "./pages/Team";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/team" element={<Team />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadComplete, setLoadComplete] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setLoadComplete(true);
    setTimeout(() => setIsLoading(false), 100);
  }, []);

  // Preload images
  useEffect(() => {
    const images = [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=600&h=300&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    ];

    let loaded = 0;
    images.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
      };
      img.onerror = () => {
        loaded++;
      };
      img.src = src;
    });
  }, []);

  return (
    <>
      <LoadingScreen
        isLoading={isLoading}
        onLoadingComplete={handleLoadingComplete}
      />
      <div
        className={`transition-opacity duration-500 ${
          loadComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </div>
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}
