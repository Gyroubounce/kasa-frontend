import { useEffect, useState } from "react";
import { getPropertyBase } from "@/lib/api/properties";
import { PropertyBase } from "@/types/property";

export function useProperties() {
  const [data, setData] = useState<PropertyBase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPropertyBase()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
