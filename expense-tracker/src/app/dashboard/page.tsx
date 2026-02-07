"use client";


import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

import KpiDataCard from "../components/kpiDataCard";
import StatGraph from "./StatGraph";
import SpendingByCategory from "./SpendingByCategory";
import RecentTransaction from "./RecentTransaction";

import { useFirestoreDocument } from "../lib/useFirestoreDocument";
import { useAuthStore } from "../store/authstore";
import { useFirestoreCollection } from "../lib/useFirestoreCollection";
import { getCategoryTotals } from "./Monthlyexpenses";
import getMonthlyExpenses from "./Monthlyexpenses";
import Loader from "../components/Loader";
import ErrorState from "../components/Error";
import Fallback from "../components/Fallback";
import { recentTransactionType } from "../components/(share_types)/AllTypes";

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
  } = useFirestoreCollection<recentTransactionType>(`users/${user?.uid}/transactions`);
console.log("API KEY:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  // Recent 5
  const {
    docs: recentTransactions,
    loading: recentLoading,
    error: recentError,
  } = useFirestoreCollection<recentTransactionType>(`users/${user?.uid}/transactions`, [], {
    orderByField: "createdAt",
    order: "desc",
    limit: 5,
  });

  const pageLoading = userLoading || transLoading || recentLoading;

  // ---------- SINGLE ERROR ----------
  const pageError = userError || transError || recentError;

  // SHOW LOADING
  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-full py-20">
        <Loader />
      </div>
    );
  }

  // SHOW ERROR
  if (pageError) {
    return <ErrorState message="Failed to load dashboard data." />;
  }

  const totalExpenses = transactiondata.reduce((sum, t) => sum + t.amount, 0);


  const bargraphdata = getMonthlyExpenses(transactiondata);
  const piechartdata = getCategoryTotals(transactiondata);

   const now = new Date();

// This Month
const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
const endOfThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

// Last Month
const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
// const thisMonthExpenses = transactiondata
//   .filter((t) => {
//     const txnDate = t.date?.toDate ? t.date.toDate() : new Date(t.date);
//     return txnDate >= startOfThisMonth && txnDate <= endOfThisMonth;
//   })
//   .reduce((sum, t) => sum + Number(t.amount), 0);
const thisMonthExpenses = transactiondata
  .filter((t) => {
    const txnDate =
      typeof t.date === "string"
        ? new Date(t.date)
        : t.date.toDate();
    return txnDate >= startOfThisMonth && txnDate <= endOfThisMonth;
  })
  .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  

const lastMonthExpenses = transactiondata
  .filter((t) => {
    // const txnDate = t.date?.toDate ? t.date.toDate() : new Date(t.date);
    const txnDate =
      typeof t.date === "string"
        ? new Date(t.date)
        : t.date.toDate();
    return txnDate >= startOfLastMonth && txnDate <= endOfLastMonth;
  })
  .reduce((sum, t) => sum + Number(t.amount), 0);
let expenseChange = 0;
let expenseType: "positive" | "negative" = "positive";

if (lastMonthExpenses > 0) {
  expenseChange =
    ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;

  expenseType = expenseChange > 0 ? "negative" : "positive";
}
  const balanceamount = Number(userInfo?.income ?? 0) - thisMonthExpenses;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <KpiDataCard
          title="Total Income"
          value={Number(userInfo?.income ?? 0)}
          icon={<TrendingUp />}
          changeIcon={<TrendingUp />}
          type="positive"
        />
        <KpiDataCard
          title="Total Expenses"
          value={thisMonthExpenses}
          change={`${Math.abs(expenseChange).toFixed(1)}% from last month`}
          icon={<TrendingDown />}
          changeIcon={<TrendingDown />}
          type={expenseType}
        />
        <KpiDataCard
          title="Balance"
          value={balanceamount}
          icon={<Wallet />}
          changeIcon={<Wallet />}
          type="positive"
        />
      </div>

      {/* -------- Main Grid ------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* --- Bar Graph --- */}
        {bargraphdata.length === 0 ? (
          <Fallback
            message="No monthly data available to display the graph."
            buttonText="Add Transaction"
            href="/transactions"
           />
        ) : (
          <StatGraph graph={bargraphdata} />
        )}

        {/* --- Pie Chart --- */}
        {piechartdata.length === 0 ? (
          <Fallback
            message="No category data available."
            buttonText="Add Budget"
            href="/budgets"
          />
        ) : (
          <SpendingByCategory category={piechartdata} />
        )}

     
      </div>
      <div>
        <RecentTransaction recent={recentTransactions} />
      </div>
    </div>
  );
};

export default DashboardPage;
