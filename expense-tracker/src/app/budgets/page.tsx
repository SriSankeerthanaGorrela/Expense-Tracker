"use client";
import React from "react";
import { Plus, TrendingUp, CircleAlert } from "lucide-react";
import KpiDataCard from "../components/kpiDataCard";
import Dialog from "../components/Dialog";
import AddBudget from "./AddBudget";
import { useAuthStore } from "../store/authstore";
import { useFirestoreCollection } from "../lib/useFirestoreCollection";
import { Budget, recentTransactionType } from "../components/(share_types)/AllTypes";
import { toJSDate } from "../dashboard/Monthlyexpenses";

const BudgetsPage = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const { user } = useAuthStore();

  // Fetch Budgets
  const { docs: budgets } = useFirestoreCollection<Budget>(
    `users/${user?.uid}/budgetCategories`
  );

  //  Fetch Transactions
  const { docs: transactions } = useFirestoreCollection<recentTransactionType>(
    `users/${user?.uid}/transactions`
  );
console.log("budgets", budgets);
console.log("transactions", transactions);
  // ===============================
  // Calculate spending for each budget
  // ===============================
  const now = new Date();
const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const budgetsWithSpending = budgets.map((b) => {
  const spent = transactions
    .filter((t) => {
      if (t.category !== b.name) return false;

      const txnDate = toJSDate(t.date); //  make sure you store date in transaction
      return txnDate >= firstDayOfMonth && txnDate <= lastDayOfMonth;
    })
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const percentage = (spent / Number(b.amount)) * 100;
  const safepercentage = percentage > 100 ? 100 : percentage;

  return {
    ...b,
    spent,
    percentage: Number(percentage.toFixed(2)),
    safepercentage,
  };
});


  // Calculate Total Budget (Sum of limits)
  const totalBudget = budgets.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  // Total Spent across all categories
  const totalSpent = budgetsWithSpending.reduce(
    (sum, item) => sum + item.spent,
    0
  );

  // Remaining = totalBudget - totalSpent
  const remaining = totalBudget - totalSpent;

  // ===============================
  // UI Color Logic Based on Percentage
  // ===============================
  const getColorClass = (percentage: number) => {
    if (percentage >= 90) return "red";
    if (percentage >= 60) return "yellow";
    return "green";
  };

  const colorClasses = {
    red: {
      bar: "bg-red-500",
      alertBg: "bg-red-50",
      text: "text-red-600",
      icon: "text-red-600",
    },
    yellow: {
      bar: "bg-yellow-400",
      alertBg: "bg-yellow-50",
      text: "text-yellow-600",
      icon: "text-yellow-600",
    },
    green: {
      bar: "bg-green-500",
      alertBg: "bg-green-50",
      text: "text-green-600",
      icon: "text-green-600",
    },
  };

  return (
    <div className="p-6 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Budget</h1>
          <p className="text-gray-500 text-sm">
            Track your spending limits by category
          </p>
        </div>

        {/* Add Budget Button */}
        <button
          onClick={() => setOpenDialog(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
        >
          <Plus size={18} />
          <span>Add Budget</span>
        </button>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} size="sm">
          <AddBudget onClose={() => setOpenDialog(false)} />
        </Dialog>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-6">
        <KpiDataCard
          title="Total Budget"
          value={`₹${totalBudget}`}
          icon={<TrendingUp className="text-green-500" />}
        />
        <KpiDataCard
          title="Total Spent"
          value={`₹${totalSpent}`}
          icon={<TrendingUp className="text-red-500" />}
        />
        <KpiDataCard
          title="Remaining"
          value={`₹${remaining}`}
          icon={<TrendingUp className="text-blue-500" />}
        />
      </div>

      {/* Category Cards */}
      <section className="grid grid-cols-2 gap-8">
        {budgetsWithSpending.map((budget, index) => {
          const color = getColorClass(budget.percentage);
          const style = colorClasses[color];

          return (
            <div
              key={index}
              className="p-6 border space-y-3 border-gray-200 bg-white shadow-lg rounded-xl"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">{budget.name}</h2>
                <p className={`font-semibold ${style.text}`}>
                  {budget.percentage}%
                </p>
              </div>

              {/* Spent vs Limit */}
              <p className="text-sm text-gray-600">
                ₹{budget.spent} of ₹{budget.amount}
              </p>

              {/* Progress Bar */}
              <div className="bg-gray-200 rounded-full w-full h-2">
                <div
                  className={`h-2 rounded-full transition-all  ${style.bar}`}
                  style={{ width: `${budget.safepercentage}%` }}
                ></div>
              </div>

              {/* Alert */}
              <p
                className={`py-3 px-2 rounded-xl flex items-center gap-2 text-sm ${style.alertBg} ${style.text}`}
              >
                <CircleAlert className={`w-4 h-4 ${style.icon}`} />
                {budget.percentage >= 100
                  ? "Budget exceeded! this month."
                  : budget.percentage >= 90
                  ? "You're approaching your budget limit per month."
                  : "You're within your budget this month."}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default BudgetsPage;
