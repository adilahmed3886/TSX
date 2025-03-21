import { useEffect, useState } from "react";

const API_URL =
  "https://v6.exchangerate-api.com/v6/4f3f5b285dfd02ece029355e/latest/";

interface ConversionRates {
  [key: string]: number;
}

interface ApiResponse {
  conversion_rates: ConversionRates;
}

interface CurrencyResult {
  data: ConversionRates;
  loading: boolean;
  error: string | null;
}

export function useCurrency(currency: string): CurrencyResult {
  const [data, setData] = useState<ConversionRates>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(API_URL + currency);
        if (!response.ok) {
          throw new Error("Failed to fetch currency data");
        }
        const result: ApiResponse = await response.json();
        setData(result.conversion_rates);
        setError(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
        console.error("Currency fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [currency]);

  return { data, loading, error };
}
