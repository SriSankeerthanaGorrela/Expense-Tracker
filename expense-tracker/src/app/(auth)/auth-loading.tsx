"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authstore";
import Loader from "../components/Loader";


export default function AuthLoading() {
  const router = useRouter();
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
    router.replace("/dashboard");
  }, [checkAuth, router]);

  return <Loader message="Logging you in..." />;
}
