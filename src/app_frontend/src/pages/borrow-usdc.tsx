"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bitcoin, 
  DollarSign, 
  ArrowLeft, 
  AlertTriangle, 
  TrendingDown,
  Shield,
  Info,
  Calculator,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CKBTC_CANISTER_ID, CKBTC_ICP_CANISTER_ID, ICP_CANISTER_ID, MAIN_CANISTER_ID, useActors } from '@/hooks/useActors';
import { useAuth } from '@/providers/auth-provider';
import { Principal } from '@dfinity/principal';
import { principalToSubAccount } from '@dfinity/utils';

export function BorrowUSDC() {
  const [amount, setAmount] = useState('');
  const [ckBTCBalance, setckBTCBalance] = useState(0n);
  const [percentage, setPercentage] = useState(50);
  const [loading, setLoading] = useState(false);
  const [showRiskWarning, setShowRiskWarning] = useState(false);
  
  const { identity } = useAuth();
  const { ckbtcLedger, mainCanister, ckbtc_ckusdc, ckbtc_icp, icp, ckusdc } = useActors();
  const principal = identity?.getPrincipal();
  const subaccount = principalToSubAccount(principal!);

  // Calculate loan details based on input
  const btcPrice = 37500; // Mock price
  const collateralValue = Number(amount || 0) * btcPrice;
  const maxLTV = 0.7; // 70% LTV
  const usdcToBorrow = collateralValue * (percentage / 100) * maxLTV;
  const liquidationLTV = 0.85; // 85%
  const liquidationPrice = (usdcToBorrow / (Number(amount || 1) * liquidationLTV));
  const interestRate = 0.045; // 4.5% APR

  const handleBorrow = async () => {
    if (!principal || !amount) return;
    
    setShowRiskWarning(true);
  };

  const confirmBorrow = async () => {
    setLoading(true);
    setShowRiskWarning(false);
    
    try {
      // Your existing borrow logic here
      const swapArgs = {
        amountIn: amount,
        zeroForOne: true,
        amountOutMinimum: (usdcToBorrow * 0.99).toString() // 1% slippage
      };

      // Simplified for demo - actual implementation would include all steps
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Borrow transaction completed");
    } catch (error) {
      console.error('Error borrowing USDC:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchBalance() {
      if (!principal) return;
      
      try {
        const balance = await ckbtcLedger.icrc1_balance_of({ 
          owner: principal!, 
          subaccount: [] 
        });
        setckBTCBalance(balance!);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    }

    fetchBalance();
  }, [ckbtcLedger, principal]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      {/* Page Header */}
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="body-small">Back to Dashboard</span>
        </Link>
        <h1 className="heading-large text-text-primary mb-2">Borrow USDC</h1>
        <p className="body-regular text-text-secondary">
          Use your Bitcoin as collateral to borrow stablecoins
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Borrow Form */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="card-container"
          >
            {/* Collateral Input */}
            <div className="mb-6">
              <label className="body-small text-text-muted mb-2 block">Collateral Amount</label>
              <div className="bg-bg-tertiary rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-yellow/20 rounded-xl flex items-center justify-center">
                      <Bitcoin className="w-5 h-5 text-accent-yellow" />
                    </div>
                    <div>
                      <p className="body-regular font-medium text-text-primary">ckBTC</p>
                      <p className="body-tiny text-text-muted">Bitcoin</p>
                    </div>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0000"
                    className="bg-transparent text-right text-2xl font-semibold text-text-primary focus:outline-none w-40"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="body-tiny text-text-muted">
                    Available: {(Number(ckBTCBalance) / 1e8).toFixed(8)} ckBTC
                  </p>
                  <p className="body-tiny text-text-secondary">
                    ≈ ${collateralValue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* LTV Selector */}
            <div className="mb-6">
              <label className="body-small text-text-muted mb-3 block">
                Loan-to-Value Ratio ({percentage}%)
              </label>
              <div className="space-y-3">
                <input
                  type="range"
                  min="25"
                  max="70"
                  value={percentage}
                  onChange={(e) => setPercentage(Number(e.target.value))}
                  className="w-full h-2 bg-bg-tertiary rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--accent-mint)) 0%, hsl(var(--accent-mint)) ${(percentage - 25) / 45 * 100}%, hsl(var(--bg-tertiary)) ${(percentage - 25) / 45 * 100}%, hsl(var(--bg-tertiary)) 100%)`
                  }}
                />
                <div className="flex justify-between">
                  {[25, 40, 55, 70].map((value) => (
                    <button
                      key={value}
                      onClick={() => setPercentage(value)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        percentage === value
                          ? 'bg-accent-mint text-text-inverse'
                          : 'bg-bg-tertiary text-text-secondary hover:bg-white/10'
                      }`}
                    >
                      {value}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Borrow Amount Display */}
            <div className="bg-accent-teal/10 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-teal/20 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-accent-teal" />
                  </div>
                  <div>
                    <p className="body-small text-text-muted">You will receive</p>
                    <p className="heading-medium text-text-primary">
                      ${usdcToBorrow.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="body-tiny text-text-muted">Interest Rate</p>
                  <p className="body-regular font-semibold text-text-primary">{(interestRate * 100).toFixed(1)}% APR</p>
                </div>
              </div>
            </div>

            {/* Loan Details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-3 border-b border-white/[0.05]">
                <span className="body-small text-text-secondary">Collateral Value</span>
                <span className="body-regular font-medium text-text-primary">
                  ${collateralValue.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/[0.05]">
                <span className="body-small text-text-secondary">Liquidation Price</span>
                <span className="body-regular font-medium text-semantic-negative">
                  ${liquidationPrice.toLocaleString()} / BTC
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/[0.05]">
                <span className="body-small text-text-secondary">Health Factor</span>
                <span className="body-regular font-medium text-semantic-positive">
                  {((liquidationLTV / (percentage / 100)) * 0.7).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="body-small text-text-secondary">Est. Monthly Interest</span>
                <span className="body-regular font-medium text-text-primary">
                  ${(usdcToBorrow * interestRate / 12).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleBorrow}
              disabled={!amount || Number(amount) <= 0 || loading}
              className={`w-full py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                !amount || Number(amount) <= 0
                  ? 'bg-bg-tertiary text-text-muted cursor-not-allowed'
                  : 'bg-accent-teal text-text-inverse hover:bg-accent-teal/90'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Borrow USDC</span>
              )}
            </button>
          </motion.div>

          {/* Risk Warning */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="card-container bg-semantic-warning/10 border border-semantic-warning/20 mt-6"
          >
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-semantic-warning flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="body-regular font-semibold text-text-primary mb-2">Risk Warning</h4>
                <p className="body-small text-text-secondary">
                  Borrowing against volatile assets like Bitcoin carries risks. If BTC price falls below 
                  ${liquidationPrice.toLocaleString()}, your position may be liquidated. Monitor your 
                  health factor and consider adding collateral if needed.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info Sidebar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Key Metrics */}
          <div className="card-container">
            <h4 className="heading-small text-text-primary mb-4">Key Metrics</h4>
            <div className="space-y-4">
              <div className="card-mini">
                <div className="flex items-center justify-between mb-1">
                  <span className="body-tiny text-text-muted">Max LTV</span>
                  <Shield className="w-4 h-4 text-accent-mint" />
                </div>
                <p className="body-regular font-semibold text-text-primary">70%</p>
              </div>
              <div className="card-mini">
                <div className="flex items-center justify-between mb-1">
                  <span className="body-tiny text-text-muted">Liquidation LTV</span>
                  <TrendingDown className="w-4 h-4 text-semantic-negative" />
                </div>
                <p className="body-regular font-semibold text-text-primary">85%</p>
              </div>
              <div className="card-mini">
                <div className="flex items-center justify-between mb-1">
                  <span className="body-tiny text-text-muted">Borrow APR</span>
                  <Calculator className="w-4 h-4 text-accent-teal" />
                </div>
                <p className="body-regular font-semibold text-text-primary">4.5%</p>
              </div>
            </div>
          </div>

          {/* How it Works */}
          <div className="card-container">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-accent-mint" />
              <h4 className="heading-small text-text-primary">How Borrowing Works</h4>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-accent-mint/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="body-tiny font-semibold text-accent-mint">1</span>
                </div>
                <p className="body-small text-text-secondary">
                  Deposit ckBTC as collateral
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-accent-mint/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="body-tiny font-semibold text-accent-mint">2</span>
                </div>
                <p className="body-small text-text-secondary">
                  Choose your loan amount (up to 70% LTV)
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-accent-mint/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="body-tiny font-semibold text-accent-mint">3</span>
                </div>
                <p className="body-small text-text-secondary">
                  Receive USDC instantly
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-accent-mint/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="body-tiny font-semibold text-accent-mint">4</span>
                </div>
                <p className="body-small text-text-secondary">
                  Repay anytime to unlock collateral
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Risk Confirmation Modal */}
      {showRiskWarning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card-container max-w-md w-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-semantic-warning/20 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-semantic-warning" />
              </div>
              <h3 className="heading-medium text-text-primary">Confirm Borrow</h3>
            </div>
            
            <div className="space-y-4 mb-6">
              <p className="body-regular text-text-secondary">
                You are about to borrow <span className="font-semibold text-text-primary">
                ${usdcToBorrow.toLocaleString()}</span> using <span className="font-semibold text-text-primary">
                {amount} ckBTC</span> as collateral.
              </p>
              
              <div className="bg-semantic-warning/10 rounded-xl p-4">
                <p className="body-small text-text-primary">
                  <strong>Important:</strong> Your collateral will be liquidated if BTC price falls below
                  <span className="text-semantic-negative font-semibold"> ${liquidationPrice.toLocaleString()}</span>
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRiskWarning(false)}
                className="flex-1 py-3 rounded-xl bg-bg-tertiary text-text-primary font-medium hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmBorrow}
                className="flex-1 py-3 rounded-xl bg-accent-teal text-text-inverse font-medium hover:bg-accent-teal/90 transition-colors"
              >
                Confirm & Borrow
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}