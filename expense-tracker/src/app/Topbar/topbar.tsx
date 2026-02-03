"use client"
import React from 'react';
import {  Wallet } from 'lucide-react';
import { useAuthStore } from '../store/authstore';


export function Topbar() {
  const { user } = useAuthStore();
  console.log(user)

  return (
    <nav className="bg-white  border-b border-slate-200  sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-400 rounded-xl flex items-center justify-center">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-slate-900 ">Expensely</h1>
            <p className="text-slate-500 ">Track, Save, Grow</p>
          </div>
        </div>
        <div>
          <h2 className='gradient-text w-fit text-3xl font-semibold'>Welcome back, {user?.name} !</h2>
  </div>
        <div className="flex items-center gap-4">
          {/* <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative">
            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
           */}
          {/* <button
            
            className="p-2 rounded-lg hover:bg-slate-100  transition-colors"
          >
            
              <Sun className="w-5 h-5 text-slate-400" />
              <Moon className="w-5 h-5 text-slate-600" />
          </button> */}

          <div className="w-10 h-10 rounded-full bg-teal-400 flex items-center justify-center text-white cursor-pointer">
            <span>SK</span>
          </div>
        </div>
      </div>
    </nav>
  );
}