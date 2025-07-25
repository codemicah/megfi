"use client";

import { TokenSelector } from './token-selector';

interface BorrowSectionProps {
  amount: string;
  onAmountChange: (value: string) => void;
}

export function BorrowSection({ amount, onAmountChange }: BorrowSectionProps) {
  return (
    <div className="rounded-sm bg-white/5 p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium">Borrow</h4>
      </div>

      <div className="flex flex-col gap-2">
        <TokenSelector
          selectedToken="USDC"
          balance="0.00 USDC"
          usdValue="$0.00"
        />
        <div className="flex flex-col gap-1">
          <input
            type="text"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="w-full bg-transparent text-xl font-medium focus:outline-none"
            placeholder="0.00"
          />
          <div className="text-sm text-gray-400">$0.00</div>
        </div>
      </div>
    </div>
  );
}