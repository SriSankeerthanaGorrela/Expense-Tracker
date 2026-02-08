"use client";
import React from "react";
import { Wallet } from "lucide-react";
import { useAuthStore } from "../store/authstore";

export function Topbar() {
  const { user } = useAuthStore();
  console.log(user);

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
          <h2 className="gradient-text w-fit text-3xl font-semibold">
            Welcome back, {user?.name} !
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-teal-400 flex items-center justify-center text-white cursor-pointer">
            <span>
              {" "}
              {user?.name
                ?.split(" ")
                .map((word) => word[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
