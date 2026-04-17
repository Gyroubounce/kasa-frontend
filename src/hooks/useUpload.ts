"use client";

import { useState } from "react";
import { UploadResponse } from "@/types/UploadResponse";

export function useUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadFile(
    file: File,
    purpose: string
  ): Promise<UploadResponse | null> {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("purpose", purpose);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/uploads/image`,
        {
          method: "POST",
          credentials: "include",   // 🔥 OBLIGATOIRE pour envoyer le cookie HTTPOnly
          body: formData,
        }
      );

      if (!res.ok) {
        setError("Erreur lors de l'upload.");
        return null;
      }

      const data: UploadResponse = await res.json();
      // Corrige l'URL si elle commence par "/"
        if (data.url.startsWith("/")) {
          data.url = `${process.env.NEXT_PUBLIC_API_URL}${data.url}`;
        }

      return data;
    } catch  {
      setError("Erreur réseau.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { uploadFile, loading, error };
}
