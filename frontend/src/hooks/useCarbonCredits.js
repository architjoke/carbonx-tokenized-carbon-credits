import { useEffect, useState } from "react";
import api from "../pages/api";

/**
 * Custom hook to fetch carbon credits of a user
 */
const useCarbonCredits = (address) => {
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!address) return;

    const fetchCredits = async () => {
      try {
        setLoading(true);

        // backend endpoint (or blockchain proxy)
        const res = await api.get(`/credits/${address}`);

        setCredits(res.data.credits);
      } catch (err) {
        setError(err.message || "Failed to fetch credits");
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [address]);

  return {
    credits,
    loading,
    error,
  };
};

export default useCarbonCredits;
