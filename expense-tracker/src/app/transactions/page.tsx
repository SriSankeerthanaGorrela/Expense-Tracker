import React from 'react'
import TransactionTable from './transactionTable'
import { BookOpen, Briefcase, Bus, Coffee, Film, Gift, HeartPulse, Home, ShoppingBag, Wallet } from 'lucide-react';
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

  return (
      <div>
          <TransactionTable data={recentTransaction}/>
    </div>
  )
}

export default page