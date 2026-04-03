"use client";

import { useState } from "react";
import { UploadResponse } from "@/types/UploadResponse";

export function useUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadFile(file: File, purpose: string): Promise<UploadResponse | null> {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("purpose", purpose);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setError("Erreur lors de l'upload.");
        return null;
      }

      const data: UploadResponse = await res.json();
      return data;
    } catch (err) {
      setError("Erreur réseau.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { uploadFile, loading, error };
}
