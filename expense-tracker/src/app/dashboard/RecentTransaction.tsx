'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export type Transaction = {
  icon?: React.ReactNode;
  description: string;
  payment?:string;
  category: string;
  date: string;
  amount: number;
};

const RecentTransaction = ({ recent }: { recent: Transaction[] }) => {
  const router = useRouter();

  return (
    <div className=" border border-gray-200 rounded-xl bg-white shadow-sm">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 border-gray-200">
          <h1 className="font-semibold text-gray-800 text-lg">
            Recent Transactions
          </h1>
          <button
            className="text-green-600 hover:text-green-700 text-sm font-medium"
            onClick={() => router.push('/transaction')}
          >
            View All
          </button>
        </div>

        {/* Transaction List */}
        <div className="divide-y divide-gray-200 mt-3">
          {recent.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              No recent transactions
            </p>
          ) : (
            recent.map((trans, i) => (
              <div key={i} className="flex justify-between items-center py-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    {trans.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {trans.description}
                    </p>
                   <p className="text-sm text-gray-500 flex items-center gap-2">
  {trans.category}
  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
  {trans.date}
</p>

                  </div>
                </div>
                <p
                  className={`font-semibold ${
                    trans.amount > 0 ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {trans.amount > 0
                    ? `+₹${trans.amount}`
                    : `-₹${Math.abs(trans.amount)}`}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentTransaction;
