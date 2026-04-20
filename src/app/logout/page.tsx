"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuthContext();

  useEffect(() => {
    async function run() {
      await logout();     // <-- attendre la suppression du localStorage
      router.push("/");   // <-- redirection APRÈS
    }
    run();
  }, [logout, router]);

  return null;
}
