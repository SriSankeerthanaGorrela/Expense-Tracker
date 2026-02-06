"use client";
import React, { useEffect, useState } from "react";
import TransactionTable from "./transactionTable";
import {
  PlusIcon,
  Search,
} from "lucide-react";
import Dialog from "../components/Dialog";
import AddTransactionForm, { category } from "./AddTransactionForm";
import { Budget, recentTransactionType } from "../components/(share_types)/AllTypes";
import { useFirestoreCollection } from "../lib/useFirestoreCollection";
import { useAuthStore } from "../store/authstore";
import { toJSDate } from "../dashboard/Monthlyexpenses";


function Page() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState("All");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<recentTransactionType | null>(null);
  const { user } = useAuthStore();
  const {
    docs: recentTransaction,
    addDocument,
    updateDocument,
    deleteDocument,
  } = useFirestoreCollection<recentTransactionType>(
    user ? `users/${user.uid}/transactions` : ""
  );
  const [filteredTransaction, setFilteredTransaction] =
    useState<recentTransactionType[]>(recentTransaction);
  const { docs: budgetcategories } = useFirestoreCollection<Budget>(
    user ? `users/${user.uid}/budgetCategories` : ""
  );
  console.log("budget categories in transaction page", budgetcategories);
  useEffect(() => {
    if (recentTransaction) setFilteredTransaction(recentTransaction);
  }, [recentTransaction]);

  const filteredData = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const result = recentTransaction.filter(
      (transaction) =>
        transaction.category.toLowerCase().includes(lowerQuery) ||
        toJSDate(transaction.date).toLocaleDateString().includes(lowerQuery) ||
        transaction.payment.toLowerCase().includes(lowerQuery) ||
        transaction.amount.toString().includes(lowerQuery)
    );
    setFilteredTransaction(result);
  };
  const handleFilter = (selectedCategory: string) => {
    if (selectedCategory === "All") {
      setFilteredTransaction(recentTransaction);
    } else {
      const result = recentTransaction.filter(
        (transaction) =>
          transaction.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredTransaction(result);
    }
  };

  const handleAddTransaction = async (
    //newTransaction: recentTransactionType
    newTransaction:Omit<recentTransactionType,"id">
  ) => {
    //   //setFilteredTransaction((prev)=>[newTransaction, ...prev])
    await addDocument(newTransaction);
    console.log("added transaction", newTransaction);
    setOpenDialog(false);
  };

  // const handleAddTransaction = async (newTransaction: recentTransactionType) => {
  //   const docRef = await addDocument(newTransaction);

  //   const transactionWithId = { ...newTransaction, id: docRef.id };
  //   console.log("✅ Added transaction:", transactionWithId);

  //   setFilteredTransaction((prev) => [transactionWithId, ...prev]);
  //   setOpenDialog(false);
  // };

  const handleEdit = (transaction: recentTransactionType) => {
    setEditingTransaction(transaction);
    setOpenDialog(true);
  };
  const handleUpdateTransaction = async (
    updatedTransaction: recentTransactionType
  ) => {
    if (!updatedTransaction.id) return console.error("Missing ID for update");
    // await updateDocument(updatedTransaction.id, updatedTransaction);
    const { id, ...data } = updatedTransaction;
await updateDocument(id, data);

    console.log("✅ Updated transaction");
    setFilteredTransaction((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
    setEditingTransaction(null);
    setOpenDialog(false);
  };

  const handleDeleteTransaction = async (id: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      await deleteDocument(id);
      console.log(" Deleted transaction");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold ">Transactions</h2>
          <p className="text-sm font-medium text-gray-600">
            view and manage all your transactions
          </p>
        </div>

        <button
          onClick={() => setOpenDialog(true)}
          className="flex justify-center items-center gap-2 bg-green-500 text-white px-3 py-2 shadow-md hover:bg-green-700 rounded-lg cursor-pointer"
        >
          <PlusIcon className="w-6 h-6" />
          <span title="add transaction">Transaction</span>
        </button>

        <Dialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
            setEditingTransaction(null);
          }}
          size="md"
        >
          <AddTransactionForm
            onClose={() => setOpenDialog(false)}
            categories={category}
            onSave={
              editingTransaction
                ? handleUpdateTransaction
                : handleAddTransaction
            }
            editingData={editingTransaction}
          />
        </Dialog>
      </div>
      <div className="flex justify-end gap-8">
        <div className="relative w-1/3 ">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Start search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              filteredData(e.target.value);
            }}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 "
          />
        </div>
        <div>
          <select
            value={categories}
            onChange={(e) => {
              setCategories(e.target.value);
              handleFilter(e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm  
              focus:outline-none focus:ring-2 focus:ring-blue-400
    appearance-none"
          >
            <option value="All">All Categories</option>
            {budgetcategories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <TransactionTable
        data={filteredTransaction}
        onEdit={handleEdit}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
}

export default Page;
