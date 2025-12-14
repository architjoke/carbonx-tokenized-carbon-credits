export default function RiskBar({ label, value, color }) {
  return (
    <div className="mb-2">
      <p>{label}: {value}</p>
      <div className="w-full bg-gray-700 rounded h-3">
        <div
          className={`h-3 rounded ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
