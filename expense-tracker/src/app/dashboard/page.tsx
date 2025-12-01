"use client";

import React from "react";
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
  } = useFirestoreCollection(`users/${user?.uid}/transactions`, [], {
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
  const balanceamount = (userInfo?.income ?? 0) - totalExpenses;

  const bargraphdata = getMonthlyExpenses(transactiondata);
  const piechartdata = getCategoryTotals(transactiondata);

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

        {/* Recent Transaction */}

        {/* Upcoming Bills */}
        {/* <UpcomingBills /> */}
      </div>
      <div>
        <RecentTransaction recent={recentTransactions} />
      </div>
    </div>
  );
};

export default DashboardPage;
