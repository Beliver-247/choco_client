import React, { useState, useEffect } from "react";
import AddEntryForm from "./components/AddEntryForm";
import LogsList from "./components/LogsList";
import SummaryDashboard from "./components/SummaryDashboard";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [member, setMember] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("member");
    if (stored) setMember(stored);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("member");
    setMember(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {!member ? (
        <Login onLogin={setMember} />
      ) : (
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">🍫 Chocolate Tracker</h1>
              <p className="text-gray-600">
                Logged in as <strong className="text-indigo-600 capitalize">{member}</strong>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md self-start md:self-center"
            >
              Logout
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <AddEntryForm loggedInMember={member} />
              <SummaryDashboard />
            </div>
            <div className="lg:col-span-2">
              <LogsList />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;