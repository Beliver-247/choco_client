import React, { useEffect, useState } from "react";
import axios from "axios";

const SummaryDashboard = () => {
  const [summary, setSummary] = useState(null);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const TOTAL_CHOCOLATES = 60;

  useEffect(() => {
    axios.get(`${baseUrl}/api/logs`).then((res) => setSummary(res.data));
  }, []);

  if (!summary) return <p>Loading summary...</p>;

  return (
    <div>
      <h3>Summary</h3>
      <p><strong>Total Remaining:</strong> {TOTAL_CHOCOLATES - summary.totalConsumed}</p>
      <h4>By Member:</h4>
      <ul>
        {Object.entries(summary.byMember).map(([member, qty], idx) => (
          <li key={idx}>{member}: {qty}</li>
        ))}
      </ul>
      <h4>By Type:</h4>
      <ul>
        {Object.entries(summary.byType).map(([type, qty], idx) => (
          <li key={idx}>{type}: {qty}</li>
        ))}
      </ul>
    </div>
  );
};

export default SummaryDashboard;