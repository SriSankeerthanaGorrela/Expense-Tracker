"use client";

import { useEffect, useState } from "react";
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
import { Trash2 } from "lucide-react";

import { useAuthStore } from "@/app/store/authstore";
import { getFirebaseDB } from "../lib/firebase";

type SettingsForm = {
  name: string;
  email: string;
  income: number | "";
  targetSavings: number | "";
  budgetCategories: { name: string; amount: number | "" }[];
  goals: { goalName: string; targetAmount: number | "" }[];
};

const SettingsPage = ({ onClose }: { onClose?: () => void }) => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, control, reset } = useForm<SettingsForm>({
    defaultValues: {
      name: "",
      email: "",
      income: "",
      targetSavings: "",
      budgetCategories: [],
      goals: [],
    },
  });

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

  // ================= FETCH USER DATA =================
  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const db = getFirebaseDB();
        if (!db) return;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.exists() ? userSnap.data() : {};

        const budgetSnap = await getDocs(
          collection(db, "users", user.uid, "budgetCategories")
        );

        const goalsSnap = await getDocs(
          collection(db, "users", user.uid, "goals")
        );

        reset({
          name: userData.name ?? "",
          email: user.email ?? "",
          income: userData.income ?? "",
          targetSavings: userData.targetSavings ?? "",
          budgetCategories: budgetSnap.docs.map((d) => d.data() as any),
          goals: goalsSnap.docs.map((d) => d.data() as any),
        });
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.uid]);

  // ================= SAVE SETTINGS =================
  const onSubmit = async (data: SettingsForm) => {
    try {
      if (!user?.uid) return;

      const db = getFirebaseDB();
      if (!db) return;

      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        name: data.name,
        income: data.income,
        targetSavings: data.targetSavings,
      });

      // ---------- Budget Categories ----------
      const budgetRef = collection(db, "users", user.uid, "budgetCategories");
      const oldBudgets = await getDocs(budgetRef);

      await Promise.all(oldBudgets.docs.map((d) => deleteDoc(d.ref)));

      await Promise.all(
        data.budgetCategories
          .filter((b) => b.name?.trim())
          .map((b) => addDoc(budgetRef, b))
      );

      // ---------- Goals ----------
      const goalsRef = collection(db, "users", user.uid, "goals");
      const oldGoals = await getDocs(goalsRef);

      await Promise.all(oldGoals.docs.map((d) => deleteDoc(d.ref)));

      await Promise.all(
        data.goals
          .filter((g) => g.goalName?.trim())
          .map((g) => addDoc(goalsRef, g))
      );

      alert("Settings updated successfully!");
      onClose?.();
    } catch (err) {
      console.error("Error saving settings:", err);
    }
  };

  if (loading) {
    return <p className="p-6 text-center">Loading...</p>;
  }

  // ================= UI =================
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Edit Your Details</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* PERSONAL */}
        <div className="grid grid-cols-2 gap-6">
          <input {...register("name")} placeholder="Name" className="input-field" />
          <input {...register("email")} readOnly className="input-field bg-gray-100" />
          <input {...register("income")} type="number" placeholder="Income" className="input-field" />
          <input {...register("targetSavings")} type="number" placeholder="Savings %" className="input-field" />
        </div>

        {/* BUDGETS */}
        <div>
          <div className="flex justify-between mb-3">
            <h2 className="font-semibold">Budget Categories</h2>
            <button type="button" onClick={() => addBudget({ name: "", amount: "" })}>
              Add
            </button>
          </div>

          {budgetFields.map((f, i) => (
            <div key={f.id} className="flex gap-3 mb-2">
              <input {...register(`budgetCategories.${i}.name`)} className="input-field" />
              <input {...register(`budgetCategories.${i}.amount`)} type="number" className="input-field" />
              <button type="button" onClick={() => removeBudget(i)}>
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* GOALS */}
        <div>
          <div className="flex justify-between mb-3">
            <h2 className="font-semibold">Goals</h2>
            <button type="button" onClick={() => addGoal({ goalName: "", targetAmount: "" })}>
              Add
            </button>
          </div>

          {goalFields.map((f, i) => (
            <div key={f.id} className="flex gap-3 mb-2">
              <input {...register(`goals.${i}.goalName`)} className="input-field" />
              <input {...register(`goals.${i}.targetAmount`)} type="number" className="input-field" />
              <button type="button" onClick={() => removeGoal(i)}>
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;