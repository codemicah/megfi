"use client";

interface BorrowRateProps {
  rate: number;
  symbol: string;
}

export function BorrowRate({ rate, symbol }: BorrowRateProps) {
  return (
    <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-sm">
      <h4 className="text-sm font-medium mb-2">Borrow Rate</h4>
      <div className="flex flex-col gap-2">
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
          {rate}%
        </div>
        <div className="text-sm text-gray-400">
          Borrow USDC directly using your {symbol} as collateral
        </div>
      </div>
    </div>
  );
}