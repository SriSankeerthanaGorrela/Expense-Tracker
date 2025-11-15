"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  List,
  PieChart,
  Target,
  FileText,
  TargetIcon,
  Tags,
  Wallet2,
  Settings,
  LogOut,
  LucideTarget,
  GoalIcon,
  
} from "lucide-react";
import { useAuthStore } from "../store/authstore";

const navItems = [
  { name: "Dashboard", icon: Home, path: "/dashboard" },
  { name: "Transactions", icon: List, path: "/transactions" },
  { name: "Budgets", icon: Target, path: "/budgets" },
  { name: "Goals", icon: GoalIcon, path: "/goals" },
  { name: "Analytics", icon: PieChart, path: "/analytics" },
  { name: "Settings", icon: Settings, path: "/settings" },

];



export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const {logout} =useAuthStore()

  const handleNav = (path: string) => {
    router.push(path);
  };
  const handleLogout = async() => {
    logout()
    router.push('/login')
  }

  return (
    <aside className="w-48 bg-white scroll-container dark:bg-slate-800 border-r overflow-y-auto border-slate-200 dark:border-slate-700 flex flex-col">
      {/* Main Nav */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => handleNav(item.path)}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors ${
                active
                  ? "bg-teal-400 text-white"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Utility Section */}
    
      {/* Bottom Section */}
      <div className="mt-auto px-2 mb-4 space-y-2">
       
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
