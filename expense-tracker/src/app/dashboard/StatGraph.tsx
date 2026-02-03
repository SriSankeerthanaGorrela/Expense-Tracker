'use client'

import React from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'


const StatGraph = ({ graph }: { graph: monthlyExpensesType[] }) => {
  return (
    <div className="">
      <div className="bg-white rounded-xl shadow-md p-4 space-y-5 border border-gray-200 ">
        
        {/* --- Header --- */}
        <div className="flex items-center justify-between border-b pb-3 border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 ">
            Monthly Expenses
          </h2>
          {/* <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            Filter
          </button> */}
        </div>

        {/* --- Chart --- */}
        
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graph} barSize={35}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#6b7280' }} 
                tickLine={false} 
                axisLine={{ stroke: '#d1d5db' }}
              />
              <YAxis 
                tick={{ fill: '#6b7280' }} 
                tickLine={false} 
                axisLine={{ stroke: '#d1d5db' }}
              />
              <Tooltip
                cursor={{ fill: '#f3f4f6' }}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  color: '#111827',
                }}
              />
              <Bar 
                dataKey="expense" 
                fill="#48A860" 
                radius={[6, 6, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    
  )
}

export default StatGraph
