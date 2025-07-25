"use client";

import { Bitcoin, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

export function DepositedAssets() {
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="mb-6"
    >
      <motion.h3 
        variants={item}
        className="text-lg font-semibold mb-4"
      >
        Deposited Assets
      </motion.h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <motion.div variants={item}>
          <Link to="/asset/BTC" className="block">
            <div className="glass-effect rounded-xl p-4 h-full hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Bitcoin className="w-6 h-6 text-[#F7931A]" />
                <span className="font-medium">BTC</span>
              </div>
              <p className="text-xl font-semibold">8098.7</p>
              <p className="text-sm text-green-400">+2.2%</p>
            </div>
          </Link>
        </motion.div>
        <motion.div variants={item}>
          <Link to="/asset/USDC" className="block">
            <div className="glass-effect rounded-xl p-4 h-full hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-6 h-6 text-[#2775CA]" />
                <span className="font-medium">USDC</span>
              </div>
              <p className="text-xl font-semibold">8098.7</p>
              <p className="text-sm text-green-400">+2.2%</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}