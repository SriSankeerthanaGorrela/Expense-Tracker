"use client";
import React, { useState } from "react";
import { GoalCardProps } from "../components/(share_types)/AllTypes";

interface AddGoalFormType {
  onClose: () => void;
  onAddGoal:(goal:GoalCardProps)=>void
  onSave:(goalUpdate:GoalCardProps)=>void
  editGoal:GoalCardProps | null
}

const AddGoalForm: React.FC<AddGoalFormType> = ({ onClose,onAddGoal,onSave,editGoal }) => {
  const [formData, setFormData] = useState({
    title: "",
    current: "",
    target: "",
    date: "",
  });
React.useEffect(() => {
  if (editGoal) {
    setFormData({
      title: editGoal.title || "",
      current: editGoal.current?.toString() || "",
      target: editGoal.target?.toString() || "",
      date: editGoal.targetDate || "",
    });
  } else {
    setFormData({ title: "", current: "", target: "", date: "" });
  }
}, [editGoal]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
   
      //Convert string inputs to numbers before passing to parent
    const goal: GoalCardProps = {
      title: formData.title,
      current: Number(formData.current),
      target: Number(formData.target),
      targetDate: formData.date,
      id:editGoal?.id || ""
    };
    
    console.log("Goal added:", formData);
   if (editGoal) {
  onSave(goal); // call update function
} else {
  onAddGoal(goal); // call add function
}
onClose();
  }

  return (
    <div className="bg-white  p-6 rounded-lg shadow-lg w-full">
      <h1 className="text-xl font-semibold mb-4 text-gray-800 ">
        {editGoal ? "Edit Goal" : "Add Goal"}
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Goal Title */}
        <div className="space-y-1">
          <label className="label">Goal Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your goal..."
            className="input-field w-full"
            required
          />
        </div>

        {/* Target Amount */}
        <div className="space-y-1">
          <label className="label">Goal Amount</label>
          <input
            type="number"
            name="target"
            value={formData.target}
            onChange={handleChange}
            placeholder="Enter your amount..."
            className="input-field w-full"
            required
          />
        </div>

        {/* Target Date */}
        <div className="space-y-1">
          <label className="label">Target Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Enter target date..."
            className="input-field w-full"
          />
        </div>

        {/* Current Amount */}
        <div className="space-y-1">
          <label className="label">Current Amount</label>
          <input
            type="number"
            name="current"
            value={formData.current}
            onChange={handleChange}
            placeholder="Enter current amount..."
            className="input-field w-full"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
           {editGoal ? "Update Goal" : "Add Goal"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGoalForm;
