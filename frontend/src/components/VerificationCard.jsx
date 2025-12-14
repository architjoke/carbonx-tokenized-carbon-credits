import RiskBar from "./RiskBar";

export default function VerificationCard({ data }) {
  if (!data) return null;

  const r = data.result;

  return (
    <div className="p-4 bg-slate-900 mt-4 rounded">
      <h3 className="text-xl mb-2">Verification Result</h3>

      <p>
        Status: <b className="text-green-400">{r.status}</b>
      </p>
      <p className="text-xs mt-2">Tx Hash: {data.tx_hash}</p>

      <p>Base CO₂: {r.base_co2_kg} kg</p>
      <p>Effective CO₂: {r.effective_co2_kg} kg</p>

      <RiskBar label="Trust Score" value={r.trust_score} color="bg-green-500" />
      <RiskBar label="Risk Score" value={r.risk_score} color="bg-red-500" />

      <p className="text-xs mt-2">Hash: {data.hash}</p>
    </div>
  );
}
