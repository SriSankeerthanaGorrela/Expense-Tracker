"use client"
import React, { useState } from 'react'
import TransactionTable from './transactionTable'
import { BookOpen, Briefcase, Bus, Coffee, Film, Gift, HeartPulse, Home, Search, ShoppingBag, Wallet } from 'lucide-react';
function page() {
     const recentTransaction = [
  {
    icon: <Coffee className="text-orange-500" />,
    description: "Lunch at Restaurant",
    category: "Food & Dining",
    payment:"UPI",
    date: "2025-11-03",
    amount: -850.0,
  },
  {
    icon: <Briefcase className="text-green-600" />,
    description: "Freelance Payment",
    payment:"Bank",
    category: "Income",
    date: "2025-11-02",
    amount: 5000.0,
  },
  {
    icon: <Film className="text-red-500" />,
    description: "Netflix Subscription",
     payment:"Card",
    category: "Entertainment",
    date: "2025-11-01",
    amount: -499.0,
  },
  {
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
  const category=["Food & Dining","Shopping","Entertainment","Health","Gifts","Transportation","Home","Education",'Income']
  return (
    <div className='space-y-4'>
      <div>   <h2 className='text-3xl font-bold '>Transactions</h2>
      <p>view and manage all your transactions</p></div>
   
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
          <TransactionTable data={filteredTransaction}/>
    </div>
  )
}

export default page