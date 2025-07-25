"use client";

import { motion } from 'framer-motion';
import { 
  Bitcoin, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  ArrowLeft,
  Activity,
  Clock,
  Percent,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function AccountOverview() {
  // Mock data - would be fetched from your backend
  const portfolioData = [
    { name: 'ckBTC', value: 30, color: 'hsl(var(--accent-yellow))' },
    { name: 'USDC Borrowed', value: 21, color: 'hsl(var(--accent-teal))' },
    { name: 'Available', value: 9, color: 'hsl(var(--bg-tertiary))' }
  ];

  const positions = [
    {
      id: 1,
      asset: 'ckBTC',
      amount: '0.0008',
      value: '$30.00',
      change: '+12.5%',
      changeType: 'positive',
      icon: Bitcoin,
      color: 'accent-yellow'
    },
    {
      id: 2,
      asset: 'USDC Loan',
      amount: '21.00',
      value: '$21.00',
      change: '4.5% APR',
      changeType: 'neutral',
      icon: DollarSign,
      color: 'accent-teal'
    }
  ];

  const healthMetrics = [
    { 
      label: 'Health Factor', 
      value: '2.14', 
      status: 'good',
      description: 'Position is safe'
    },
    { 
      label: 'Current LTV', 
      value: '35%', 
      max: '70%',
      status: 'good' 
    },
    { 
      label: 'Liquidation Price', 
      value: '$22,059',
      current: '$37,500',
      status: 'warning' 
    },
    { 
      label: 'Collateral Ratio', 
      value: '285%',
      min: '150%',
      status: 'good' 
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'deposit',
      asset: 'BTC',
      amount: '0.0008',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'borrow',
      asset: 'USDC',
      amount: '21.00',
      time: '1 hour ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'interest',
      asset: 'USDC',
      amount: '0.08',
      time: '1 day ago',
      status: 'pending'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-4 h-4 text-semantic-positive" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-semantic-warning" />;
      case 'danger':
        return <XCircle className="w-4 h-4 text-semantic-negative" />;
      default:
        return null;
    }
  };

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
        <h1 className="heading-large text-text-primary mb-2">Account Overview</h1>
        <p className="body-regular text-text-secondary">
          Monitor your portfolio, positions, and account health
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Portfolio Summary */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="card-container"
          >
            <h2 className="heading-medium text-text-primary mb-6">Portfolio Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Chart */}
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={portfolioData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {portfolioData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="heading-large text-text-primary">$60</p>
                      <p className="body-tiny text-text-muted">Total Value</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="card-mini">
                  <div className="flex items-center justify-between mb-2">
                    <span className="body-small text-text-muted">Net Worth</span>
                    <TrendingUp className="w-4 h-4 text-accent-mint" />
                  </div>
                  <p className="heading-medium text-text-primary">$39.00</p>
                  <p className="metric-positive body-tiny mt-1">+$4.68 (13.6%)</p>
                </div>
                
                <div className="card-mini">
                  <div className="flex items-center justify-between mb-2">
                    <span className="body-small text-text-muted">Total Borrowed</span>
                    <DollarSign className="w-4 h-4 text-accent-teal" />
                  </div>
                  <p className="heading-medium text-text-primary">$21.00</p>
                  <p className="body-tiny text-text-secondary mt-1">4.5% APR</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Positions */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="card-container"
          >
            <h2 className="heading-medium text-text-primary mb-4">Active Positions</h2>
            
            <div className="space-y-3">
              {positions.map((position) => (
                <div key={position.id} className="bg-bg-tertiary rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-${position.color}/20 rounded-xl flex items-center justify-center`}>
                        <position.icon className={`w-5 h-5 text-${position.color}`} />
                      </div>
                      <div>
                        <p className="body-regular font-medium text-text-primary">{position.asset}</p>
                        <p className="body-tiny text-text-muted">{position.amount}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="body-regular font-semibold text-text-primary">{position.value}</p>
                      <p className={`body-tiny ${
                        position.changeType === 'positive' ? 'text-semantic-positive' : 
                        position.changeType === 'negative' ? 'text-semantic-negative' : 
                        'text-text-secondary'
                      }`}>
                        {position.change}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="card-container"
          >
            <h2 className="heading-medium text-text-primary mb-4">Recent Activity</h2>
            
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'deposit' ? 'bg-accent-mint/20' :
                      activity.type === 'borrow' ? 'bg-accent-teal/20' :
                      'bg-accent-yellow/20'
                    }`}>
                      {activity.type === 'deposit' ? (
                        <ArrowLeft className="w-5 h-5 text-accent-mint rotate-180" />
                      ) : activity.type === 'borrow' ? (
                        <DollarSign className="w-5 h-5 text-accent-teal" />
                      ) : (
                        <Percent className="w-5 h-5 text-accent-yellow" />
                      )}
                    </div>
                    <div>
                      <p className="body-regular text-text-primary capitalize">
                        {activity.type} {activity.asset}
                      </p>
                      <p className="body-tiny text-text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="body-regular font-medium text-text-primary">
                      {activity.type === 'deposit' ? '+' : '-'}{activity.amount} {activity.asset}
                    </p>
                    <p className={`body-tiny ${
                      activity.status === 'completed' ? 'text-semantic-positive' : 'text-text-secondary'
                    }`}>
                      {activity.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Position Health */}
          <div className="card-container">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-accent-mint" />
              <h3 className="heading-small text-text-primary">Position Health</h3>
            </div>
            
            <div className="space-y-4">
              {healthMetrics.map((metric) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="body-small text-text-secondary">{metric.label}</span>
                    {getStatusIcon(metric.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="body-regular font-semibold text-text-primary">
                      {metric.value}
                    </span>
                    {metric.max && (
                      <span className="body-tiny text-text-muted">Max: {metric.max}</span>
                    )}
                    {metric.min && (
                      <span className="body-tiny text-text-muted">Min: {metric.min}</span>
                    )}
                    {metric.current && (
                      <span className="body-tiny text-text-muted">Current: {metric.current}</span>
                    )}
                  </div>
                  {metric.description && (
                    <p className="body-tiny text-text-muted">{metric.description}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-semantic-positive/10 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-semantic-positive" />
                <p className="body-small font-medium text-text-primary">Position Status</p>
              </div>
              <p className="body-tiny text-text-secondary">
                Your position is healthy with a comfortable safety margin
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card-container">
            <h3 className="heading-small text-text-primary mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/deposit-btc" className="block">
                <button className="w-full py-3 px-4 bg-bg-tertiary hover:bg-white/10 rounded-xl text-text-primary font-medium transition-colors text-left">
                  Add Collateral
                </button>
              </Link>
              <Link to="/repay-loan" className="block">
                <button className="w-full py-3 px-4 bg-bg-tertiary hover:bg-white/10 rounded-xl text-text-primary font-medium transition-colors text-left">
                  Repay Loan
                </button>
              </Link>
              <button className="w-full py-3 px-4 bg-bg-tertiary hover:bg-white/10 rounded-xl text-text-primary font-medium transition-colors text-left">
                Export Report
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}