import React, { useEffect, useState } from "react";
import axios from "axios";

const LogsList = () => {
  const [logs, setLogs] = useState([]);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/logs`)
      .then((res) => setLogs(res.data))
      .catch((err) => console.error("Error fetching logs:", err));
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-center">Chocolate Logs</h2>
      {logs.length === 0 ? (
        <p className="text-gray-500 text-center">No chocolate logs yet.</p>
      ) : (
        <ul className="space-y-2">
          {logs.map((log, index) => (
            <li key={index} className="p-3 bg-gray-100 rounded shadow-sm">
              <span className="font-medium capitalize">{log.member}</span> took{" "}
              <span className="font-semibold">{log.quantity}</span>{" "}
              <span className="capitalize">{log.type}</span> chocolate(s) on{" "}
              <span className="text-sm text-gray-600">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LogsList;
