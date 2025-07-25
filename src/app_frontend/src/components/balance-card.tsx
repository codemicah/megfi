"use client";

import { motion } from 'framer-motion';

export function BalanceCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="gradient-card rounded-2xl p-6 mb-6"
    >
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-sm text-gray-400 mb-2"
      >
        Total balance
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold"
      >
        $16,235.34
      </motion.h2>
    </motion.div>
  );
}