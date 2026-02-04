// "use client";

// import React, { useEffect, useState } from "react";
// import WeeklyTrendChart from "./Weeklytrends";
// import { useAuthStore } from "../store/authstore";
// import { useFirestoreDocument } from "../lib/useFirestoreDocument";


// export type analyticsType = {
//   totalSpent: number;
//   totalSaved: number;
//   monthlyAverage: number;
//   categories: { category: string; value: number }[];
// }
// function ReportsPage({ transactions = [] }) {
//   const { user } = useAuthStore();

//   // 1) Firestore path for storing AI insights
//   const insightPath = user?.uid
//     ? `users/${user.uid}/ai_insights/summary`
//     : null;

//   const {
//     doc: aiDoc,
//     updateDocument: saveInsights,
//     loading: insightLoading
//   } = useFirestoreDocument(insightPath || "");

//   const [aiText, setAiText] = useState("");

//   // Update local UI when Firestore updates
//   useEffect(() => {
//     if (aiDoc?.text) {
//       setAiText(aiDoc.text);
//     }
//   }, [aiDoc]);

//   // -------------------------
//   // CALCULATE ANALYTICS
//   // -------------------------
//   const totalSpent = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);

//   const totalSaved = transactions.reduce(
//     (sum, t) => sum + (t.saved || 0),
//     0
//   );

//   const monthlyAverage =
//     transactions.length > 0 ? Math.round(totalSpent / 30) : 0;

//   const categories = transactions.reduce((acc, t) => {
//     acc[t.category] = (acc[t.category] || 0) + t.amount;
//     return acc;
//   }, {});

//   const categoryArray = Object.entries(categories).map(([category, value]) => ({
//     category,
//     value,
//   }));
 
//   const analytics = {
//     totalSpent,
//     totalSaved,
//     monthlyAverage,
//     categories: categoryArray,
//   };

//   // --------------------------------
//   // 3️⃣ Generate & Save AI Insight
//   // --------------------------------
//   const generateInsights = async () => {
//     if (!user) return alert("User not logged in");

//     const result = await getAIInsights(analytics);

//     setAiText(result);

//     await saveInsights({
//       text: result,
//       updatedAt: new Date().toISOString()
//     });
//   };

//   return (
//     <div className="p-6 space-y-8">
//       <div>
//         <h1 className="text-2xl font-bold">Reports & Analytics</h1>
//         <p className="text-gray-500">
//           Detailed insights into your spending patterns
//         </p>
//       </div>

//       <WeeklyTrendChart />

//       {/* AI Insights Section */}
//       <div className="card p-4 border rounded-md">
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-semibold">AI Smart Insights</h2>
//           <button
//             onClick={generateInsights}
//             className="bg-blue-600 text-white px-4 py-2 rounded-md"
//           >
//             Generate Insights
//           </button>
//         </div>

//         {insightLoading ? (
//           <p className="text-gray-500">Loading insights...</p>
//         ) : (
//           <p className="mt-2 whitespace-pre-line">{aiText || "No insights yet"}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ReportsPage;
// "use client";
// import { useState } from "react";
// import { getAIInsights } from "./AiInsights";
// import WeeklyTrendChart from "./Weeklytrends";
// import { useFirestoreCollection } from "../lib/useFirestoreCollection";
// import { useAuthStore } from "../store/authstore";
// import { useFirestoreDocument } from "../lib/useFirestoreDocument";

// export default function Page() {
//   // const [transactions, setTransactions] = useState([
//   // ]);
//   const { user } = useAuthStore()
//   const userId=user?.uid
//  const{docs:transactions}=useFirestoreCollection(`users/${userId}/transactions`)
//  const {doc:userdata}=useFirestoreDocument(`users/${userId}`)
//   const totalSpent = transactions.reduce((sum, tx) => sum + tx.amount, 0);

//   const income = userdata?.income; // or fetch this from user settings
//   const totalSaved = income - totalSpent;
//  console.log("total",totalSpent,income)


//   const categories = transactions.reduce((acc, tx) => {
//     acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
//     return acc;
//   }, {});

//   const analytics = {
//     totalSpent,
//     totalSaved,
//     monthlyAverage,
//     categories,
//   };

//   const [insights, setInsights] = useState("");

//   async function handleInsights() {
//     console.log("Analytics sent --->", analytics);

//     const aiText = await getAIInsights(analytics);
//     setInsights(aiText || "No insights");
//   }

//   return (
//     <div>
//        <div>
//         <h1 className="text-2xl font-bold">Reports & Analytics</h1>
//       <p className="text-gray-500">
//          Detailed insights into your spending patterns
//         </p>
//          <WeeklyTrendChart />
//       </div>
//       <h1>Dashboard</h1>
//       <button onClick={handleInsights}>Generate AI Insights</button>
//       <pre>{insights}</pre>
//     </div>
//   );
// }
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

  // ------------------------------------
  // AUTO-GENERATE INSIGHTS
  // ------------------------------------
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
