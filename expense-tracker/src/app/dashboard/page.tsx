
"use client";

import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Coffee,
  Briefcase,
  Film,
  ShoppingBag,
  Bus,
  Home,
  HeartPulse,
  Gift,
  BookOpen,
  Wallet,
} from "lucide-react";

import KpiDataCard from "../components/kpiDataCard";
import StatGraph from "./StatGraph";
import SpendingByCategory from "./SpendingByCategory";
import RecentTransaction from "./RecentTransaction";
import UpcomingBills from "./UpcomingBills";
import { useFirestoreDocument } from "../lib/useFirestoreDocument";
import { useAuthStore } from "../store/authstore";
import { useFirestoreCollection } from "../lib/useFirestoreCollection";

// ---------------- Mock Data ----------------
export interface monthlyExpensesType {
  month: string;
  expense: number;
}
export interface spendingByCategoryType {
  category: string;
  value: number;
}

const monthlyExpenses: monthlyExpensesType[] = [
  { month: "Jan", expense: 2000 },
  { month: "Feb", expense: 1500 },
  { month: "Mar", expense: 1800 },
  { month: "Apr", expense: 1000 },
  { month: "May", expense: 1900 },
  { month: "Jun", expense: 3000 },
];

const spendingByCategory: spendingByCategoryType[] = [
  { category: "Food", value: 2000 },
  { category: "Movies", value: 500 },
  { category: "Shopping", value: 3000 },
  { category: "Travel", value: 1500 },
  { category: "Bills", value: 2200 },
  { category: "Health", value: 1200 },
  { category: "Groceries", value: 2500 },
  { category: "Subscriptions", value: 800 },
  { category: "Education", value: 1700 },
  { category: "Gifts", value: 600 },
];



// ---------------- Dashboard Component ----------------
const DashboardPage = () => {
 
const { user } = useAuthStore();
const { doc:userInfo, loading, error } = useFirestoreDocument(`users/${user?.uid}`);
  console.log(userInfo);
  const { docs: transactiondata } = useFirestoreCollection(`users/${user?.uid}/transactions`);
  console.log("Transaction Data from Firestore:", transactiondata);
  const totalExpenses = transactiondata.reduce((sum, t) => sum + (t.amount), 0)
  console.log("Total Expenses:", totalExpenses);
  const balanceamount = (userInfo?.income ?? 0) - totalExpenses;
  const { docs: recentTransactions } = useFirestoreCollection(
    `users/${user?.uid}/transactions`,
  [],
  {
    orderByField: "createdAt",
    order: "desc",
    limit: 5
  }
  );
  console.log("Recent Transactions from Firestore:", recentTransactions);
  
  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">
        Error loading user data: {error.message}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <KpiDataCard
          title="Total Income"
          value={userInfo?.income ?? "-"}
          change="+12.5% from last month"
          icon={<TrendingUp />}
          changeIcon={<TrendingUp />}
          type="positive"
        />
        <KpiDataCard
          title="Total Expenses"
          value={totalExpenses}
          change="-8.2% from last month"
          icon={<TrendingDown />}
          changeIcon={<TrendingDown />}
          type="negative"
        />
        <KpiDataCard
          title="Balance"
          value={balanceamount}
          change="+15.3% from last month"
          icon={<Wallet />}
          changeIcon={<Wallet />}
          type="positive"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <StatGraph graph={monthlyExpenses} />
        <SpendingByCategory category={spendingByCategory} />
        <RecentTransaction recent={recentTransactions} />
        <UpcomingBills />
      </div>
    </div>
  );
};

export default DashboardPage;
