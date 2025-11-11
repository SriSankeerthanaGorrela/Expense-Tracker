import { Laptop, LineChart, Plane, Plus, Shield, Target, TrendingUp } from "lucide-react";
import React from "react";
import KpiDataCard from "../components/kpiDataCard";
import CardStat from "../components/CardStat";

const GoalsPage = () => {
    const goals = [
    {
      icon: <Shield className="text-red-500" />,
      title: "Emergency Fund",
      daysLeft: 53,
      progress: 65,
      current: 65000,
      target: 100000,
    },
    {
      icon: <Plane className="text-blue-500" />,
      title: "Vacation to Europe",
      daysLeft: 234,
      progress: 30,
      current: 45000,
      target: 150000,
    },
    {
      icon: <Laptop className="text-gray-700 dark:text-gray-300" />,
      title: "New Laptop",
      daysLeft: 22,
      progress: 90,
      current: 72000,
      target: 80000,
    },
    {
      icon: <LineChart className="text-green-600" />,
      title: "Save for Investment",
      daysLeft: 143,
      progress: 60,
      current: 120000,
      target: 200000,
    },
  ];

  

  return (
    <div className="p-6 min-h-screen space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center  mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Financial Goals</h1>
          <p className="text-gray-500  text-sm">
            Track your saving goals and progress
          </p>
        </div>

        {/* Add Goal Button */}
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all">
          <Plus size={18} />
          <span>Add Goal</span>
        </button>
      </div>

<div className="grid grid-cols-3 gap-6">
    <KpiDataCard title="Total Goals" value={4} icon={<Target className="text-green-500"/>} />
    <KpiDataCard title="Total Target" value={530000} icon={<TrendingUp className="text-blue-500"/>}/>
    <KpiDataCard title="Total Saved" value={350000} icon={<TrendingUp className="text-blue-500"/>}/>

</div>
<div className="grid grid-cols-2 gap-7">
{goals.map((goal,i)=>(
<CardStat key={i}{...goal}/>
))}
</div>
      
    </div>
  );
};

export default GoalsPage;
