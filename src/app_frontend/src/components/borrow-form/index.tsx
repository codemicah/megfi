"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DepositSection } from './deposit-section';
import { BorrowSection } from './borrow-section';
import { LTVSlider } from './ltv-slider';
import { BorrowRate } from './borrow-rate';

 console.log('borrow form');


interface BorrowFormProps {
  symbol: string;
}

export function BorrowForm({ symbol }: BorrowFormProps) {
  const [depositAmount, setDepositAmount] = useState('');
  const [borrowAmount, setBorrowAmount] = useState('');
  const [ltv, setLtv] = useState(53.27);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4">
        <section className="rounded-sm bg-white/5 p-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <DepositSection
              symbol={symbol}
              amount={depositAmount}
              onAmountChange={setDepositAmount}
            />
            <BorrowSection
              amount={borrowAmount}
              onAmountChange={setBorrowAmount}
            />
          </div>

          <div className="mt-6 p-4 bg-white/5 rounded-sm">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">Loan to Value (LTV)</h4>
                <span className="text-sm font-medium">{ltv}%</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Ratio of the collateral value to the borrowed value</span>
                <span>max. 82.00%</span>
              </div>
              <LTVSlider value={ltv} onChange={setLtv} />
            </div>
          </div>

          <BorrowRate rate={8.51} symbol={symbol} />
        </section>

        <button
          type="submit"
          className={cn(
            "w-full py-3 px-4 rounded-sm text-white font-medium",
            "bg-gradient-to-r from-blue-500 to-purple-500",
            "hover:from-blue-600 hover:to-purple-600",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          Borrow
        </button>
      </form>
    </motion.div>
  );
}