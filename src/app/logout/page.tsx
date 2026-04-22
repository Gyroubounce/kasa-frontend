"use client";

import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";

export default function LogoutPage() {
  const { logout } = useAuthContext();

  useEffect(() => {
    logout(); // <-- c'est tout
  }, [logout]);

  return null;
}
