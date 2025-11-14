'use client'
import { Laptop, LineChart, Plane, Plus, Shield, Target, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import KpiDataCard from "../components/kpiDataCard";
import CardStat from "../components/CardStat";
import Dialog from "../components/Dialog";
import AddGoalForm from "./addGoalForm";
import { GoalCardProps } from "../components/(share_types)/AllTypes";
import { useAuthStore } from "../store/authstore";
import { useFirestoreCollection } from "../lib/useFirestoreCollection";

const GoalsPage = () => {
  const { user } = useAuthStore();
  const { docs: goalsdata } = useFirestoreCollection(`users/${user?.uid}/goals`);
  console.log("Goals Data from Firestore:", goalsdata);
   const [goals, setGoals] = useState<GoalCardProps[]>([
    {
      id:"g1",
      icon: <Shield className="text-red-500" />,
      title: "Emergency Fund",
      targetDate: "2025-12-31", // ✅ new date
      current: 65000,
      target: 100000,
    },
    {
      id:"g2",
      icon: <Plane className="text-blue-500" />,
      title: "Vacation to Europe",
      targetDate: "2026-05-15",
      current: 45000,
      target: 150000,
    },
    {
      id:"g3",
      icon: <Laptop className="text-gray-700 dark:text-gray-300" />,
      title: "New Laptop",
      targetDate: "2025-12-01",
      current: 72000,
      target: 80000,
    },
    {
      id:"g4",
      icon: <LineChart className="text-green-600" />,
      title: "Save for Investment",
      targetDate: "2026-03-01",
      current: 120000,
      target: 200000,
    },
  ]);

  const[openDialog,setOpenDialog]=useState(false)
  const[editGoal,setEditGoal]=useState<GoalCardProps | null >(null)
  
  const handleAddGoal = (newGoal: GoalCardProps) => {
    setGoals((prev) => [...prev, newGoal]);
    setOpenDialog(false);
  };
 const handleEditGoal=(goalEdit:GoalCardProps)=>{
  setEditGoal(goalEdit);
  setOpenDialog(true)
 }
 const handleUpdateGoal = (updateGoal: GoalCardProps) => {
  setGoals((prev) =>
    prev.map((g) => (g.id === updateGoal.id ? updateGoal : g))
  );
  setEditGoal(null);
  setOpenDialog(false);
};

   const totalTarget = goalsdata.reduce((sum, g) => sum + Number(g.target), 0);
  const totalSaved = goalsdata.reduce((sum, g) => sum + Number(g.current), 0);
  const totalGoals=goalsdata.length

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
        <button onClick={()=>setOpenDialog(true)} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all">
          <Plus size={18} />
          <span>Add Goal</span>
        </button>
        <Dialog open={openDialog} onClose={()=>setOpenDialog(false)}>
      <AddGoalForm onClose={()=>setOpenDialog(false)} onAddGoal={handleAddGoal} onSave={handleUpdateGoal} editGoal={editGoal} />
        </Dialog>
      </div>

<div className="grid grid-cols-3 gap-6">
    <KpiDataCard title="Total Goals" value={totalGoals} icon={<Target className="text-green-500"/>} />
    <KpiDataCard title="Total Target" value={totalTarget} icon={<TrendingUp className="text-blue-500"/>}/>
    <KpiDataCard title="Total Saved" value={totalSaved} icon={<TrendingUp className="text-blue-500"/>}/>

</div>
<div className="grid grid-cols-2 gap-7">
{goals.map((goal,i)=>(
<CardStat key={i}{...goal} onEdit={()=>handleEditGoal(goal)}/>
))}
</div>
      
    </div>
  );
};

export default GoalsPage;
