"use client";

import { Info, Plus } from 'lucide-react';
import { TokenSelector } from './token-selector';

interface DepositSectionProps {
  symbol: string;
  amount: string;
  onAmountChange: (value: string) => void;
}

export function DepositSection({ symbol, amount, onAmountChange }: DepositSectionProps) {
  return (
    <div className="rounded-sm bg-white/5 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex h-8 items-center gap-1">
          <h4 className="text-sm font-medium">Deposit</h4>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <button
          type="button"
          className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-400"
        >
          Add more
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <TokenSelector
          selectedToken={symbol}
          balance="0.003 ETH"
          usdValue="$11.36"
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