"use client";
import { useState } from "react";
import { Bell, Settings } from "lucide-react";


export default function Topbar() {

    const [notificationsOpen, setNotificationsOpen] = useState(false);

    // const notifications = [
    //     { id: 1, message: "New appointment booked", time: "5 min ago", type: "appointment" },
    //     { id: 2, message: "Inventory running low", time: "1 hour ago", type: "inventory" },
    //     { id: 3, message: "Client review received", time: "2 hours ago", type: "review" },
    // ];

    return (
        <header className="bg-white dark:bg-[#0d1117]  border-b  border-gray-200 dark:border-gray-700 !p-2 !px-3 shadow-sm">
            <div className="flex items-center justify-between">
                {/* Page Title */}
                <div>
                    <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 font-playfair">
                        Salon Dashboard
                    </h1>
                    <p className="text-gray-500 text-xs mt-1">
                        Welcome back, {"Manager"}! Here&apos;s what&apos;s happening today.
                    </p>
                </div>

                {/* Right Section */}
                <div className="flex items-center justify-between !space-x-4">
                    {/* Quick Stats */}


                    {/* Search Bar */}


                    {/* Notifications */}
                    <div className="relative flex justify-between items-center !gap-4">
                        <button
                            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            onClick={() => setNotificationsOpen(!notificationsOpen)}
                        >
                            <Bell className="w-6 h-6 dark:text-blue-500"  />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* {notificationsOpen && (
                            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.map((notification) => (
                                        <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                                            <p className="text-sm text-gray-900">{notification.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-2 border-t border-gray-200">
                                    <button className="w-full text-center text-sm text-pink-600 hover:text-pink-700 py-2">
                                        View All Notifications
                                    </button>
                                </div>
                            </div>
                        )} */} 
                    </div>
                            {/* <ThemeToggle/> */}
                    {/* Settings */}
                    <button className="p-2 text-gray-600 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Settings className="w-6 h-6 dark:text-blue-500" />
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center !space-x-3 !pl-2 border-l border-gray-200 dark:border-gray-600">
                        <div className="text-right">
                            <p className=" text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {"Salon Manager"}
                            </p>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                        <div className="w-10 h-10 bg-black dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                                {("SM").charAt(0).toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}