import { useState } from "react";
import { verifyProject } from "../api";

export default function ProjectForm({ onResult }) {
  const [form, setForm] = useState({
    project_id: "forest-001",
    area_hectares: 2,
    vegetation_index: 0.78,
    years: 1,
    location: "Rajasthan",
    ndvi_history_variance: 0.15,
    climate_risk_factor: 0.2,
    last_verified_days_ago: 30,
  });

  const submit = async () => {
    // temporary CO₂ estimation logic (frontend-side)
    const estimatedCo2Kg = Math.round(
      form.area_hectares * 1000 * form.vegetation_index
    );

    const payload = {
      location: form.location,
      areaHectares: form.area_hectares,
      co2Kg: estimatedCo2Kg,
    };

    const res = await verifyProject(payload);
    onResult(res);
  };

  return (
    <div className="p-4 bg-slate-800 rounded">
      <h2 className="text-lg mb-2">Verify Project</h2>
      <button onClick={submit} className="bg-green-600 px-4 py-2 rounded">
        Run Verification
      </button>
    </div>
  );
}
