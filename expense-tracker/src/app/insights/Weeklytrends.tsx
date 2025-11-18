"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const sampleWeeklyData = [
  { day: "Mon", amount: 400 },
  { day: "Tue", amount: 300 },
  { day: "Wed", amount: 500 },
  { day: "Thu", amount: 200 },
  { day: "Fri", amount: 650 },
  { day: "Sat", amount: 750 },
  { day: "Sun", amount: 300 },
];

function WeeklyTrendChart() {
  return (
    <div className="card">
      <h2 className="card-title">Weekly / Daily Spending Trend</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={sampleWeeklyData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="blue" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeeklyTrendChart;
