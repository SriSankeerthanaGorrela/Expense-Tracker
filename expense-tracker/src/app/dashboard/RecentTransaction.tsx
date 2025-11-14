"use client";
import { useRouter } from "next/navigation";
import React from "react";

import {
  Utensils, // Food
  Heart, // Health
  ShoppingBag, // Shopping
  PiggyBank, // Savings
  Wallet, // Bills
  Home, // Home
  Activity,
  HomeIcon,
  GiftIcon,
  Train, // Other
} from "lucide-react";

export type Transaction = {
  icon?: React.ReactNode;
  description: string;
  payment?: string;
  category: string;
  date: string;
  amount: number;
};

// 🔥 Category → Icon Map
const categoryIcons: Record<string, React.ReactNode> = {
  food : <Utensils className="w-5 h-5 text-orange-600" />,
  health: <Heart className="w-5 h-5 text-red-500" />,
  shopping: <ShoppingBag className="w-5 h-5 text-blue-600" />,
  entertainment: <PiggyBank className="w-5 h-5 text-green-600" />,
  gifts: <GiftIcon className="w-5 h-5 text-yellow-600" />,
  transport: <Train className="w-5 h-5 text-purple-600" />,
  home: <HomeIcon className="w-5 h-5 text-gray-500" />,
  education: <PiggyBank className="w-5 h-5 text-pink-600" />,
  emi: <Wallet className="w-5 h-5 text-green-700" />,
  other: <Activity className="w-5 h-5 text-gray-400" />,
};

const RecentTransaction = ({ recent }: { recent: Transaction[] }) => {
  const router = useRouter();

  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 border-gray-200">
          <h1 className="font-semibold text-gray-800 text-lg">
            Recent Transactions
          </h1>
          <button
            className="text-green-600 hover:text-green-700 text-sm font-medium"
            onClick={() => router.push("/transactions")}
          >
            View All
          </button>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-200 mt-3">
          {recent.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              No recent transactions
            </p>
          ) : (
            recent.map((trans, i) => (
              <div key={i} className="flex justify-between items-center py-3">
                <div className="flex items-center gap-3">
                  {/* 🔥 Category Icon */}
                  <div className="p-2 bg-gray-100 rounded-full">
                    {categoryIcons[trans.category.toLowerCase()] || categoryIcons["other"]}
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      {trans.category}
                    </p>

                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      {trans.description}
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      {trans.date}
                    </p>
                  </div>
                </div>

                <p
                  className={`font-semibold ${
                    trans.amount > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {trans.amount > 0 && `+₹${trans.amount}`}
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
