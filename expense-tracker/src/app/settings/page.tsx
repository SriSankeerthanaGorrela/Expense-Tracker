"use client";
import React, { useState } from "react";
import Dialog from "../components/Dialog";
import SettingsPage from "./FormEdit";
import { useAuthStore } from "../store/authstore";
import Updatepassword from "./Updatepassword";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

function Page() {
  const [isEditing, setIsEditing] = useState(false);
    const { user, logout } = useAuthStore();
    const router = useRouter();
  const handleLogout = async() => {
    logout()
    router.push('/login')
  }
  return (
    <div className="min-h-screen p-8 space-y-8 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
          <p className="text-gray-500 text-sm">Manage your personal and financial details</p>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="flex items-cente gap-2 btn-primary"
        >
          Edit Details
        </button>
      </div>

      {/* Profile Info Card */}
      <div className="bg-white shadow-md rounded-2xl border border-gray-200 p-8 w-full  mx-auto space-y-6">
        <h2 className="text-xl font-semibold flex gap-3 items-center text-gray-700 ">
         <User className="bg-teal-100  text-teal-400 p-1 rounded-md" size={30}/> Personal Information
        </h2>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              value={user?.name || ""}
              readOnly
              className="border border-gray-300 rounded-lg p-2 bg-gray-100 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="border border-gray-300 rounded-lg p-2 bg-gray-100 focus:outline-none"
            />
          </div>

          {/* Income */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Monthly Income</label>
            <input
              type="number"
              value={user?.income || ""}
              readOnly
              className="border border-gray-300 rounded-lg p-2 bg-gray-100 focus:outline-none "
            />
          </div>

          {/* Target Savings */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Target Savings (%)</label>
            <input
              type="number"
              value={user?.targetSavings || ""}
              readOnly
              className="border border-gray-300 rounded-lg p-2 bg-gray-100 focus:outline-none "
            />
          </div>
        </form>
      </div>

      {/* Edit Dialog */}
      {isEditing && (
        <Dialog open={isEditing} onClose={() => setIsEditing(false)} size="lg">
          <SettingsPage onClose={() => setIsEditing(false)} />
        </Dialog>
      )}
          <div>
              

              <Updatepassword />
          </div>
          <div className="bg-white rounded-xl flex justify-between p-4 shadow-md">
              <h2 className="text-gray-700 text-xl flex items-center gap-3 font-semibold">
                  <LogOut size={30} className="bg-red-100 text-red-400 p-1.5 rounded-md" />Logout</h2>
               <button
          onClick={handleLogout}
          className="flex items-center  px-5 py-2 bg-red-500  text-white hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg">
          
          <span>Logout</span>
        </button>
              
          </div>
    </div>
  );
}

export default Page;
