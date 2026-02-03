"use client";
import React from "react";
import { Download, X } from "lucide-react";
import ExcelExport from "./ExcelExport";
import toast from "react-hot-toast";

interface GoalCompletedModalProps {
  isOpen: boolean;
  onClose: () => void;
  goalName: string;
  targetAmount: number;
  completedAt: string;
  contributions: unknown[];        // <-- added
}

export default function GoalCompletedModal({
  isOpen,
  onClose,
  goalName,
  targetAmount,
  completedAt,
  
  contributions,               // <-- added
}: GoalCompletedModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-[90%] max-w-[400px] p-6 relative shadow-lg">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">
          🎉 Goal Completed!
        </h2>

        {/* Info */}
        <p className="text-center text-gray-700 mb-4">
          You successfully achieved your goal <b>{goalName}</b>
        </p>

        <div className="bg-gray-100 rounded-lg p-3 text-center mb-4">
          <p className="text-gray-700 text-sm">
            Target Amount: <b>₹{targetAmount}</b>
          </p>
          <p className="text-gray-700 text-sm">
            Completed On: <b>{completedAt}</b>
          </p>
        </div>

        {/* Download Button */}
        <ExcelExport
          filename={`${goalName}-Savings-Report`}
          sheetName="Savings Report"
          data={contributions}
        >
          <button onClick={() => {
      toast.success("Downloading report...");
      
    }} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            <Download className="inline-block mr-2" />
            Download Savings Report
          </button>
        </ExcelExport>

        {/* Close */}
        <button
          onClick={onClose}
          className="w-full mt-2 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
