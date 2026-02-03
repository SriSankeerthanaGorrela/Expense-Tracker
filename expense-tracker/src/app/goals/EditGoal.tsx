"use client";

import React, { useEffect, useState } from "react";
import { EditGoalInput, GoalCardProps } from "../components/(share_types)/AllTypes";
interface EditGoalTypeProps{
  goal:GoalCardProps;
  onClose:()=>void;
  onSave:(updatedGoal:Partial<EditGoalInput>)=>void
}
export default function EditGoalDialog({ goal, onClose, onSave }:EditGoalTypeProps) {
  const [form, setForm] = useState<EditGoalInput>({
    goalName: "",
    targetAmount: 0,
    goalType: "",
    targetDate: "",
    current:0
  });

  useEffect(() => {
    if (goal) {
      setForm({
        goalName: goal.goalName ?? "",
        targetAmount: Number(goal.targetAmount ?? 0),
        goalType: goal.goalType ?? "",
        targetDate: goal.targetDate ?? "",
        current: Number(goal.current ?? 0)
      });
    }
  }, [goal]);

  const handleChange = (field: keyof EditGoalInput, value:string | number) =>
    setForm({ ...form, [field]: value });

  return (
    <div className="flex justify-center items-center">
      <div className="p-6 rounded-xl w-96 space-y-4 ">
        <h2 className="text-xl font-semibold">Edit Goal</h2>
        <div className="grid grid-cols-2 gap-4">
    <div className="space-y-2">
      <label className="label">Goal Name</label>
        <input
          className="input-field"
          value={form.goalName}
          onChange={(e) => handleChange("goalName", e.target.value)}
        />
        </div>
        <div className="space-y-2">
      <label className="label">Goal Type</label>
        <input
          type="number"
          className="input-field"
          value={form.targetAmount}
          onChange={(e) => handleChange("targetAmount", Number(e.target.value) || 0)}
        />
        </div>
        <div className="space-y-2">
      <label className="label">Target Amount</label>
 <input
          type="number"
          className="input-field"
          value={form.current}
          onChange={(e) => handleChange("current", Number(e.target.value) || 0)}
        />

        </div>
        <div className="space-y-2">
      <label className="label">Target Date</label>
        <input
          type="date"
          className="input-field"
          value={form.targetDate || ""}
          onChange={(e) => handleChange("targetDate", e.target.value)}
        />
        </div>
        </div>
        <div className="flex gap-3  justify-center pt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(form);
              onClose();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
      </div>
    
  );
}
