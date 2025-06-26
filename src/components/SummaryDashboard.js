import React, { useEffect, useState } from "react";
import axios from "axios";

const SummaryDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const TOTAL_CHOCOLATES = 60;

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/logs/summary`);
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to fetch summary:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center text-red-500">
        Failed to load summary data.
      </div>
    );
  }

  const remaining = TOTAL_CHOCOLATES - summary.totalConsumed;
  const percentage = (remaining / TOTAL_CHOCOLATES) * 100;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
        Chocolate Summary
      </h2>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Total Remaining</span>
          <span className="text-sm font-semibold">
            {remaining} / {TOTAL_CHOCOLATES}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-gray-700 mb-3 pb-2 border-b border-gray-200">
            By Member
          </h3>
          <ul className="space-y-2">
            {Object.entries(summary.byMember).map(([member, qty], idx) => (
              <li key={idx} className="flex justify-between items-center">
                <span className="capitalize text-gray-700">{member}</span>
                <span className="font-medium">{qty}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-gray-700 mb-3 pb-2 border-b border-gray-200">
            By Type
          </h3>
          <ul className="space-y-2">
            {Object.entries(summary.byType).map(([type, qty], idx) => (
              <li key={idx} className="flex justify-between items-center">
                <span className="capitalize text-gray-700">{type}</span>
                <span className="font-medium">{qty}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SummaryDashboard;