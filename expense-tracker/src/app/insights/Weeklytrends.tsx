"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useFirestoreCollection } from "../lib/useFirestoreCollection";
import { useAuthStore } from "../store/authstore";
import { recentTransactionType } from "../components/(share_types)/AllTypes";
import { Timestamp } from "firebase/firestore";

function getDayName(dateValue: string | Date | Timestamp): string {
  let date: Date;

  if (dateValue instanceof Timestamp) {
    date = dateValue.toDate(); 
  } else {
    date = new Date(dateValue);
  }

  return date.toLocaleDateString("en-US", { weekday: "short" });
}


function calculateDailySpending(transactions:recentTransactionType[]):{day: string; amount: number}[] {
  const dailyTotals: Record<string, number> = {};

  transactions.forEach(tx => {
        if (!tx.date) return;

    const day = getDayName(tx.date);

    if (!dailyTotals[day]) {
      dailyTotals[day] = 0;
    }

    dailyTotals[day] += tx.amount;
   // dailyTotals[day] = (dailyTotals[day] || 0) + (tx.amount || 0);
  
  });

  const daysOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return daysOrder.map(day => ({
    day,
    amount: dailyTotals[day] || 0
  }));
}

export default function WeeklyTrendChart() {
  const {user} = useAuthStore();
  const {docs:transactions} = useFirestoreCollection<recentTransactionType>(`users/${user?.uid}/transactions`);
  const chartData = calculateDailySpending(transactions);

  return (
    <div className="p-8 bg-white rounded-xl shadow">
      <h2 className="pb-4">Day Wise Spending Trend</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="blue" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
