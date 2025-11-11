import {
  CircleAlert,
  Plus,
  TrendingUp,
} from "lucide-react";
import React from "react";
import KpiDataCard from "../components/kpiDataCard";

const BudgetsPage = () => {
  const goals = [
    {
      name: "Food",
      spent: 2500,
      limit: 3000,
      percentage: 83,
      message: "You're approaching your budget limit.",
    },
    {
      name: "Shopping",
      spent: 2800,
      limit: 3000,
      percentage: 93,
      message: "Budget exceeded! Try to cut down expenses.",
    },
    {
      name: "Medicines",
      spent: 1200,
      limit: 3000,
      percentage: 40,
      message: "You're within your budget.",
    },
    {
      name: "Transport",
      spent: 2100,
      limit: 3000,
      percentage: 70,
      message: "You're approaching your limit.",
    },
  ];

  // Function to decide color category
  const getColorClass = (percentage: number) => {
    if (percentage > 90) return "red";
    if (percentage > 60) return "yellow";
    return "green";
  };

  return (
    <div className="p-6 min-h-screen space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Budget</h1>
          <p className="text-gray-500 text-sm">
            Track your spending limits by category
          </p>
        </div>

        {/* Add Goal Button */}
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all">
          <Plus size={18} />
          <span>Add Budget</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-6">
        <KpiDataCard
          title="Total Budget"
          value={40000}
          icon={<TrendingUp className="text-green-500" />}
        />
        <KpiDataCard
          title="Total Spent"
          value={20000}
          icon={<TrendingUp className="text-red-500" />}
        />
        <KpiDataCard
          title="Remaining"
          value={20000}
          icon={<TrendingUp className="text-blue-500" />}
        />
      </div>

      {/* Goals Section */}
      <section className="grid grid-cols-2 gap-8">
        {goals.map((goal, index) => {
          const color = getColorClass(goal.percentage);

          // Tailwind color mappings
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
          }[color];

          return (
            <div
              key={index}
              className="p-6 border space-y-3 border-gray-200 bg-white shadow-lg rounded-xl"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">{goal.name}</h2>
                <p className={`font-semibold ${colorClasses.text}`}>
                  {goal.percentage}%
                </p>
              </div>

              {/* Spent vs Limit */}
              <p className="text-sm text-gray-600">
                ₹{goal.spent} of ₹{goal.limit}
              </p>

              {/* Progress Bar */}
              <div className="bg-gray-200 rounded-full w-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${colorClasses.bar}`}
                  style={{ width: `${goal.percentage}%` }}
                ></div>
              </div>

              {/* Alert Message */}
              <p
                className={`py-3 px-2 rounded-xl flex items-center gap-2 text-sm ${colorClasses.alertBg} ${colorClasses.text}`}
              >
                <CircleAlert className={`w-4 h-4 ${colorClasses.icon}`} />
                {goal.message}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default BudgetsPage;
