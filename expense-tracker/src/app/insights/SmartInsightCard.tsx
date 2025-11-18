"use client";

import React from "react";

function SmartInsightsCard({ analytics }) {
  const [insights, setInsights] = React.useState([]);

  React.useEffect(() => {
    async function load() {
      const res = await fetch("/api/ai-insights", {
        method: "POST",
        body: JSON.stringify({ analytics }),
      });

      const data = await res.json();
      const lines = data.insights
        ?.split("\n")
        ?.filter((l) => l.trim() !== "");

      setInsights(lines || []);
    }

    if (analytics) load();
  }, [analytics]);

  return (
    <div className="card p-5">
      <h2 className="card-title">Smart AI Insights</h2>

      {insights.map((msg, i) => (
        <div key={i} className="p-3 bg-gray-100 rounded-lg text-sm mt-2">
          {msg}
        </div>
      ))}
    </div>
  );
}

export default SmartInsightsCard;
