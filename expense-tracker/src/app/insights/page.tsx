"use client";

import React from "react";
import ExportButtons from "./Export";
import WeeklyTrendChart from "./Weeklytrends";
import SmartInsightsCard from "./SmartInsightCard";
import PredictionCard from "./PredictionCard";
import AchievementBadges from "./Acheivement";

function ReportsPage({ transactions = [] }) {
  // ----------------------------------------
  // 1️⃣ CALCULATE ANALYTICS HERE
  // ----------------------------------------

  const totalSpent = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);

  const totalSaved = transactions.reduce(
    (sum, t) => sum + (t.saved || 0),
    0
  );

  const monthlyAverage =
    transactions.length > 0 ? Math.round(totalSpent / 30) : 0;

  const spendingStreak = 7; // you can calculate it later

  const categories = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const categoryArray = Object.entries(categories).map(([category, value]) => ({
    category,
    value,
  }));

  // FINAL OBJECT sent to all components
  const analytics = {
    totalSpent,
    totalSaved,
    monthlyAverage,
    spendingStreak,
    categories: categoryArray,
  };

  // ----------------------------------------

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <p className="text-gray-500">
          Detailed insights into your spending patterns
        </p>
      </div>

      {/* Export Buttons */}
      <ExportButtons />

      {/* Weekly Trend */}
      <WeeklyTrendChart />

      {/* Smart Insights (AI) */}
      <SmartInsightsCard analytics={analytics} />

      {/* AI Predictions */}
      <PredictionCard transactions={transactions} />

      {/* Badges */}
      <AchievementBadges analytics={analytics} />
    </div>
  );
}

export default ReportsPage;
