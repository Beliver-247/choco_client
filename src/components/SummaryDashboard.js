import React, { useEffect, useState } from "react";
import axios from "axios";

const SummaryDashboard = () => {
  const [summary, setSummary] = useState(null);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const TOTAL_CHOCOLATES = 60;

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/logs/summary`)
      .then((res) => setSummary(res.data))
      .catch((err) => console.error("Failed to fetch summary:", err));
  }, []);

  if (!summary) return <p className="text-center text-gray-500">Loading summary...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4 text-center">Summary</h2>
      <p className="text-center mb-4">
        <strong>Total Remaining:</strong>{" "}
        <span className="text-green-600 font-bold">
          {TOTAL_CHOCOLATES - summary.totalConsumed}
        </span>
      </p>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-2">By Member</h3>
          <ul className="list-disc pl-5">
            {Object.entries(summary.byMember).map(([member, qty], idx) => (
              <li key={idx} className="capitalize">
                {member}: {qty}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-2">By Type</h3>
          <ul className="list-disc pl-5">
            {Object.entries(summary.byType).map(([type, qty], idx) => (
              <li key={idx} className="capitalize">
                {type}: {qty}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SummaryDashboard;
