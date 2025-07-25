import { DollarSign } from "lucide-react";

interface Transaction {
  type: 'Deposit' | 'Borrow' | 'Withdrawal';
  date: string;
  amount: string;
}

export function TransactionHistory() {
  const transactions: Transaction[] = [
    { type: 'Deposit', date: 'May 26, 2022', amount: '-87,41' },
    { type: 'Borrow', date: 'May 25, 2022', amount: '-142,80' },
    { type: 'Deposit', date: 'May 24, 2022', amount: '-328,00' },
    { type: 'Withdrawal', date: 'May 23, 2022', amount: '-95,20' },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">My transactions</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex items-center justify-between p-4 glass-effect rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2775CA] bg-opacity-20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#2775CA]" />
              </div>
              <div>
                <p className="font-medium">{transaction.type}</p>
                <p className="text-sm text-gray-400">{transaction.date}</p>
              </div>
            </div>
            <p className="font-medium">{transaction.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}