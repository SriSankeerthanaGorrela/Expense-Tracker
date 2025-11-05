"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "./store/authstore";
import AuthLayout from "./(auth)/layout";
import Login from "./(auth)/login/page";
import Register from "./(auth)/register/page";
import { Topbar } from "./Topbar/topbar";
import { Sidebar } from "./sidebar/page";


export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenicated, isLoading, checkAuth } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  // 🔹 Run auth check on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 🔹 Redirect to main page after login
  useEffect(() => {
    if (!isLoading && isAuthenicated) {
      router.replace("/");
    }
  }, [isAuthenicated, router, isLoading]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // 🔹 Show auth pages if not authenticated
  if (!isAuthenicated) {
    return (
      <AuthLayout>
        {pathname === "/register" ? <Register /> : <Login />}
      </AuthLayout>
    );
  }

  // 🔹 Show protected content
  return (
   
    <div className="antialiased h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      {/* Full-width Topbar */}
      <Topbar />

      {/* Below Topbar: Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}