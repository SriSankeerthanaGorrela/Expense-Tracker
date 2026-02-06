"use client";

import React, { useState } from "react";
import { GoalCardProps } from "../components/(share_types)/AllTypes";
interface AddMoneyDialogProps {
  goal: GoalCardProps;
  onClose: () => void;
  onSave: (amount: number) => void;
}
export default function AddMoneyDialog({ goal, onClose, onSave } :AddMoneyDialogProps) {
  const [amount, setAmount] = useState(0);
  if(!goal) return null;

  return (
    <div className="flex justify-center items-center">
      <div className="p-6 rounded-xl w-80 space-y-4">
         <h2 className="text-xl font-semibold text-center">
          Add Money to <span className="text-green-600">{goal.goalName}</span>
        </h2>
    <p className="text-sm text-gray-500 text-center">This goal is closer than my salary at month-end</p>
        <input
          type="number"
          className="input-field"
          placeholder="Amount"
          onChange={(e) => setAmount(Number(e.target.value || 0))}
        />

        <div className="flex justify-between gap-2 pt-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={() => {
              if(Number.isNaN(amount)|| amount<=0) return;
              onSave(amount)
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
