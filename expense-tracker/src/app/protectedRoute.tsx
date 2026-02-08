"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "./store/authstore";
import AuthLayout from "./(auth)/layout";
import Login from "./(auth)/login/page";
import Register from "./(auth)/register/page";
import { Topbar } from "./Topbar/topbar";
import Sidebar from "./sidebar/page";


export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenicated, isLoading, isNewuser, checkAuth } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenicated) {
        if (pathname !== "/login" && pathname !== "/register") {
          router.replace("/login");
        }
      }
      else if (isNewuser) {
        if (pathname !== "/form") {
          router.replace("/form");
        }
         if (pathname == "/register") {
          router.replace("/login")
        }
      } else {
        if (
          pathname === "/login" ||
         
          pathname === "/form"
        ) {
          router.replace("/dashboard");
        }
      }
    }
  }, [isAuthenicated, isNewuser, isLoading, pathname, router]);

  if (!isAuthenicated) {
    return (
      <AuthLayout>
        {pathname === "/register" ? <Register /> : <Login />}
      </AuthLayout>
    );
  }

  // If user is on /form → show only the form, no layout
  if (pathname === "/form") {
    return children;
  }

  // Otherwise → show main app layout
  return (
    <div className="antialiased h-screen flex flex-col">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
