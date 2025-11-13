"use client";
import React from "react";
import { Transaction } from "../dashboard/RecentTransaction";
import { Edit, IndianRupee, Trash } from "lucide-react";
import { recentTransactionType } from "../components/(share_types)/AllTypes";

interface TransactionTableProps {
  data: recentTransactionType[];
  onEdit: (transaction: recentTransactionType) => void;
  onDelete: (id: string) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  data,
  onEdit,
  onDelete,
}) => {  
  console.log("Transaction Data:", data);

  return (
  <div className="w-full overflow-x-auto rounded-xl shadow-xl">
    {data.length === 0 ? (
      <div className="p-6 text-center text-gray-500 italic">
        No transactions available.
      </div>
    ) : (
      <table className="min-w-full text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900">
        <thead className=" bg-blue-400 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Category</th>
            <th className="px-6 py-3 text-left">Description</th>
            <th className="px-6 py-3 text-left">Amount</th>
            <th className="px-6 py-3 text-left">Payment</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((t) => (
              <tr
                key={t.id}
                className="border-b divide-x divide-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {t.date}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {t.icon}
                    <span>{t.category}</span>
                  </div>
                </td>

                <td className="px-6 py-4">{t.description}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center text-green-600 dark:text-green-400 font-semibold">
                    <IndianRupee size={15} />
                    {t.amount}
                  </div>
                </td>

                <td className="px-6 py-4">{t.payment}</td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-4">
                    <button
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                      title="Edit"
                      onClick={()=>onEdit(t)}
                    >
                      <Edit size={17} />
                    </button>
                    <button
                    onClick={()=>onDelete(t.id!)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Delete"
                    >
                      <Trash size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="text-center py-8 text-gray-400 italic"
              >
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )}
    </div>
  );
}

export default TransactionTable;
