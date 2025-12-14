import { useEffect, useState } from "react";
import api from "../pages/api";

/**
 * Custom hook to track project verification status
 */
const useProjectStatus = (projectId) => {
  const [status, setStatus] = useState("pending");
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId === null || projectId === undefined) return;

    const fetchStatus = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/project/${projectId}/status`);

        setStatus(res.data.status); // pending | verified | minted
        setConfidence(res.data.confidence);
      } catch (err) {
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [projectId]);

  return {
    status,
    confidence,
    loading,
  };
};

export default useProjectStatus;
