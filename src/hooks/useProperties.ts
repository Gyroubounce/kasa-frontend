import { useEffect, useState } from "react";
import { getAllProperties } from "@/lib/api/properties";
import { Property } from "@/types/property";

export function useProperties() {
  const [data, setData] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProperties()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
