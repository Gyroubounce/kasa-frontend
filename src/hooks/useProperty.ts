import { useEffect, useState } from "react";
import { getPropertyDetail } from "@/lib/api/properties";
import { PropertyDetail } from "@/types/property";

export function useProperty(id: string) {
  const [data, setData] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPropertyDetail(id)
      .then(setData)
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading };
}
