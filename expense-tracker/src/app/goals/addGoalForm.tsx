"use client";

import React, { useState } from "react";
import { NewGoalInput } from "../components/(share_types)/AllTypes";

const goalOptions = [
  "Emergency Fund",
  "Vacation",
  "Education",
  "Retirement",
  "Other",
];
type AddGoalTypeProps={
  onClose:()=>void;
  onSave:(data:NewGoalInput)=>void
}
export default function AddGoalDialog({ onClose, onSave }:AddGoalTypeProps) {
  const [form, setForm] = useState<NewGoalInput>({
    goalName: "",
    goalType: "",
    targetAmount: 0,
    targetDate: "",
    current: 0,
  });

  const handleChange = (field:keyof NewGoalInput, value:string | number) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="rounded-xl w-120 space-y-4">

        <h2 className="text-lg font-semibold">Add New Goal</h2>
<div className="space-y-1">
  <label className="label"> Goal Name</label>
        <input
          className="input-field"
          placeholder="EX: Trip to Thailand"
          value={form.goalName}
          onChange={(e) => handleChange("goalName", e.target.value)}
        />
         
</div>
<div className="space-y-1">
          <label className="label">
            Goal Type
          </label>
        <select
          className="input-field"
          value={form.goalType}
          onChange={(e) => handleChange("goalType", e.target.value)}
        >
          <option value="">Select a goal category</option>
          {goalOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
</div>
<div className="space-y-1">
  <label className="label">Target Amount</label>
        <input
          type="number"
          className="input-field"
          
          placeholder="Ex: 60000"
          value={form.targetAmount}
          onChange={(e) => handleChange("targetAmount", Number(e.target.value))}
        />
</div> 
<div className="space-y-1">
  <label className="label">
    Target Date
  </label>
        <input
          type="date"
          className="input-field"
          value={form.targetDate}
          onChange={(e) => handleChange("targetDate", e.target.value)}
        />
</div>
        <div className="flex justify-between pt-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
