import React from "react";
import AddEntryForm from "./components/AddEntryForm";
import LogsList from "./components/LogsList";
import SummaryDashboard from "./components/SummaryDashboard";

function App() {
  return (
    
    <div style={{ padding: "20px" }}>
      <h1 className="text-4xl text-purple-600 font-bold text-center my-6">
  Chocolate Tracker
</h1>

      <AddEntryForm />
      <SummaryDashboard />
      <LogsList />
    </div>
  );
}

export default App;