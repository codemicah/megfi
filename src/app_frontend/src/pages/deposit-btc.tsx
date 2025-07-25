"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Copy, 
  Check, 
  Bitcoin, 
  AlertCircle, 
  Loader2, 
  ArrowLeft,
  QrCode,
  Info
} from 'lucide-react';
import { useAuth } from '@/providers/auth-provider';
import { app_backend, idlFactory, canisterId } from "@/../../declarations/app_backend";
import { createAgent } from "@dfinity/utils";
import { useActors } from '@/hooks/useActors';
import { Link } from 'react-router-dom';

const host = "https://ic0.app"

export function DepositBTC() {
  const [copied, setCopied] = useState(false);
  const [confirmations, setConfirmations] = useState(2);
  const [btcAddress, setBtcAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const { identity } = useAuth();
  const principal = identity?.getPrincipal();
  const {mainCanister} = useActors();

  useEffect(() => {
    const fetchBtcAddress = async () => {
      try {
        if (!principal) {
          throw new Error("No principal ID found");
        }
        const address = await mainCanister?.getBtcAddress([principal], []);
        setBtcAddress(address as string);
      } catch (error) {
        console.error("Error fetching BTC address:", error);
        setBtcAddress("");
      } finally {
        setLoading(false);
      }
    };

    if (identity) {
      fetchBtcAddress();
    }
  }, [identity, mainCanister, principal]);

  useEffect(() => {
    async function updateBalance() {
      try {
        if (!principal) {
          throw new Error("No principal ID found");
        }
        const balance = await mainCanister?.updateBalance([principal], []);
        
        if ("Ok" in balance) {
          console.log("Balance updated:", balance.Ok[0]);
        } else if ("Err" in balance) {
          console.error("Balance update error:", balance.Err);
        }
      } catch (error) {
        console.error("Error fetching confirmations:", error);
      }
    }
    
    updateBalance();
    const interval = setInterval(updateBalance, 60000);
    return () => clearInterval(interval);
  }, [principal, mainCanister]);

  const handleCopy = () => {
    navigator.clipboard.writeText(btcAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <h1 className="heading-large text-text-primary mb-2">Deposit Bitcoin</h1>
        <p className="body-regular text-text-secondary">
          Bridge your BTC to ckBTC and start earning yield on the Internet Computer
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Deposit Card */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="card-container"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent-yellow/20 rounded-xl flex items-center justify-center">
                <Bitcoin className="w-6 h-6 text-accent-yellow" />
              </div>
              <div>
                <h2 className="heading-medium text-text-primary">Your Bitcoin Address</h2>
                <p className="body-small text-text-secondary">Send BTC to this address only</p>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-accent-mint animate-spin" />
              </div>
            ) : btcAddress ? (
              <>
                <div className="bg-bg-tertiary rounded-2xl p-6 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="body-tiny text-text-muted uppercase tracking-wider">Bitcoin Address</p>
                    <button
                      onClick={() => setShowQR(!showQR)}
                      className="btn-pill flex items-center gap-2 hover:bg-white/10 transition-colors"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>QR Code</span>
                    </button>
                  </div>
                  
                  <div className="font-mono text-sm text-text-primary break-all bg-background/50 rounded-xl p-4">
                    {btcAddress}
                  </div>
                  
                  <button
                    onClick={handleCopy}
                    className="mt-4 w-full bg-accent-mint text-text-inverse rounded-xl px-6 py-3 font-medium hover:bg-accent-mint/90 transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>

                {showQR && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="bg-white rounded-2xl p-8 mb-4 flex items-center justify-center"
                  >
                    {/* QR Code would go here */}
                    <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">QR Code</span>
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="bg-semantic-negative/10 border border-semantic-negative/20 rounded-xl p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-semantic-negative flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="body-regular text-text-primary font-medium">Unable to generate address</p>
                    <p className="body-small text-text-secondary mt-1">
                      Please ensure you're connected with a valid account.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Transaction Status */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="card-container mt-6"
          >
            <h3 className="heading-medium text-text-primary mb-6">Transaction Status</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="body-regular text-text-secondary">Confirmations</span>
                  <span className="body-regular font-semibold text-text-primary">
                    {confirmations} / 6
                  </span>
                </div>
                <div className="w-full h-3 bg-bg-tertiary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(confirmations / 6) * 100}%` }}
                    className="h-full bg-gradient-to-r from-accent-mint to-accent-teal rounded-full"
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="card-mini">
                  <p className="body-small text-text-muted mb-1">Status</p>
                  <p className="body-regular font-semibold text-accent-yellow">Pending</p>
                </div>
                <div className="card-mini">
                  <p className="body-small text-text-muted mb-1">Network</p>
                  <p className="body-regular font-semibold text-text-primary">Bitcoin Mainnet</p>
                </div>
                <div className="card-mini">
                  <p className="body-small text-text-muted mb-1">Expected Amount</p>
                  <p className="body-regular font-semibold text-text-primary">0.0008 BTC</p>
                </div>
                <div className="card-mini">
                  <p className="body-small text-text-muted mb-1">ckBTC to Receive</p>
                  <p className="body-regular font-semibold text-text-primary">0.0008 ckBTC</p>
                </div>
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
          {/* Important Info */}
          <div className="card-container bg-accent-mint/10 border border-accent-mint/20">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-accent-mint flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="body-regular font-semibold text-text-primary mb-2">Important Information</h4>
                <ul className="space-y-2">
                  <li className="body-small text-text-secondary flex items-start gap-2">
                    <span className="text-accent-mint">•</span>
                    <span>Minimum deposit: 0.0001 BTC</span>
                  </li>
                  <li className="body-small text-text-secondary flex items-start gap-2">
                    <span className="text-accent-mint">•</span>
                    <span>6 confirmations required</span>
                  </li>
                  <li className="body-small text-text-secondary flex items-start gap-2">
                    <span className="text-accent-mint">•</span>
                    <span>Estimated time: ~60 minutes</span>
                  </li>
                  <li className="body-small text-text-secondary flex items-start gap-2">
                    <span className="text-accent-mint">•</span>
                    <span>Network fee: 0.000001 BTC</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="card-container">
            <h4 className="heading-small text-text-primary mb-4">How it Works</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-accent-mint/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="body-small font-semibold text-accent-mint">1</span>
                </div>
                <div>
                  <p className="body-small font-medium text-text-primary">Send BTC</p>
                  <p className="body-tiny text-text-secondary">Transfer BTC to the provided address</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-accent-mint/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="body-small font-semibold text-accent-mint">2</span>
                </div>
                <div>
                  <p className="body-small font-medium text-text-primary">Wait for Confirmations</p>
                  <p className="body-tiny text-text-secondary">6 network confirmations required</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-accent-mint/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="body-small font-semibold text-accent-mint">3</span>
                </div>
                <div>
                  <p className="body-small font-medium text-text-primary">Receive ckBTC</p>
                  <p className="body-tiny text-text-secondary">ckBTC credited to your account</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="card-mini">
            <p className="body-small text-text-secondary mb-2">Need help?</p>
            <Link to="/support" className="text-accent-mint hover:text-accent-mint/80 body-small">
              Contact Support →
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
