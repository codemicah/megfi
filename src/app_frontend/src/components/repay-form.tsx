import { useState } from 'react';
import { cn } from '@/lib/utils';

interface RepayFormProps {
  symbol: string;
}

export function RepayForm({ symbol }: RepayFormProps) {
  const [percentage, setPercentage] = useState(100);
  
  const stats = [
    { label: 'Total Debt', value: '16%' },
    { label: 'Remaining Debt', value: '16%' },
    { label: 'LTV after repayment', value: '700$' },
    { label: 'Returned collateral amount', value: '0.05%' },
  ];

  return (
    <div className="glass-effect rounded-3xl p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Repay</h3>
        <p className="text-gray-400">I want to repay</p>
      </div>

      <div className="bg-[#1A1B30] rounded-xl p-4 mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Balance: 8098.74</span>
          <span>Deposited: 189.10</span>
        </div>
        <div className="flex justify-end items-center gap-2">
          <span className="text-gray-400">{symbol}</span>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {[10, 25, 50, 75, 100].map((value) => (
          <button
            key={value}
            onClick={() => setPercentage(value)}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
              percentage === value
                ? "bg-[#00A3FF] text-white"
                : "bg-[#1A1B30] text-gray-400"
            )}
          >
            {value}%
          </button>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="flex justify-between text-sm">
            <span className="text-gray-400">{stat.label}</span>
            <span>{stat.value}</span>
          </div>
        ))}
      </div>

      <button className="w-full bg-[#00A3FF] hover:bg-[#0093E9] text-white py-3 rounded-xl font-medium transition-colors">
        Repay
      </button>
    </div>
  );
}