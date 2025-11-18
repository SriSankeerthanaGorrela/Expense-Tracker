'use client';
import React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { spendingByCategoryType } from './page';

const COLORS = [
  '#4f46e5', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6',
  '#8b5cf6', '#14b8a6', '#ec4899', '#84cc16', '#f97316',
  '#6366f1', '#06b6d4', '#eab308', '#9ca3af', '#0ea5e9'
];
export interface spendingByCategoryChartType {
  category: string;
  value: number;
  [key: string]: string | number;
}

const SpendingByCategory = ({
  category,
}: {
  category: spendingByCategoryType[];
}) => {
  return (
    <div className="">
      <div className="bg-white rounded-xl shadow-md p-4 space-y-5 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Spending by Category
          </h2>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            Filter
          </button>
        </div>

        {/* Pie Chart */}
        <div className="w-full h-[280px] md:h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={category as spendingByCategoryChartType[]}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                innerRadius="40%" // ✅ makes it a donut for clarity
                paddingAngle={4} // ✅ adds space between slices
                labelLine={false}
                label={({ name, percent }: { name?: string; percent?: number }) =>
                  (percent ?? 0) > 0.05 ? `${name} ${((percent ?? 0) * 100).toFixed(0)}%` : ''
                } // ✅ hides very small labels
              >
                {category.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
              />
              {/* <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconType="circle"
                wrapperStyle={{
                  paddingLeft: '20px',
                  fontSize: '13px',
                }}
              /> */}
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SpendingByCategory;
