"use client";
import React, { useState } from "react";
import { useAuthStore } from "../store/authstore";
import { useFirestoreDocument } from "../lib/useFirestoreDocument";
import { useRouter } from "next/navigation"

type Goal = {
  id: number;
  goalName: string;
  goalType: string;
  targetAmount: number;
};

const goalOptions = [
  "Emergency Fund",
  "Vacation",
  "Education",
  "Retirement",
  "Other",
];

function ThirdStep() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, goalName: "", goalType: "", targetAmount: 0 },
  ]);

  const { user } = useAuthStore();
  const { updateDocument } = useFirestoreDocument(`users/${user?.uid}`);
  const router  = useRouter()
  // ✅ Handle goal field changes
  const handleGoalChange = (
    id: number,
    field: keyof Goal,
    value: string | number
  ) => {
    setGoals((prev) =>
      prev.map((goal) => (goal.id === id ? { ...goal, [field]: value } : goal))
    );
  };

  // ✅ Add new goal
  const addGoal = () => {
    setGoals((prev) => [
      ...prev,
      { id: Date.now(), goalName: "", goalType: "", targetAmount: 0 },
    ]);
  };

  // ✅ Remove goal
  const removeGoal = (id: number) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };
  const { setIsNewuser }=useAuthStore()
  // ✅ Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    

    try {
      await updateDocument({ goals,isNewuser:false });
      alert("✅ Goals saved successfully!");
      setIsNewuser(false);
      router.push("/dashboard")
      
    } catch (error) {
      console.error("Error updating goals:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="dark:bg-gray-900 p-4 rounded-xl space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        🎯 Financial Goals
      </h2>

      {goals.map((goal, index) => (
        <div
          key={goal.id}
          className="grid grid-cols-3 gap-3 items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
        >
          <input
            type="text"
            placeholder="Goal Name"
            value={goal.goalName}
            onChange={(e) =>
              handleGoalChange(goal.id, "goalName", e.target.value)
            }
            className="input-field"
          />

          <select
            value={goal.goalType}
            onChange={(e) =>
              handleGoalChange(goal.id, "goalType", e.target.value)
            }
            className="input-field"
          >
            <option value="">Select Goal Type</option>
            {goalOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Target Amount (₹)"
              value={goal.targetAmount || ""}
              onChange={(e) =>
                handleGoalChange(goal.id, "targetAmount", Number(e.target.value))
              }
              className="input-field flex-1"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeGoal(goal.id)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      ))}

      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={addGoal}
          className="btn-primary px-4 py-2 rounded-lg"
        >
          ➕ Add Goal
        </button>

        <button type="submit" className="btn-primary px-6 py-2 rounded-lg">
          Submit
        </button>
      </div>
    </form>
  );
}

export default ThirdStep;
