import { useEffect, useState } from "react";
import { getPropertyById } from "@/lib/api/properties";
import { Property } from "@/types/property";

export function useProperty(id: string) {
  const [data, setData] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPropertyById(id)
      .then(setData)
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading };
}
