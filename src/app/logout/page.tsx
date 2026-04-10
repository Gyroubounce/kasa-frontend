"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuthContext();

  useEffect(() => {
    logout();          // supprime token + user
    router.push("/");  // redirection après logout
  }, [logout, router]);

  return null;
}
