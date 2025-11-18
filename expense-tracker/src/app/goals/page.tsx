

"use client";

import React, { useState } from "react";
import KpiDataCard from "../components/kpiDataCard";
import { useAuthStore } from "../store/authstore";
import { useFirestoreCollection } from "../lib/useFirestoreCollection";
import AddGoalDialog from "./addGoalForm";
import AddMoneyDialog from "./AddMoney";
import EditGoalDialog from "./EditGoal";
import Dialog from "../components/Dialog";
import { GoalCardProps } from "../components/(share_types)/AllTypes";
import {
  Target,
  PiggyBank,
  Wallet,
  PlusCircle,
  Pencil,
  CalendarDays,
} from "lucide-react";
import toast from "react-hot-toast";

function Page() {
  const { user } = useAuthStore();

  const {
    docs: goalsdata,
    addDocument,
    updateDocument,
  } = useFirestoreCollection<GoalCardProps>(`users/${user?.uid}/goals`);

  const [openAddGoal, setOpenAddGoal] = useState(false);
  const [openAddMoney, setOpenAddMoney] = useState(false);
  const [openEditGoal, setOpenEditGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<GoalCardProps | null>(null);

  // KPI Calculations
  const totalGoals = goalsdata.length;
  const totalTarget = goalsdata.reduce((sum, g) => sum + Number(g.targetAmount || 0), 0);
  const totalSaved = goalsdata.reduce((sum, g) => sum + Number(g.current || 0), 0);

  const openAddGoalDialog = () => setOpenAddGoal(true);

  const openAddMoneyDialog = (goal: GoalCardProps) => {
    setSelectedGoal(goal);
    setOpenAddMoney(true);
  };

  const openEditGoalDialog = (goal: GoalCardProps) => {
    setSelectedGoal(goal);
    setOpenEditGoal(true);
  };

  return (
    <div className="p-4 space-y-8">
      {/* Heading Section */}
      <div className="flex items-center justify-between">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Your Financial Goals</h1>
        <p className="text-gray-500 text-sm">
          Track your savings progress, set new targets, and stay motivated.
        </p>
      </header>

      {/* Add Goal Button */}
      <button
        className="flex items-center gap-2 btn-primary "
        onClick={openAddGoalDialog}
      >
        <PlusCircle className="w-5 h-5" />
        Add Goal
      </button>
</div>
      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiDataCard
          title="Total Goals"
          value={totalGoals}
          icon={<Target className="w-6 h-6 text-blue-600" />}
        />
        <KpiDataCard
          title="Total Target"
          value={totalTarget}
          icon={<PiggyBank className="w-6 h-6 text-green-600" />}
        />
        <KpiDataCard
          title="Total Saved"
          value={totalSaved}
          icon={<Wallet className="w-6 h-6 text-amber-600" />}
        />
      </section>

      {/* Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {goalsdata.map((goal) => {
          const current = goal.current || 0;
          const progress = Math.min(
            Math.round((Number(current) / Number(goal.targetAmount)) * 100),
            100
          );

          const daysLeft = Math.ceil(
            (new Date(goal.targetDate).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24)
          );

          return (
            <div
              key={goal.id}
              className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 space-y-4"
            >
              {/* Top Section */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col justify-between">
                  <h2 className="font-semibold text-lg">{goal.goalName}</h2>

                 
                  <p className="text-sm text-gray-500">
                    Target Date:{" "}
                    <span className="font-medium">{goal.targetDate}</span>
                  </p>
                   <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                    <CalendarDays className="w-4 h-4" />
                    <span>{daysLeft} days left</span>
                  </div>

                </div>

                <span className="text-sm font-semibold text-green-600">
                  {progress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Amount Section */}
              <div className="flex justify-between border-b pb-3">
                <div>
                  <p className="text-sm text-gray-600">Current</p>
                  <p className="font-semibold">₹{current}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Target</p>
                  <p className="font-semibold">₹{goal.targetAmount}</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => openAddMoneyDialog(goal)}
                  className="btn-primary flex gap-3 items-center"
                >
                  <Wallet className="w-4 h-4" />
                  Add Money
                </button>

                <button
                  onClick={() => openEditGoalDialog(goal)}
                  className="btn-primary flex gap-3 items-center"
                >
                  <Pencil className="w-4 h-4" />
                  Edit Goal
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dialogs */}
      <Dialog open={openAddGoal} size="md" onClose={() => setOpenAddGoal(false)}>
        <AddGoalDialog
          onClose={() => setOpenAddGoal(false)}
          onSave={async (goalData) => {
  await addDocument({
    ...goalData,
    current: Number(goalData.current || 0),
    targetAmount: Number(goalData.targetAmount || 0)
  });
  toast.success("Goal added successfully!");
  setOpenAddGoal(false);
}}

        />
      </Dialog>

      <Dialog open={openAddMoney} size="sm" onClose={() => {setOpenAddMoney(false);setSelectedGoal(null);}}>
  <AddMoneyDialog
    goal={selectedGoal!}
    onClose={() => { setOpenAddMoney(false);setSelectedGoal(null);}}
    onSave={(amount) => {
      updateDocument(selectedGoal!.id, {
        current: (selectedGoal?.current ?? 0) + amount,
      });
      toast.success("Amount added to goal successfully!");
      setOpenAddMoney(false)
      setSelectedGoal(null); 
    }}
  />
</Dialog>


      <Dialog open={openEditGoal} size="sm" onClose={() => setOpenEditGoal(false)}>
        <EditGoalDialog
          goal={selectedGoal!}
          onClose={() => setOpenEditGoal(false)}
         onSave={(updated) =>
  updateDocument(selectedGoal!.id, {
    ...updated,
    current: Number(updated.current || 0),
    targetAmount: Number(updated.targetAmount || 0)
  }).then(() => {
    toast.success("Goal updated successfully!");  // ⭐ ADD HERE
  })
}

        />
      </Dialog>
    </div>
  );
}

export default Page;
