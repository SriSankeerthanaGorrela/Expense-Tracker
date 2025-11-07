"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../store/authstore";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenicated, isLoading } = useAuthStore();

  // Redirect if logged in
  useEffect(() => {
    if (!isLoading && !isAuthenicated) {
      router.replace("/");
    }
  }, [isAuthenicated, isLoading, router]);

  if (isLoading) return null;
  if (isAuthenicated) return null;

  return (
    <div className="flex min-h-screen w-full ">


      {children}
    </div>

  );
}
