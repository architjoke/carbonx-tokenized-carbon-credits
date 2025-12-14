import { useState } from "react";
import ProjectForm from "../components/ProjectForm";
import VerificationCard from "../components/VerificationCard";
import { reverifyProject } from "../api";

export default function Dashboard() {
  const [result, setResult] = useState(null);

  const reverify = async () => {
    const res = await reverifyProject(result.project_id);
    setResult(res);
  };

  const onVerificationResult = (res) => {
    const derivedResult = {
      project_id: res.project_id,
      hash: res.proof_cid,
      result: {
        status: "verified",
        base_co2_kg: res.confidence * 10, // heuristic for MVP
        effective_co2_kg: res.confidence * 9,
        trust_score: res.confidence,
        risk_score: 100 - res.confidence,
      },
      tx_hash: res.tx_hash,
    };

    setResult(derivedResult);
  };

  return (
    <div className="p-6 text-white">
      <ProjectForm onResult={setResult} />
      <VerificationCard data={result} />

      {result && (
        <button
          onClick={reverify}
          className="mt-4 bg-yellow-600 px-4 py-2 rounded"
        >
          Reverify (Simulate Risk)
        </button>
      )}
    </div>
  );
}
