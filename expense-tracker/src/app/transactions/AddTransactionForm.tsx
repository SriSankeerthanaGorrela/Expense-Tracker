import React, { useEffect, useState } from "react";
import { Budget, recentTransactionType } from "../components/(share_types)/AllTypes";
import { useFirestoreCollection } from "../lib/useFirestoreCollection";
import { useAuthStore } from "../store/authstore";
import { Plus } from "lucide-react";
import Link from "next/link";
export const category = [
  "Food & Dining",
  "Shopping",
  "Entertainment",
  "Health",
  "Gifts",
  "Transportation",
  "Home",
  "Education",
  "Income",
];
interface AddTransactionFormTypeProp {
  onClose: () => void;
  categories: string[];
  onSave: (newTransaction: recentTransactionType) => void;
  editingData?: recentTransactionType | null;
}
import { Timestamp } from "firebase/firestore";

const formatDateForInput = (date: string | Timestamp): string => {
  if (date instanceof Timestamp) {
    return date.toDate().toISOString().split("T")[0]; // YYYY-MM-DD
  }
  return date;
};

const AddTransactionForm: React.FC<AddTransactionFormTypeProp> = ({
  onClose,
  onSave,
  editingData,
}) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    payment: "",
    date: "",
  });
  useEffect(() => {
    if (editingData) {
      setFormData({
        description: editingData.description || "",
        amount: String(editingData.amount) || "",
        category: editingData.category || "",
        payment: editingData.payment || "",
        date: formatDateForInput(editingData.date || ""),
      });
    } else {
      // reset form when no editingData
      setFormData({
        description: "",
        amount: "",
        category: "",
        payment: "",
        date: "",
      });
    }
  }, [editingData]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("new transaction", formData);

    const transaction: recentTransactionType = {
      ...formData,
      amount: Number(formData.amount),
    };

    if (editingData) {
      // merge existing id from editingData
      console.log(
        "🧾 Saving transaction:",
        editingData ? { ...editingData, ...formData } : formData
      );

      onSave({ ...editingData, ...transaction });
    } else {
      onSave(transaction); // let Firestore auto-generate id
    }

    onClose();
  };
  const { user } = useAuthStore();
  const { docs: budgetcategories } = useFirestoreCollection<Budget>(
    `users/${user?.uid}/budgetCategories`
  );
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {editingData ? "Edit Transaction" : "Add New Transaction"}
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="label">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description..."
            className="input-field"
          />
        </div>
        <div className="space-y-2">
          <label className="label">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount..."
            className="input-field"
          />
        </div>
        <div className="space-y-2">
          <label className="label">Payment Method</label>
          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select payment</option>
            <option>UPI</option>
            <option>Card</option>
            <option>Cash</option>
            <option>Bank</option>
          </select>
        </div>
        <div className="space-y-2">
  <label className="label">Category</label>

  {budgetcategories.length === 0 ? (
    <div className="p-3 border rounded-md text-center text-gray-500">
      <p>No categories found.</p>
      <div className="w-full flex justify-center mt-4">
      <Link
        href="/budgets"
        className="px-4 py-2 bg-blue-600 text-white rounded-md 
                   flex items-center justify-center gap-2 
                   hover:bg-blue-700 transition"
      >
        <Plus /> Add Category
      </Link>
    </div>
    </div>
  ) : (
    <select
      name="category"
      value={formData.category}
      onChange={handleChange}
      className="input-field"
    >
      <option value="">Select category</option>

      {budgetcategories.map((cat) => (
        <option key={cat.id} value={cat.name}>{cat.name}</option>
      ))}
    </select>
  )}
</div>


        <div className="space-y-2">
          <label className="label">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            {editingData ? "Update Transaction" : "Add Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactionForm;
