"use client";
import React, { useState } from "react";
import { useAuthStore } from "../store/authstore";
import { useFirestoreCollection } from "../lib/useFirestoreCollection";

function AddBudget({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
  });
  const { user } = useAuthStore();  
  const {docs:budgetsdata,addDocument}=useFirestoreCollection(`users/${user?.uid}/budgetCategories`);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.amount) {
      alert("Please fill all fields");
      return;
    }
    const newBudget = {
      name: formData.name,
      amount: Number(formData.amount),
    }
    addDocument(newBudget);

    console.log("🆕 New Budget Added:", formData);
   

    setFormData({ name: "", amount: "" }); // clear form after submit
    onClose(); // close dialog after adding
  };

  return (
    <div className="p-6  w-full  mx-auto ">
      <h1 className="text-xl font-semibold text-gray-700 mb-6 text-center">
        Add New Budget
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block text-gray-600 text-sm mb-1">Budget Name</label>
          <input
            type="text"
            placeholder="e.g. Food"
            className="input-field w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm mb-1">Budget Amount</label>
          <input
            type="number"
            placeholder="e.g. 3000"
            className="input-field w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBudget;
