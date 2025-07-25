"use client";

import { Bitcoin, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

export function WalletAssets() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="flex justify-between items-center mb-4">
        <motion.h3 
          variants={item}
          className="text-lg font-semibold"
        >
          Wallet Assets
        </motion.h3>
        <motion.button 
          variants={item}
          className="text-sm text-gray-400"
        >
          View All
        </motion.button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <motion.div variants={item}>
          <Link to="/asset/BTC">
            <div className="flex items-center justify-between p-4 glass-effect rounded-xl hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <Bitcoin className="w-8 h-8 text-[#F7931A]" />
                <div>
                  <p className="font-medium">Bitcoin</p>
                  <p className="text-sm text-gray-400">0.23</p>
                </div>
              </div>
              <p className="font-medium">$87000</p>
            </div>
          </Link>
        </motion.div>
        <motion.div variants={item}>
          <Link to="/asset/USDC">
            <div className="flex items-center justify-between p-4 glass-effect rounded-xl hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-[#2775CA]" />
                <div>
                  <p className="font-medium">USDC</p>
                  <p className="text-sm text-gray-400">10000</p>
                </div>
              </div>
              <p className="font-medium">$1000</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}