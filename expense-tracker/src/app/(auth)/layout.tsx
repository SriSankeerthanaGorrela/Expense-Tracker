


"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../store/authstore";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenicated, isLoading } = useAuthStore();

  // Redirect if already logged in
  useEffect(() => {
    if (!isLoading && isAuthenicated) {
      router.replace("/dashboard");
    }
  }, [isAuthenicated, isLoading, router]);

  // Loading state
  if (isLoading) return null;

  // If authenticated, hide auth pages
  if (isAuthenicated) return null;

  return (
    <div className="flex min-h-screen bg-white p-4">
      {children}
      <Toaster position="bottom-left" />
    </div>
  );
}
