"use client";
import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// --- Mock Expense Data ---
const monthlyExpenses = [
  { month: "Jan", amount: 1200 },
  { month: "Feb", amount: 900 },
  { month: "Mar", amount: 1600 },
  { month: "Apr", amount: 1300 },
  { month: "May", amount: 1800 },
  { month: "Jun", amount: 1500 },
];

const expenseByCategory = [
  { name: "Food", value: 600 },
  { name: "Rent", value: 1200 },
  { name: "Shopping", value: 500 },
  { name: "Bills", value: 400 },
  { name: "Travel", value: 300 },
];

const incomeVsExpense = [
  { month: "Jan", income: 2000, expense: 1200 },
  { month: "Feb", income: 2100, expense: 900 },
  { month: "Mar", income: 2500, expense: 1600 },
  { month: "Apr", income: 2300, expense: 1300 },
  { month: "May", income: 2700, expense: 1800 },
  { month: "Jun", income: 2400, expense: 1500 },
];

// --- Colors ---
const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6"];

export default function ExpenseDashboard() {
  return (
    <div className="grid grid-cols-2 gap-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* 1️⃣ Bar Chart - Monthly Expenses */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        
        <h2 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">
          Monthly Expenses
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyExpenses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#4f46e5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 2️⃣ Pie Chart - Expense Distribution */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">
          Expense by Category
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={expenseByCategory}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {expenseByCategory.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 3️⃣ Line Chart - Spending Trend */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">
          Spending Trend
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyExpenses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 4️⃣ Area Chart - Income vs Expense */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">
          Income vs Expense
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={incomeVsExpense}>
            <defs>
              <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              fillOpacity={1}
              fill="url(#incomeColor)"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              fillOpacity={1}
              fill="url(#expenseColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
