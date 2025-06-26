import React, { useState } from "react";
import axios from "axios";

const AddEntryForm = () => {
  const [member, setMember] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/api/logs`, { member, type, quantity });
      alert("Entry added!");
      setMember("");
      setType("");
      setQuantity(1);
    } catch (err) {
      console.error("Failed to add entry:", err);
      alert("Error adding entry");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Add Chocolate Entry</h2>

      <select
        value={member}
        onChange={(e) => setMember(e.target.value)}
        required
        className="w-full p-2 mb-3 border border-gray-300 rounded"
      >
        <option value="">Select Member</option>
        <option value="younger brother">Younger Brother</option>
        <option value="elder brother">Elder Brother</option>
        <option value="mother">Mother</option>
        <option value="father">Father</option>
        <option value="grandma">Grandma</option>
      </select>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
        className="w-full p-2 mb-3 border border-gray-300 rounded"
      >
        <option value="">Select Chocolate</option>
        <option value="orange">Orange</option>
        <option value="classic">Classic</option>
        <option value="butter scotch">Butter Scotch</option>
        <option value="sea salt">Sea Salt</option>
        <option value="almond">Almond</option>
        <option value="coffee crisp">Coffee Crisp</option>
      </select>

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
        className="w-full p-2 mb-3 border border-gray-300 rounded"
        placeholder="Quantity"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Add Entry
      </button>
    </form>
  );
};

export default AddEntryForm;
