import React, { useEffect, useState } from "react";
import axios from "axios";

const LogsList = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/logs").then((res) => setLogs(res.data));
  }, []);

  return (
    <div>
      <h3>Logs</h3>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            {log.member} took {log.quantity} {log.type} chocolate(s) on {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogsList;