"use client";

import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TokenSelectorProps {
  selectedToken: string;
  balance: string;
  usdValue: string;
}

export function TokenSelector({ selectedToken, balance, usdValue }: TokenSelectorProps) {
  return (
    <div className="flex items-center gap-2 p-3 rounded-sm border border-white/10 bg-white/5">
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 rounded-sm bg-white/5 hover:bg-white/10 transition-colors"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        <span className="text-sm font-medium">{selectedToken}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      <div className="flex flex-col gap-0.5 ml-2">
        <span className="text-sm text-gray-400">{balance}</span>
        <span className="text-xs text-gray-500">{usdValue}</span>
      </div>
    </div>
  );
}