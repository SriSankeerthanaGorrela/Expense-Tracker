
// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   TrendingUp,
//   TrendingDown,
//   Coffee,
//   Briefcase,
//   Film,
//   ShoppingBag,
//   Bus,
//   Home,
//   HeartPulse,
//   Gift,
//   BookOpen,
//   Wallet,
// } from "lucide-react";

// import KpiDataCard from "../components/kpiDataCard";
// import StatGraph from "./StatGraph";
// import SpendingByCategory from "./SpendingByCategory";
// import RecentTransaction from "./RecentTransaction";
// import UpcomingBills from "./UpcomingBills";
// import { useFirestoreDocument } from "../lib/useFirestoreDocument";
// import { useAuthStore } from "../store/authstore";
// import { useFirestoreCollection } from "../lib/useFirestoreCollection";
// import { getCategoryTotals } from "./Monthlyexpenses";
// import getMonthlyExpenses from "./Monthlyexpenses";

// // ---------------- Mock Data ----------------
// export interface monthlyExpensesType {
//   month: string;
//   expense: number;
// }
// export interface spendingByCategoryType {
//   category: string;
//   value: number;
// }

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
//   { category: "Gifts", value: 600 },
// ];



// // ---------------- Dashboard Component ----------------
// const DashboardPage = () => {
 
// const { user } = useAuthStore();
// const { doc:userInfo, loading:userLoading, error:userError } = useFirestoreDocument(`users/${user?.uid}`);
//   console.log(userInfo);
//   const { docs: transactiondata,loading:transLoading,error:transError } = useFirestoreCollection(`users/${user?.uid}/transactions`);
//   console.log("Transaction Data from Firestore:", transactiondata);
//   const totalExpenses = transactiondata.reduce((sum, t) => sum + (t.amount), 0)
//   console.log("Total Expenses:", totalExpenses);
//   const balanceamount = (userInfo?.income ?? 0) - totalExpenses;
//   const { docs: recentTransactions,loading:recentLoading,error:recentError } = useFirestoreCollection(
//     `users/${user?.uid}/transactions`,
//   [],
//   {
//     orderByField: "createdAt",
//     order: "desc",
//     limit: 5
//   }
//   );
//   console.log("Recent Transactions from Firestore:", recentTransactions);
  
//   if (error) {
//     return (
//       <p className="text-center text-red-500 mt-10">
//         Error loading user data: {error.message}
//       </p>
//     );
//   }
//   const barpraphdata = getMonthlyExpenses(transactiondata);
//   const piechartdata=getCategoryTotals(transactiondata);
//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-3 gap-4">
//         <KpiDataCard
//           title="Total Income"
//           value={userInfo?.income ?? "-"}
//           change="+12.5% from last month"
//           icon={<TrendingUp />}
//           changeIcon={<TrendingUp />}
//           type="positive"
//         />
//         <KpiDataCard
//           title="Total Expenses"
//           value={totalExpenses}
//           change="-8.2% from last month"
//           icon={<TrendingDown />}
//           changeIcon={<TrendingDown />}
//           type="negative"
//         />
//         <KpiDataCard
//           title="Balance"
//           value={balanceamount}
//           change="+15.3% from last month"
//           icon={<Wallet />}
//           changeIcon={<Wallet />}
//           type="positive"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <StatGraph graph={barpraphdata} />
//         <SpendingByCategory category={piechartdata} />
//         <RecentTransaction recent={recentTransactions} />
//         <UpcomingBills />
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

"use client";

import React from "react";
import {
  TrendingUp,
  TrendingDown,
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
import { getCategoryTotals } from "./Monthlyexpenses";
import getMonthlyExpenses from "./Monthlyexpenses";
import Loader from "../components/Loader";
import ErrorState from "../components/Error";
import Fallback from "../components/Fallback";

const DashboardPage = () => {

  const { user } = useAuthStore();

  // User document
  const {
    doc: userInfo,
    loading: userLoading,
    error: userError,
  } = useFirestoreDocument(`users/${user?.uid}`);

  // All transactions
  const {
    docs: transactiondata,
    loading: transLoading,
    error: transError,
  } = useFirestoreCollection(`users/${user?.uid}/transactions`);

  // Recent 5
  const {
    docs: recentTransactions,
    loading: recentLoading,
    error: recentError,
  } = useFirestoreCollection(
    `users/${user?.uid}/transactions`,
    [],
    {
      orderByField: "createdAt",
      order: "desc",
      limit: 5,
    }
  );


  
  const totalExpenses = transactiondata.reduce((sum, t) => sum + t.amount, 0);
  const balanceamount = (userInfo?.income ?? 0) - totalExpenses;

  const bargraphdata = getMonthlyExpenses(transactiondata);
  const piechartdata = getCategoryTotals(transactiondata);

  return (
    <div className="space-y-4">

      {/* ---------- KPI CARDS ---------- */}
    
{userLoading || transLoading ? (
  <div className="grid grid-cols-3 gap-4">
    <Loader />
    <Loader />
    <Loader />
  </div>
) : userError || transError ? (
  <ErrorState message="Failed to load KPI data." />
) : (
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
)}


      {/* -------- Main Grid ------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

         {/* --- Bar Graph --- */}
        {bargraphdata.length === 0 ? (
          <Fallback message="No monthly data available to display the graph." buttonText="Add Transaction" href="/transactions" />
        ) : (
          <StatGraph graph={bargraphdata} />
        )}

        {/* --- Pie Chart --- */}
        {piechartdata.length === 0 ? (
          <Fallback message="No category data available." buttonText="Add Budget" href="/budgets" />
        ) : (
          <SpendingByCategory category={piechartdata} />
        )}

        {/* Recent Transaction */}
        {recentLoading ? (
          <Loader message="Fetching your latest transactions..." />
        ) : recentError ? (
          <ErrorState message="Failed to load recent transactions." />
        ) : (
          <RecentTransaction recent={recentTransactions} />
        )}

        {/* Upcoming Bills */}
        <UpcomingBills />
      </div>

    </div>
  );
};

export default DashboardPage;
