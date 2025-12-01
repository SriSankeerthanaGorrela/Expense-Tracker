"use client";
import React, { useState } from "react";
import { useAuthStore } from "../store/authstore";
import { useRouter } from "next/navigation";
import { db } from "../lib/firebase";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";
import { Plus, Shell, X } from "lucide-react";
import toast from "react-hot-toast";

type Goal = {
  id: string; // now string because Firestore doc IDs are strings
  goalName: string;
  goalType: string;
  targetAmount: number;
};

const goalOptions = [
  "Emergency Fund",
  "Vacation",
  "Education",
  "Retirement",
  "Other",
];

function ThirdStep() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: "", goalName: "", goalType: "", targetAmount: 0 },
  ]);
const [loading, setLoading] = useState(false);

  const { user, setIsNewuser } = useAuthStore();
  const router = useRouter();

  // -------------------------------
  // HANDLE FIELD UPDATE
  // -------------------------------
  const handleGoalChange = (
    index: number,
    field: keyof Goal,
    value: string | number
  ) => {
    setGoals((prev) =>
      prev.map((goal, i) =>
        i === index ? { ...goal, [field]: value } : goal
      )
    );
  };

  // -------------------------------
  // ADD NEW GOAL
  // -------------------------------
  const addGoal = () => {
    setGoals((prev) => [
      ...prev,
      { id: "", goalName: "", goalType: "", targetAmount: 0 },
    ]);
  };

  // -------------------------------
  // REMOVE A GOAL
  // -------------------------------
  const removeGoal = (index: number) => {
    setGoals((prev) => prev.filter((_, i) => i !== index));
  };

  // -------------------------------
  // SUBMIT FORM
  // -------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.uid) return toast.error("User not logged in");

    try {
      setLoading(true);
      for (const goal of goals) {
        // 1️⃣ Create new Firestore doc
        const docRef = await addDoc(
          collection(db, "users", user.uid, "goals"),
          {
            goalName: goal.goalName,
            goalType: goal.goalType,
            targetAmount: goal.targetAmount,
            current: 0,
          }
        );

        // 2️⃣ Save the doc ID inside the document
        await updateDoc(
          doc(db, "users", user.uid, "goals", docRef.id),
          {
            id: docRef.id,
          },
        );
      }
  await updateDoc(doc(db, "users", user.uid), {
      isNewuser: false,
    });
      toast.success("Goals saved successfully!");
      setIsNewuser(false);
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
      

    } catch (error) {
      console.error("Error saving goals:", error);
      toast.error("Failed to save goals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="dark:bg-gray-900 p-4 rounded-xl space-y-4"
    >
      <h2 className="text-lg font-semibold flex gap-3  text-gray-800 dark:text-gray-200">
        <Shell /> Financial Goals
      </h2>

      {goals.map((goal, index) => (
        <div
          key={index}
          className="grid grid-cols-3 gap-3 items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
        >
          {/* Goal Name */}
          <input
            type="text"
            placeholder="Goal Name"
            value={goal.goalName}
            onChange={(e) =>
              handleGoalChange(index, "goalName", e.target.value)
            }
            className="input-field"
          />

          {/* Goal Type */}
          <select
            value={goal.goalType}
            onChange={(e) =>
              handleGoalChange(index, "goalType", e.target.value)
            }
            className="input-field"
          >
            <option value="">Select Goal Type</option>
            {goalOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* Target Amount + Remove button */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Target Amount (₹)"
              value={goal.targetAmount || ""}
              onChange={(e) =>
                handleGoalChange(index, "targetAmount", Number(e.target.value))
              }
              className="input-field flex-1"
            />

            {index > 0 && (
              <button
                type="button"
                onClick={() => removeGoal(index)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
               <X />
              </button>
            )}
          </div>
        </div>
      ))}

      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={addGoal}
          className="btn-primary flex gap-2 px-4 py-2 rounded-lg"
        >
        <Plus/> Goal
        </button>

        <button type="submit" disabled={loading} className="btn-primary px-6 py-2 rounded-lg">
          {loading ? (
             <>
      <span className="loader border-2 border-t-transparent border-white rounded-full w-4 h-4 animate-spin"></span>
          Submitting...
          </>
          ) :(
            "Submit"
            )}
        </button>
      </div>
    </form>
  );
}

export default ThirdStep;
