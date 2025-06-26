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
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <select value={member} onChange={(e) => setMember(e.target.value)} required>
        <option value="">Select Member</option>
        <option value="younger brother">Younger Brother</option>
        <option value="elder brother">Elder Brother</option>
        <option value="mother">Mother</option>
        <option value="father">Father</option>
        <option value="grandma">Grandma</option>
      </select>
      <select value={type} onChange={(e) => setType(e.target.value)} required>
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
      />
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default AddEntryForm;
