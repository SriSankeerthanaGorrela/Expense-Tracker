// "use client"
// import { TrendingUp, TrendingDown } from 'lucide-react';
// import { Coffee, Briefcase, Film, ShoppingBag, Bus, Home, HeartPulse, Gift, BookOpen, Wallet } from "lucide-react";
// import React, { useEffect, useState } from 'react'
// import KpiDataCard from '../components/kpiDataCard';
// import StatGraph from './StatGraph';
// import SpendingByCategory from './SpendingByCategory';
// import RecentTransaction from './RecentTransaction';
// import UpcomingBills from './UpcomingBills';
// import { useFirestoreDocument } from '../lib/useFirestoreDocument';
// import { useAuthStore } from '../store/authstore';
// export interface monthlyExpensesType{
//   month:string;
//   expense:number;
// }
// export interface spendingByCategoryType{
//   category:string;
//   value:number;
// }
// const monthlyExpenses:monthlyExpensesType[]=[
//   {month:"Jan",expense:2000},
//   {month:"Feb",expense:1500},
//   {month:"Mar",expense:1800},
//   {month:"Apr",expense:1000},
//   {month:"May",expense:1900},
//   {month:"Jun",expense:3000},
// ]
// const spendingByCategory: spendingByCategoryType[] = [
//   { category: "Food", value: 2000 },
//   { category: "Movies", value: 500 },
//   { category: "Shopping", value: 3000 },
//   { category: "Travel", value: 1500 },
//   { category: "Bills", value: 2200 },
//   { category: "Health", value: 1200 },
//   { category: "Groceries", value: 2500 },
//   { category: "Subscriptions", value: 800 },
//   { category: "Education", value: 1700 },
//   { category: "Gifts", value: 600 }
// ];


// export const recentTransaction = [
//   {
//     icon: <Coffee className="text-orange-500" />,
//     description: "Lunch at Restaurant",
//     category: "Food & Dining",
//     payment:"UPI",
//     date: "2025-11-03",
//     amount: -850.0,
//   },
//   {
//     icon: <Briefcase className="text-green-600" />,
//     description: "Freelance Payment",
//     payment:"Bank",
//     category: "Income",
//     date: "2025-11-02",
//     amount: 5000.0,
//   },
//   {
//     icon: <Film className="text-red-500" />,
//     description: "Netflix Subscription",
//      payment:"Card",
//     category: "Entertainment",
//     date: "2025-11-01",
//     amount: -499.0,
//   },
//   {
//     icon: <ShoppingBag className="text-pink-500" />,
//     description: "Mall Shopping",
//      payment:"Cash",
//     category: "Shopping",
//     date: "2025-10-30",
//     amount: -3200.0,
//   },
//   {
//     icon: <Bus className="text-blue-500" />,
//     description: "Taxi Ride",
//      payment:"UPI",
//     category: "Transport",
//     date: "2025-10-29",
//     amount: -250.0,
//   },
//   {
//     icon: <Home className="text-gray-500" />,
//     description: "Electricity Bill",
//      payment:"UPI",
//     category: "Utilities",
//     date: "2025-10-28",
//     amount: -1800.0,
//   },
//   {
//     icon: <HeartPulse className="text-rose-500" />,
//     description: "Doctor Visit",
//      payment:"Card",
//     category: "Health",
//     date: "2025-10-27",
//     amount: -600.0,
//   },
//   {
//     icon: <Gift className="text-purple-500" />,
//     description: "Birthday Gift",
//      payment:"Cash",
//     category: "Gifts",
//     date: "2025-10-25",
//     amount: -1200.0,
//   },
//   {
//     icon: <BookOpen className="text-indigo-500" />,
//     description: "Online Course",
//      payment:"Cash",
//     category: "Education",
//     date: "2025-10-23",
//     amount: -900.0,
//   },
//   {
//     icon: <Wallet className="text-green-700" />,
//     description: "Salary Credit",
//      payment:"Bank",
//     category: "Income",
//     date: "2025-10-20",
//     amount: 45000.0,
//   },
// ];

// const DashboardPage = () => {
//   const { user } = useAuthStore();
//   const { doc } = useFirestoreDocument(`users/${user?.uid}`);
//   console.log(doc)
//   return (
//     <div className='spce-y-4'>
//         <div className="grid grid-cols-3 gap-4">
//       <KpiDataCard
//         title="Total Income"
//           value={doc?.income ?? "-"}
//         change="+12.5% from last month"
//         icon={<TrendingUp />}
//         changeIcon={<TrendingUp />}
//         type="positive"
//       />
//       <KpiDataCard
//         title="Total Expenses"
//         value="₹52,340"
//         change="-8.2% from last month"
//         icon={<TrendingDown />}
//         changeIcon={<TrendingDown />}
//         type="negative"
//       />
//       <KpiDataCard
//         title="Balance"
//         value="₹32,660"
//         change="+15.3% from last month"
//         icon={<Wallet />}
//         changeIcon={<Wallet />}
//         type="positive"
//       />
//     </div>
//     {/* <ExpenseDashboard/> */}
//    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ">
//   <StatGraph graph={monthlyExpenses} />
//   <SpendingByCategory category={spendingByCategory} />
//   <RecentTransaction recent={recentTransaction}/>
//   <UpcomingBills/>
// </div>

//     </div>
//   )
// }

// export default DashboardPage;
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

export const recentTransaction = [
  {
    icon: <Coffee className="text-orange-500" />,
    description: "Lunch at Restaurant",
    category: "Food & Dining",
    payment:"UPI",
    date: "2025-11-03",
    amount: -850.0,
  },
  {
    icon: <Briefcase className="text-green-600" />,
    description: "Freelance Payment",
    payment:"Bank",
    category: "Income",
    date: "2025-11-02",
    amount: 5000.0,
  },
  {
    icon: <Film className="text-red-500" />,
    description: "Netflix Subscription",
     payment:"Card",
    category: "Entertainment",
    date: "2025-11-01",
    amount: -499.0,
  },
  {
    icon: <ShoppingBag className="text-pink-500" />,
    description: "Mall Shopping",
     payment:"Cash",
    category: "Shopping",
    date: "2025-10-30",
    amount: -3200.0,
  },
  {
    icon: <Bus className="text-blue-500" />,
    description: "Taxi Ride",
     payment:"UPI",
    category: "Transport",
    date: "2025-10-29",
    amount: -250.0,
  },
  {
    icon: <Home className="text-gray-500" />,
    description: "Electricity Bill",
     payment:"UPI",
    category: "Utilities",
    date: "2025-10-28",
    amount: -1800.0,
  },
  {
    icon: <HeartPulse className="text-rose-500" />,
    description: "Doctor Visit",
     payment:"Card",
    category: "Health",
    date: "2025-10-27",
    amount: -600.0,
  },
  {
    icon: <Gift className="text-purple-500" />,
    description: "Birthday Gift",
     payment:"Cash",
    category: "Gifts",
    date: "2025-10-25",
    amount: -1200.0,
  },
  {
    icon: <BookOpen className="text-indigo-500" />,
    description: "Online Course",
     payment:"Cash",
    category: "Education",
    date: "2025-10-23",
    amount: -900.0,
  },
  {
    icon: <Wallet className="text-green-700" />,
    description: "Salary Credit",
     payment:"Bank",
    category: "Income",
    date: "2025-10-20",
    amount: 45000.0,
  },
];


// ---------------- Dashboard Component ----------------
const DashboardPage = () => {
 
const { user } = useAuthStore();
const { doc, loading, error } = useFirestoreDocument(`users/${user?.uid}`);
console.log(doc);

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
          value={doc?.income ?? "-"}
          change="+12.5% from last month"
          icon={<TrendingUp />}
          changeIcon={<TrendingUp />}
          type="positive"
        />
        <KpiDataCard
          title="Total Expenses"
          value="₹52,340"
          change="-8.2% from last month"
          icon={<TrendingDown />}
          changeIcon={<TrendingDown />}
          type="negative"
        />
        <KpiDataCard
          title="Balance"
          value="₹32,660"
          change="+15.3% from last month"
          icon={<Wallet />}
          changeIcon={<Wallet />}
          type="positive"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <StatGraph graph={monthlyExpenses} />
        <SpendingByCategory category={spendingByCategory} />
        <RecentTransaction recent={recentTransaction} />
        <UpcomingBills />
      </div>
    </div>
  );
};

export default DashboardPage;
