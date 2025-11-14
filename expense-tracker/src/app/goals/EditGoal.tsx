"use client";

import React, { useState } from "react";

export default function EditGoalDialog({ goal, onClose, onSave }) {
  const [form, setForm] = useState({
    goalName: goal.goalName,
    targetAmount: goal.targetAmount,
    goalType: goal.goalType,
    targetDate: goal.targetDate,
  });

  const handleChange = (field, value) =>
    setForm({ ...form, [field]: value });

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96 space-y-4">
        <h2 className="text-lg">Edit Goal</h2>

        <input
          className="input-field"
          value={form.goalName}
          onChange={(e) => handleChange("goalName", e.target.value)}
        />

        <input
          type="number"
          className="input-field"
          value={form.targetAmount}
          onChange={(e) => handleChange("targetAmount", +e.target.value)}
        />

        <input
          type="date"
          className="input-field"
          value={form.targetDate}
          onChange={(e) => handleChange("targetDate", e.target.value)}
        />

        <div className="flex justify-between">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
