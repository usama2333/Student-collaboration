"use client";

import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/redux/auth-contex";

export default function Home() {
  const router = useRouter();
  const { isLoggedIn, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/login");
    }
  }, [loading, isLoggedIn, router]);

  if (loading) return null; // Wait for auth check

  return (
    <div>
      
    </div>
  );
}
