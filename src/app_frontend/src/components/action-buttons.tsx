"use client";

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function ActionButtons() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="flex gap-4 mb-6"
    >
      <motion.div variants={item} className="flex-1">
        <Link
          to="/asset/BTC/repay"
          className="block w-full bg-[#00A3FF] hover:bg-[#0093E9] text-white py-2 rounded-lg font-medium transition-colors text-center"
        >
          Repay
        </Link>
      </motion.div>
      <motion.div variants={item} className="flex-1">
        <Link
          to="/asset/BTC/adjust-ltv"
          className="block w-full bg-opacity-10 bg-white hover:bg-opacity-20 text-white py-2 rounded-lg font-medium transition-colors text-center"
        >
          Adjust LTV
        </Link>
      </motion.div>
    </motion.div>
  );
}