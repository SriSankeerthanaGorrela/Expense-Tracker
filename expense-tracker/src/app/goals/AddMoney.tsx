"use client";

import React, { useState } from "react";

export default function AddMoneyDialog({ goal, onClose, onSave }) {
  const [amount, setAmount] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-80 space-y-4">
        <h2 className="text-lg font-semibold">Add Money to {goal.goalName}</h2>

        <input
          type="number"
          className="input-field"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
        />

        <div className="flex justify-between pt-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={() => onSave(amount)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
