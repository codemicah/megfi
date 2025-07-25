import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AdjustLTVProps {
  symbol: string;
}

export function AdjustLTV({ symbol }: AdjustLTVProps) {
  const [percentage, setPercentage] = useState(100);
  const [mode, setMode] = useState<'add' | 'remove'>('add');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Adjust LTV</h1>
        <div className="mb-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#00FF9D]">32%</span>
            <span className="text-gray-400">Current LTV</span>
          </div>
          <p className="text-sm text-gray-400">Total Debt</p>
        </div>
      </div>

      <div className="bg-[#1A1B30] rounded-xl p-4">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Collateral Amount</span>
          <span>{symbol}</span>
        </div>
        <p className="text-gray-400 text-sm">Balance: 8098.74</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>LTV</span>
          <span>78% Initial LTV</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>78&lt; LTC &lt;= 85%</span>
          <span>85% Margin Call</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>85% &lt; LTV &lt; 91%</span>
          <span>91% Liquidation Line</span>
        </div>
      </div>

      <div>
        <p className="mb-4">Adjust LTV</p>
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
      </div>

      <div>
        <p className="mb-4">Collateral Amount</p>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setMode('add')}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
              mode === 'add' ? "text-[#00A3FF]" : "text-gray-400"
            )}
          >
            Add
          </button>
          <button
            onClick={() => setMode('remove')}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
              mode === 'remove' ? "text-[#00A3FF]" : "text-gray-400"
            )}
          >
            Remove
          </button>
        </div>
        <input
          type="number"
          defaultValue="200"
          className="w-full bg-[#1A1B30] rounded-xl p-4 mb-6 text-white"
        />
      </div>

      <button className="w-full bg-[#00A3FF] hover:bg-[#0093E9] text-white py-3 rounded-xl font-medium transition-colors">
        Add Collateral
      </button>
    </div>
  );
}