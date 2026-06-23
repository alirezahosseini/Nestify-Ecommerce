import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50"
      >
        <SearchX className="h-10 w-10 text-gray-300" />
      </motion.div>
      <h1 className="text-4xl font-semibold text-gray-900">404</h1>
      <h2 className="mt-2 text-xl text-gray-600">Page not found</h2>
      <p className="mt-2 text-center text-sm text-gray-500">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white"
      >
        <Home className="h-4 w-4" />
        Back to home
      </Link>
    </div>
  );
}
