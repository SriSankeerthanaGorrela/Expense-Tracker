import React from "react";

interface GoalCardProps {
  icon: React.ReactNode;
  title: string;
  daysLeft: number;
  progress: number; 
  current: number;
  target: number;
  onAddMoney?: () => void;
  onEditGoal?: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({
  icon,
  title,
  daysLeft,
  progress,
  current,
  target,
  onAddMoney,
  onEditGoal,
}) => {
  return (
    <div className="p-5 w-full bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700">
      
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white text-lg">{title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{daysLeft} days left</p>
          </div>
        </div>
        <span className="text-sm font-semibold text-green-600">{progress}%</span>
      </div>

      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
        <div
          className="bg-green-500 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      
      <div className="flex justify-between border-b border-gray-200  pb-3 text-sm text-gray-600 dark:text-gray-300 mb-4">
        <div>
          <p>Current</p>
          <p className="font-semibold text-gray-900 dark:text-white">₹{current.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p>Target</p>
          <p className="font-semibold text-gray-900 dark:text-white">₹{target.toLocaleString()}</p>
        </div>
      </div>

    
      <div className="flex  justify-between p-2 items-center gap-6">
        <button
          onClick={onAddMoney}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-lg text-sm font-medium"
        >
          Add Money
        </button>
        <button
          onClick={onEditGoal}
          className="text-gray-600 dark:text-gray-300 hover:underline text-sm"
        >
          Edit Goal
        </button>
      </div>
    </div>
  );
};

export default GoalCard;
