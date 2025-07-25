import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { SupplyForm } from '@/components/supply-form';
import { WithdrawForm } from '@/components/withdraw-form';
import { AdjustLTV } from '@/components/adjust-ltv';
import { RepayForm } from '@/components/repay-form';
import { AssetBalance } from '@/components/asset-balance';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function AssetAction() {
  const { symbol, action } = useParams<{ symbol: string; action: string }>();

  const renderContent = () => {
    switch (action) {
      case 'supply':
        return <SupplyForm symbol={symbol!} />;
      case 'withdraw':
        return <WithdrawForm symbol={symbol!} />;
      case 'adjust-ltv':
        return <AdjustLTV symbol={symbol!} />;
      case 'repay':
        return <RepayForm symbol={symbol!} />;
      default:
        return null;
    }
  };

  const getActionTitle = () => {
    switch (action) {
      case 'supply':
        return 'Supply Assets';
      case 'withdraw':
        return 'Withdraw Assets';
      case 'adjust-ltv':
        return 'Adjust LTV';
      case 'repay':
        return 'Repay Loan';
      default:
        return 'Asset Action';
    }
  };

  const getActionDescription = () => {
    switch (action) {
      case 'supply':
        return 'Deposit assets to earn interest';
      case 'withdraw':
        return 'Remove your supplied assets';
      case 'adjust-ltv':
        return 'Manage your loan-to-value ratio';
      case 'repay':
        return 'Pay back your borrowed assets';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-primary to-bg-secondary">
      <Header />
      <div className="container mx-auto px-4 pt-20 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back Button */}
          <Button
            variant="ghost"
            asChild
            className="mb-6 hover:bg-accent-mint/10"
          >
            <Link to={`/asset/${symbol}`} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to {symbol}
            </Link>
          </Button>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{getActionTitle()}</h1>
            <p className="text-muted-foreground">{getActionDescription()}</p>
          </div>

          {/* Asset Balance */}
          <AssetBalance symbol={symbol!} />

          {/* Action Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}