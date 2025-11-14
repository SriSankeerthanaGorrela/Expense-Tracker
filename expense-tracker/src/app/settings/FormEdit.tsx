"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

import { useAuthStore } from "@/app/store/authstore";
import { db } from "../lib/firebase";
import { Trash2 } from "lucide-react";

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

  // Dynamic Fields
  const {
    fields: budgetFields,
    append: addBudget,
    remove: removeBudget,
  } = useFieldArray({
    control,
    name: "budgetCategories",
  });

  const {
    fields: goalFields,
    append: addGoal,
    remove: removeGoal,
  } = useFieldArray({
    control,
    name: "goals",
  });

  // Fetch user data + subcollections
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        let userData = userSnap.exists() ? userSnap.data() : {};

        // Fetch Budget Categories
        const budgetSnap = await getDocs(
          collection(db, "users", user.uid, "budgetCategories")
        );
        const budgetData = budgetSnap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        // Fetch Goals
        const goalsSnap = await getDocs(
          collection(db, "users", user.uid, "goals")
        );
        const goalsData = goalsSnap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        reset({
          ...userData,
          email: user?.email,
          budgetCategories: budgetData,
          goals: goalsData,
        });
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, reset]);

  // Save Form
  const onSubmit = async (data) => {
    try {
      const userRef = doc(db, "users", user.uid);

      // Update main user data
      await updateDoc(userRef, {
        name: data.name,
        income: data.income,
        targetSavings: data.targetSavings,
      });

      // Update Budget Categories Subcollection
      const budgetRef = collection(db, "users", user.uid, "budgetCategories");
      const oldBudgetDocs = await getDocs(budgetRef);

      // Delete previous docs
      for (let docu of oldBudgetDocs.docs) {
        await deleteDoc(docu.ref);
      }

      // Add new docs
      for (let b of data.budgetCategories) {
        if (b.name.trim() !== "") {
          await addDoc(budgetRef, b);
        }
      }

      // Update Goals Subcollection
      const goalsRef = collection(db, "users", user.uid, "goals");
      const oldGoalDocs = await getDocs(goalsRef);

      for (let docu of oldGoalDocs.docs) {
        await deleteDoc(docu.ref);
      }

      for (let g of data.goals) {
        if (g.goalName.trim() !== "") {
          await addDoc(goalsRef, g);
        }
      }

      alert("Settings updated successfully!");
      if (onClose) onClose();
    } catch (err) {
      console.log("Error saving settings:", err);
    }
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Edit Your Details</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* PERSONAL DETAILS */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm">Name</label>
            <input
              {...register("name")}
              className="input-field"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Email</label>
            <input
              {...register("email")}
              readOnly
              className="input-field bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Monthly Income</label>
            <input
              {...register("income")}
              type="number"
              className="input-field"
              placeholder="Enter your income"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Target Savings (%)</label>
            <input
              {...register("targetSavings")}
              type="number"
              className="input-field"
              placeholder="Enter savings target"
            />
          </div>
        </div>

        {/* BUDGET CATEGORIES */}
        <div>
          <div className="flex justify-between mb-3">
            <h2 className="font-semibold text-lg">Budget Categories</h2>
            <button
              type="button"
              onClick={() => addBudget({ name: "", amount: "" })}
              className="bg-blue-500 px-4 py-2 rounded text-white"
            >
              Add Category
            </button>
          </div>

          {budgetFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-center mb-3">
              <input
                {...register(`budgetCategories.${index}.name`)}
                placeholder="Category"
                className="input-field"
              />

              <input
                {...register(`budgetCategories.${index}.amount`)}
                type="number"
                placeholder="Limit"
                className="input-field"
              />

              <button
                type="button"
                onClick={() => removeBudget(index)}
                className="text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* GOALS */}
        <div>
          <div className="flex justify-between mb-3">
            <h2 className="font-semibold text-lg">Goals</h2>
            <button
              type="button"
              onClick={() => addGoal({ goalName: "", targetAmount: "" })}
              className="bg-blue-500 px-4 py-2 rounded text-white"
            >
              Add Goal
            </button>
          </div>

          {goalFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-center mb-3">
              <input
                {...register(`goals.${index}.goalName`)}
                placeholder="Goal Name"
                className="input-field"
              />

              <input
                {...register(`goals.${index}.targetAmount`)}
                type="number"
                placeholder="Target ₹"
                className="input-field"
              />

              <button
                type="button"
                onClick={() => removeGoal(index)}
                className="text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* SUBMIT */}
        <div className="text-right">
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
