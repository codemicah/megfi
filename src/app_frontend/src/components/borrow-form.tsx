import { useState } from 'react';
import { cn } from '@/lib/utils';

interface BorrowFormProps {
  symbol: string;
}

export function BorrowForm({ symbol }: BorrowFormProps) {
  const [percentage, setPercentage] = useState(100);
  
  const stats = [
    { label: 'Annualized interest rate', value: '16%' },
    { label: 'Net Annualized interest rate', value: '16%' },
    { label: 'Initial LTV', value: '82%' },
    { label: 'LTV after borrow', value: '0.05%' },
    { label: 'Liquidation LTV', value: '93%' },
    { label: 'Liquidation Price (BTC/USD)', value: '0.01%' },
  ];

  return (
    <div className="relative bg-gradient-to-b from-[#6366F1]/20 to-[#8B5CF6]/20 rounded-3xl p-6 backdrop-blur-xl">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">Borrow</h3>
        <p className="text-gray-400">I want to borrow</p>
      </div>

      <div className="bg-[#1A1B30]/80 rounded-xl p-4 mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Collateral amount:</span>
          <span>{symbol}</span>
        </div>
        <input
          type="number"
          className="w-full bg-transparent text-xl font-semibold focus:outline-none"
          placeholder="0.00"
        />
      </div>

      <div className="flex gap-2 mb-8">
        {[10, 25, 50, 75, 100].map((value) => (
          <button
            key={value}
            onClick={() => setPercentage(value)}
            className={cn(
              "flex-1 py-3 rounded-xl text-sm font-medium transition-colors",
              percentage === value
                ? "bg-[#00A3FF] text-white"
                : "bg-[#1A1B30]/60 text-gray-400"
            )}
          >
            {value}%
          </button>
        ))}
      </div>

      <div className="space-y-3 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex justify-between text-sm">
            <span className="text-gray-400">{stat.label}</span>
            <span className="text-white">{stat.value}</span>
          </div>
        ))}
      </div>

      <button className="w-full bg-[#00A3FF] hover:bg-[#0093E9] text-white py-3.5 rounded-xl font-medium transition-colors text-lg">
        Borrow
      </button>
    </div>
  );
}