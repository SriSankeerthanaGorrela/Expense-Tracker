"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { useAuthStore } from "@/app/store/authstore"; // your zustand auth store
import { Plus, Trash2 } from "lucide-react";
import { db } from "../lib/firebase";
import { on } from "events";

const SettingsPage = ({ onClose }) => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      income: "",
      targetSavings: "",
      budgetCategories: [],
      goals: [],
    },
  });

  // Dynamic fields
  const { fields: budgetFields, append: addBudget, remove: removeBudget } = useFieldArray({
    control,
    name: "budgetCategories",
  });

  const { fields: goalFields, append: addGoal, remove: removeGoal } = useFieldArray({
    control,
    name: "goals",
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          reset(userSnap.data());
        }
      
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user, reset]);

  // Save updated data
  const onSubmit = async (data) => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, data);
      alert("Details updated successfully ✅");
      if(onClose) onClose();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl gradient-text w-fit font-semibold">Edit Your Details</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 p-6  "
      >
        {/* =========================
            Personal Info Section
        ========================== */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm text-gray-700">Name</label>
            <input
              {...register("name")}
              className="input-field"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-700">Email</label>
            <input
              {...register("email")}
              type="email"
              className="input-field"
              readOnly
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-700">Monthly Income</label>
            <input
              {...register("income")}
              type="number"
              className="input-field"
              placeholder="Enter monthly income"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-700">Target Savings (%)</label>
            <input
              {...register("targetSavings")}
              type="number"
              className="input-field"
              placeholder="Enter target savings %"
            />
          </div>
        </div>

        {/* =========================
            Budget Categories Section
        ========================== */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Budget Categories</h2>
            <button
              type="button"
              onClick={() => addBudget({ name: "", amount: "" })}
              className="flex items-center gap-2 text-sm bg-blue-400 text-white px-5 py-2 rounded-lg hover:bg-blue-500"
            >
               Add Category
            </button>
          </div>

          {budgetFields.length === 0 && (
            <p className="text-gray-500 text-sm">No categories added yet.</p>
          )}

          <div className="space-y-3">
            {budgetFields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-center  ">
                <input
                  {...register(`budgetCategories.${index}.name`)}
                  placeholder="Category name (e.g., Food)"
                  className="input-field"
                />
                <input
                  {...register(`budgetCategories.${index}.amount`)}
                  placeholder="Limit (e.g., 3000)"
                  type="number"
                  className="input-field"
                />
                <button
                  type="button"
                  onClick={() => removeBudget(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* =========================
            Goals Section
        ========================== */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Goals</h2>
            <button
              type="button"
              onClick={() => addGoal({ goalName: "", targetAmount: "" })}
              className="flex items-center gap-2 text-sm bg-blue-400 text-white px-5 py-2 rounded-lg hover:bg-blue-500"
            >
               Add Goal
            </button>
          </div>

          {goalFields.length === 0 && (
            <p className="text-gray-500 text-sm">No goals added yet.</p>
          )}

          <div className="space-y-3">
            {goalFields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-center ">
                <input
                  {...register(`goals.${index}.goalName`)}
                  placeholder="Goal name (e.g., Emergency Fund)"
                  className="input-field"
                />
                <input
                  {...register(`goals.${index}.targetAmount`)}
                  placeholder="Target (e.g., 50000)"
                  type="number"
                  className="input-field"
                />
                <button
                  type="button"
                  onClick={() => removeGoal(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* =========================
            Submit Button
        ========================== */}
        <div className="text-right">
          <button
            type="submit"
            className="btn-primary  "
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
