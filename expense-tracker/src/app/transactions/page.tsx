"use client"
import React, { useState } from 'react'
import TransactionTable from './transactionTable'
import { BookOpen, Briefcase, Bus, Coffee, Film, Gift, HeartPulse, Home, PlusIcon, Search, ShoppingBag, Wallet } from 'lucide-react';
import Dialog from '../components/Dialog';
import AddTransactionForm from './AddTransactionForm';
import { recentTransactionType } from '../components/(share_types)/AllTypes';
export const category=["Food & Dining","Shopping","Entertainment","Health","Gifts","Transportation","Home","Education",'Income']

function Page() {
     const recentTransaction:recentTransactionType[] = [
  {
    id:"t1",
    icon: <Coffee className="text-orange-500" />,
    description: "Lunch at Restaurant",
    category: "Food & Dining",
    payment:"UPI",
    date: "2025-11-03",
    amount: -850.0,
  },
  {
    id:"t2",
    icon: <Briefcase className="text-green-600" />,
    description: "Freelance Payment",
    payment:"Bank",
    category: "Income",
    date: "2025-11-02",
    amount: 5000.0,
  },
  {
    id:"t3",
    icon: <Film className="text-red-500" />,
    description: "Netflix Subscription",
     payment:"Card",
    category: "Entertainment",
    date: "2025-11-01",
    amount: -499.0,
  },
  {
    id:"t4",
    icon: <ShoppingBag className="text-pink-500" />,
    description: "Mall Shopping",
     payment:"Cash",
    category: "Shopping",
    date: "2025-10-30",
    amount: -3200.0,
  },
  {
    icon: <Bus className="text-blue-500" />,
    description: "Taxi Ride",
     payment:"UPI",
    category: "Transport",
    date: "2025-10-29",
    amount: -250.0,
  },
  {
    icon: <Home className="text-gray-500" />,
    description: "Electricity Bill",
     payment:"UPI",
    category: "Utilities",
    date: "2025-10-28",
    amount: -1800.0,
  },
  {
    icon: <HeartPulse className="text-rose-500" />,
    description: "Doctor Visit",
     payment:"Card",
    category: "Health",
    date: "2025-10-27",
    amount: -600.0,
  },
  {
    icon: <Gift className="text-purple-500" />,
    description: "Birthday Gift",
     payment:"Cash",
    category: "Gifts",
    date: "2025-10-25",
    amount: -1200.0,
  },
  {
    icon: <BookOpen className="text-indigo-500" />,
    description: "Online Course",
     payment:"Cash",
    category: "Education",
    date: "2025-10-23",
    amount: -900.0,
  },
  {
    icon: <Wallet className="text-green-700" />,
    description: "Salary Credit",
     payment:"Bank",
    category: "Income",
    date: "2025-10-20",
    amount: 45000.0,
  },
  ];
  const[filteredTransaction,setFilteredTransaction]=useState(recentTransaction)
  const [search, setSearch] = useState("")
  const [categories,setCategories]=useState("All")
  const[openDialog,setOpenDialog]=useState(false)
  const[editingTransaction,setEditingTransaction]=useState<recentTransactionType | null>(null)
  const filteredData = (query:string) => {
    const lowerQuery = query.toLowerCase();
   const result= recentTransaction.filter((transaction) => 
     transaction.category.toLowerCase().includes(lowerQuery) ||
       transaction.date.includes(lowerQuery) ||
       transaction.payment.toLowerCase().includes(lowerQuery) ||
       transaction.amount.toString().includes(lowerQuery)
   
     
    )
    setFilteredTransaction(result)
  }
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

const handleAddTransaction=(newTransaction:recentTransactionType)=>{
  setFilteredTransaction((prev)=>[newTransaction, ...prev])
  setOpenDialog(false)
}
const handleEdit = (transaction: recentTransactionType) => {
    setEditingTransaction(transaction);
    setOpenDialog(true);
  };
  const handleUpdateTransaction = (updatedTransaction: recentTransactionType) => {
    setFilteredTransaction((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
    setEditingTransaction(null);
    setOpenDialog(false);
  };

    const handleDeleteTransaction = (id: string) => {
  if (confirm("Are you sure you want to delete this transaction?")) {

    //id="t2", filter runs like-> t1->"t1"!=="t2" ==> condition is true, we keep it
    //                            t2->"t2"!=="t2"==>condition is false , remove it
    setFilteredTransaction((prev) => prev.filter((t) => t.id !== id));
  }
};


  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>  
        <div className='space-y-2'>
      <h2 className='text-3xl font-bold '>Transactions</h2>
      <p className='text-sm font-medium text-gray-600'>view and manage all your transactions</p>
      </div>
      
        <button onClick={()=>setOpenDialog(true)} className='flex justify-center items-center gap-2 bg-green-500 text-white px-3 py-2 shadow-md hover:bg-green-700 rounded-lg cursor-pointer'>
          <PlusIcon className='w-6 h-6'/>
          <span title='add transaction'>Transaction</span>
        </button>
      
          <Dialog open={openDialog} onClose={()=>{setOpenDialog(false);setEditingTransaction(null)}} size="md">
            <AddTransactionForm onClose={()=>setOpenDialog(false)} categories={category} onSave={editingTransaction ? handleUpdateTransaction : handleAddTransaction} editingData={editingTransaction}/>
          </Dialog>
        
      </div> 
      <div className='flex justify-end gap-8'>
       <div className="relative w-1/3 ">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Start search"
            value={search}
          onChange={(e) => {
            setSearch(e.target.value)
              filteredData(e.target.value)
            } }
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700"
        />
        
        </div>
        <div>
          <select
            value={categories}
            onChange={(e) => {
              setCategories(e.target.value)
              handleFilter(e.target.value)
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 
              focus:outline-none focus:ring-2 focus:ring-blue-400
    appearance-none"
          >
            <option value="All" >
      All Categories
    </option>
            {category
             
              .map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              )
              )
            }
          </select>
        </div>

        </div>
          <TransactionTable data={filteredTransaction} onEdit={handleEdit}  onDelete={handleDeleteTransaction}/>
    </div>
  )
}

export default Page