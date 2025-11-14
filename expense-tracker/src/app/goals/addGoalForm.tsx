"use client";

import React, { useState } from "react";

const goalOptions = [
  "Emergency Fund",
  "Vacation",
  "Education",
  "Retirement",
  "Other",
];

export default function AddGoalDialog({ onClose, onSave }) {
  const [form, setForm] = useState({
    goalName: "",
    goalType: "",
    targetAmount: 0,
    targetDate: "",
    current: 0,
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div className="">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96 space-y-4">

        <h2 className="text-lg font-semibold">Add New Goal</h2>

        <input
          className="input-field"
          placeholder="Goal Name"
          value={form.goalName}
          onChange={(e) => handleChange("goalName", e.target.value)}
        />

        <select
          className="input-field"
          value={form.goalType}
          onChange={(e) => handleChange("goalType", e.target.value)}
        >
          <option value="">Select Type</option>
          {goalOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>

        <input
          type="number"
          className="input-field"
          placeholder="Target Amount"
          value={form.targetAmount}
          onChange={(e) => handleChange("targetAmount", +e.target.value)}
        />

        <input
          type="date"
          className="input-field"
          value={form.targetDate}
          onChange={(e) => handleChange("targetDate", e.target.value)}
        />

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
