"use client";

import { FavoritesProvider } from "@/context/FavoritesContext";
import { AuthProvider } from "@/context/AuthContext";
import { MessagingProvider } from "@/context/MessagingContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <MessagingProvider>
          {children}
        </MessagingProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}
