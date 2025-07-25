"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[60vh] flex flex-col items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center max-w-md"
      >
        {/* Icon */}
        <div className="w-20 h-20 bg-semantic-negative/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-semantic-negative" />
        </div>
        
        {/* Content */}
        <h1 className="heading-xl text-text-primary mb-3">404</h1>
        <p className="heading-medium text-text-secondary mb-2">Page Not Found</p>
        <p className="body-regular text-text-muted mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Action */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent-mint text-text-inverse rounded-xl font-medium hover:bg-accent-mint/90 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}