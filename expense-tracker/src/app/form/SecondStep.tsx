"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { useAuthStore } from "../store/authstore";
import { useFirestoreDocument } from "../lib/useFirestoreDocument";
import { firestoreService } from "../lib/firestoreService";
import { useFirestoreCollection } from "../lib/useFirestoreCollection";

interface Category {
  name: string;
  amount: number;
}

interface SecondStepProps {
  onContinue: () => void;
}

const SecondStep: React.FC<SecondStepProps> = ({ onContinue }) => {
  const [categories, setCategories] = useState<Category[]>([
    { name: "Food", amount: 0 },
    { name: "Shopping", amount: 0},
    { name: "Hospitals", amount: 0 },
    { name: "EMIs", amount: 0 },
    {name:"Rent",amount:0},
    { name: "Transport", amount: 0 },
    { name: "Bills", amount: 0 },
  ]);

  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim() === "") return;
    const alreadyExists = categories.some(
      (cat) => cat.name.toLowerCase() === newCategory.toLowerCase()
    );
    if (alreadyExists) return;
    setCategories([...categories, { name: newCategory, amount: 0 }]);
    setNewCategory("");
  };

  const handleRemove = (name: string) => {
    setCategories(categories.filter((cat) => cat.name !== name));
  };

  const handleAmountChange = (name: string, value: string) => {
    setCategories(
      categories.map((cat) =>
        cat.name === name ? { ...cat, amount: Number(value) } : cat
      )
    );
  };
  const { user } = useAuthStore();
  const uid = user?.uid;
   const {
     addDocument,
        loading,
        error,
      } = useFirestoreCollection(`users/${user?.uid}/budgetCategories`);

  // 🔹 Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // stop page reload
    const hasEmpty = categories.some(
      (cat) => cat.amount === 0
    );

    if (hasEmpty) {
      alert("⚠️ Please fill all category amounts before continuing.");
      return;
    }

    try {
      // 🔥 Save to Firestore
      // await updateDocument({
      //   budgetCategories: categories, // field name inside Firestore doc
      // const path=["users",user?.uid,"budgetCategories"];
      // //add each category asa seperate document
      // for(const cat of categories){
      //   await firestoreService.addDocumentAtPath(path,cat)
      // }
    
     
    for (const cat of categories) {
      await addDocument(cat);
    }

    console.log("✅ Saved categories:", categories);
    onContinue();
  } catch (error) {
    console.error("Error saving categories:", error);
    alert("Failed to save categories. Try again!");
  }


  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 dark:bg-gray-900 p-4 rounded-xl"
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        Set Your Budget Categories
      </h2>

      {/* List of categories */}
      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4 w-full">
              <p className="font-medium text-gray-700 dark:text-gray-300 w-32">
                {cat.name}
              </p>
              <input
                type="number"
                placeholder="Enter amount (₹)"
                required
                value={cat.amount}
                onChange={(e) => handleAmountChange(cat.name, e.target.value)}
                className="input-field flex-1"
              />
            </div>

            <button
              type="button"
              onClick={() => handleRemove(cat.name)}
              className="ml-3 text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add new category */}
      <div className="flex items-center gap-3 mt-4">
        <input
          type="text"
          placeholder="Add new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="input-field flex-1"
        />
        <button
          type="button"
          onClick={handleAddCategory}
          className="btn-primary px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* Continue button */}
      <div className="flex justify-end mt-6">
        <button type="submit" className="btn-primary px-6 py-2 rounded-lg">
          Continue
        </button>
      </div>
    </form>
  );
};

export default SecondStep;
