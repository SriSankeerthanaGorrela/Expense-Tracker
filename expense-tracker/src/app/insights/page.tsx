
"use client";

import { useEffect, useState } from "react";
import { getAIInsights } from "./AiInsights";
import { useAuthStore } from "../store/authstore";
import { useFirestoreDocument } from "../lib/useFirestoreDocument";
import { useFirestoreCollection } from "../lib/useFirestoreCollection";
import WeeklyTrendChart from "./Weeklytrends";
import { Lightbulb } from "lucide-react";
import { recentTransactionType } from "../components/(share_types)/AllTypes";
import { toJSDate } from "../dashboard/Monthlyexpenses";
interface Analytics {
  totalSpent: number;
  totalSaved: number;
  monthlyAverage: number;
  categoryTotals: Record<string, number>;
}
export default function Page() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [insights, setInsights] = useState("");

  const { user } = useAuthStore();
  const userId = user?.uid;

  // ⬇️ Fetch user document
  const { doc: userdata, loading: userLoading } =
    useFirestoreDocument(`users/${userId}`);

  // ⬇️ Fetch transactions collection
  const { docs: transactions, loading: txLoading } =
    useFirestoreCollection<recentTransactionType>(`users/${userId}/transactions`);

  // ------------------------------------
  // CALCULATE ANALYTICS WHEN DATA ARRIVES
  // ------------------------------------
  useEffect(() => {
    if (!userdata || transactions.length === 0) return;

    const income = Number(userdata.income) || 0;

    const totalSpent = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    const totalSaved = income - totalSpent;

    // GROUP BY MONTH
    const monthlyGroups:Record<string, number> = {};
    transactions.forEach((t) => {
      if (!t.date) return;
      const d = toJSDate(t.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      monthlyGroups[key] = (monthlyGroups[key] || 0) + t.amount;
    });

    const monthTotals = Object.values(monthlyGroups);
    const months = monthTotals.length;

    const monthlyAverage = months > 0
      ? Math.round(monthTotals.reduce((a, b) => a + b, 0) / months)
      : totalSpent;

    // CATEGORY TOTALS
    const categoryTotals = transactions.reduce<Record<string, number>>((acc, t) => {
      const cat = t.category || "Uncategorized";
      acc[cat] = (acc[cat] || 0) + t.amount;
      return acc;
    }, {});

    setAnalytics({
      totalSpent,
      totalSaved,
      monthlyAverage,
      categoryTotals,
    });
  }, [userdata, transactions]);

 
  useEffect(() => {
    async function generateInsights() {
      if (!analytics) return;
      const aiText = await getAIInsights(analytics);
      setInsights(aiText || "No insights");
    }

    generateInsights();
  }, [analytics]);

  // Loading UI
  if (userLoading || txLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
     <p className="text-gray-500">
        Detailed insights into your spending patterns
       </p>
        <WeeklyTrendChart />
      </div>
 
      {insights && (
    
          

          
        <pre className="mt-2 p-7 bg-white rounded-2xl shadow-xl hover:shadow-lg whitespace-pre-wrap text-gray-700 leading-relaxed">
          <h2 className="text-xl flex gap-2 mb-3 font-semibold text-gray-800">
            <Lightbulb className="text-yellow-400" />  Financial Insights
          </h2>
          {insights}
        </pre>
      )}
    </div>
  );
}
