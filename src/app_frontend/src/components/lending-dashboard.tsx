"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet,
  TrendingUp,
  Plus,
  ChevronRight,
  Clock,
  AlertTriangle,
  DollarSign,
  BarChart2
} from 'lucide-react';

interface Loan {
  id: number;
  type: 'borrow' | 'lend';
  amount: string;
  collateral?: string;
  apy?: string;
  interest?: string;
  earned?: string;
  timeLeft: string;
  status: 'active' | 'warning' | 'liquidation';
  healthFactor?: number;
}

const mockLoans: Loan[] = [
  {
    id: 1,
    type: 'borrow',
    amount: '1000 USDC',
    collateral: '0.8 ETH',
    interest: '3.5%',
    timeLeft: '25 days',
    status: 'active',
    healthFactor: 1.8
  },
  {
    id: 2,
    type: 'lend',
    amount: '500 DAI',
    apy: '5.2%',
    earned: '12.5 DAI',
    timeLeft: '15 days',
    status: 'active'
  },
  {
    id: 3,
    type: 'borrow',
    amount: '2500 USDT',
    collateral: '2.1 ETH',
    interest: '4.1%',
    timeLeft: '12 days',
    status: 'warning',
    healthFactor: 1.2
  }
];

const marketData = [
  { asset: 'USDC', supplyApy: '3.2%', borrowApy: '4.5%', totalSupply: '$12.5M', totalBorrow: '$8.2M', utilization: '65%' },
  { asset: 'ETH', supplyApy: '2.8%', borrowApy: '3.9%', totalSupply: '$25.1M', totalBorrow: '$15.7M', utilization: '62%' },
  { asset: 'DAI', supplyApy: '3.5%', borrowApy: '4.8%', totalSupply: '$8.7M', totalBorrow: '$5.1M', utilization: '58%' },
  { asset: 'USDT', supplyApy: '3.1%', borrowApy: '4.3%', totalSupply: '$15.3M', totalBorrow: '$9.8M', utilization: '64%' }
];

export function LendingDashboard() {
  const [activeTab, setActiveTab] = useState<'positions' | 'market'>('positions');

  const getHealthColor = (healthFactor?: number) => {
    if (!healthFactor) return 'text-gray-400';
    if (healthFactor >= 1.5) return 'text-green-400';
    if (healthFactor >= 1.2) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Lending & Borrowing</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('positions')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'positions'
                ? 'bg-[#00A3FF] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Your Positions
          </button>
          <button
            onClick={() => setActiveTab('market')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'market'
                ? 'bg-[#00A3FF] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Market
          </button>
        </div>
      </div>

      {activeTab === 'positions' ? (
        <div className="space-y-4">
          <div className="flex space-x-4 mb-6">
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#00A3FF] hover:bg-[#0093E9] rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              <span>Borrow</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              <span>Lend</span>
            </button>
          </div>

          <div className="glass-effect rounded-xl p-4">
            <h3 className="text-lg font-medium mb-4">Active Positions</h3>
            <div className="space-y-3">
              {mockLoans.map((loan) => (
                <motion.div
                  key={loan.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 glass-effect rounded-xl group hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${
                      loan.type === 'borrow' ? 'bg-red-500/20' : 'bg-green-500/20'
                    }`}>
                      {loan.type === 'borrow' ? (
                        <Wallet className={`w-5 h-5 ${
                          loan.type === 'borrow' ? 'text-red-500' : 'text-green-500'
                        }`} />
                      ) : (
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">
                        {loan.type === 'borrow' ? 'Borrowed' : 'Lending'} {loan.amount}
                      </div>
                      <div className="text-sm text-gray-400">
                        {loan.type === 'borrow'
                          ? `Collateral: ${loan.collateral}`
                          : `APY: ${loan.apy}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    {loan.type === 'borrow' && (
                      <div className="text-right">
                        <div className={`text-sm font-medium ${getHealthColor(loan.healthFactor)}`}>
                          Health Factor: {loan.healthFactor?.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-400">
                          Interest: {loan.interest}
                        </div>
                      </div>
                    )}
                    {loan.type === 'lend' && (
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-400">
                          Earned: {loan.earned}
                        </div>
                        <div className="text-sm text-gray-400">
                          APY: {loan.apy}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{loan.timeLeft}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-500/10 p-4 rounded-xl"
          >
            <div className="flex items-center space-x-2 text-yellow-500">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Risk Warning</span>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Borrowing crypto assets carries significant risks. Please ensure you understand
              the terms and maintain adequate collateral to avoid liquidation.
            </p>
          </motion.div>
        </div>
      ) : (
        <div className="glass-effect rounded-xl p-4">
          <div className="grid grid-cols-7 gap-4 text-sm text-gray-400 pb-2 mb-4 border-b border-gray-800">
            <div>Asset</div>
            <div>Supply APY</div>
            <div>Borrow APY</div>
            <div>Total Supply</div>
            <div>Total Borrow</div>
            <div>Utilization</div>
            <div></div>
          </div>
          {marketData.map((market, index) => (
            <motion.div
              key={market.asset}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="grid grid-cols-7 gap-4 py-3 items-center hover:bg-white/5 rounded-lg transition-colors group"
            >
              <div className="font-medium">{market.asset}</div>
              <div className="text-green-400">{market.supplyApy}</div>
              <div className="text-red-400">{market.borrowApy}</div>
              <div>{market.totalSupply}</div>
              <div>{market.totalBorrow}</div>
              <div>{market.utilization}</div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="px-3 py-1 bg-[#00A3FF] hover:bg-[#0093E9] rounded-lg text-sm transition-colors">
                  Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}