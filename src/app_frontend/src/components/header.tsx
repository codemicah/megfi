"use client";

import { MoreVertical } from "lucide-react";
import { UserAvatar } from "@/components/ui/user-avatar";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between mb-6"
    >
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <UserAvatar
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
            alt="User"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-lg font-semibold">Welcome back!</h1>
          <p className="text-sm text-gray-400">Davide Tacchino</p>
        </motion.div>
      </div>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="p-2"
      >
        <MoreVertical className="w-6 h-6 text-gray-400" />
      </motion.button>
    </motion.div>
  );
}