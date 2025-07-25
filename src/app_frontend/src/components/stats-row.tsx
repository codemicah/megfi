import { DollarSign, TrendingUp, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function StatsRow() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-xl p-4"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400">Total Borrowed</span>
          <DollarSign className="w-5 h-5 text-red-400" />
        </div>
        <div className="text-2xl font-bold">$3,500.00</div>
        <div className="text-gray-400 text-sm">Collateral: $5,800.00</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-effect rounded-xl p-4"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400">Total Lending</span>
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <div className="text-2xl font-bold">$500.00</div>
        <div className="text-green-400 text-sm">Earned: $12.50</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-effect rounded-xl p-4"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400">Net APY</span>
          <BarChart2 className="w-5 h-5 text-blue-400" />
        </div>
        <div className="text-2xl font-bold">+2.8%</div>
        <div className="text-blue-400 text-sm">+0.3% last week</div>
      </motion.div>
    </div>
  );
}