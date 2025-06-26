import React, { useEffect, useState } from "react";
import axios from "axios";

const LogsList = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [memberFilter, setMemberFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/logs`);
        setLogs(res.data);
        setFilteredLogs(res.data);
      } catch (err) {
        console.error("Error fetching logs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  useEffect(() => {
    let filtered = logs;

    if (memberFilter) {
      filtered = filtered.filter((log) => log.member === memberFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter((log) => log.type === typeFilter);
    }

    setFilteredLogs(filtered);
  }, [memberFilter, typeFilter, logs]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        Chocolate Logs
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Member</label>
          <select
            value={memberFilter}
            onChange={(e) => setMemberFilter(e.target.value)}
            className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
          >
            <option value="">All Members</option>
            <option value="younger brother">Younger Brother</option>
            <option value="elder brother">Elder Brother</option>
            <option value="mother">Mother</option>
            <option value="father">Father</option>
            <option value="grandma">Grandma</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Type</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
          >
            <option value="">All Types</option>
            <option value="orange">Orange</option>
            <option value="classic">Classic</option>
            <option value="butter scotch">Butter Scotch</option>
            <option value="sea salt">Sea Salt</option>
            <option value="almond">Almond</option>
            <option value="coffee crisp">Coffee Crisp</option>
          </select>
        </div>
      </div>

      {/* Log List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredLogs.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No logs found matching your filters.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {filteredLogs.map((log, index) => (
              <li key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium capitalize text-indigo-600">{log.member}</span>
                    <span className="text-gray-600 mx-2">took</span>
                    <span className="font-semibold">{log.quantity}</span>
                    <span className="text-gray-600 mx-1">x</span>
                    <span className="capitalize font-medium">{log.type}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LogsList;