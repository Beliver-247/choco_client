import React, { useState, useEffect } from "react";
import axios from "axios";
import {toast} from 'react-toastify';

const AddEntryForm = ({ loggedInMember }) => {
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [logs, setLogs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const MEMBER_LIMIT = 12;
  const TYPE_LIMIT = 10;

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/logs`)
      .then((res) => setLogs(res.data))
      .catch((err) => console.error("Failed to load logs", err));
  }, []);

  // Calculate member & type consumption
  const memberConsumed = logs
    .filter((log) => log.member === loggedInMember)
    .reduce((total, log) => total + log.quantity, 0);

  const typeConsumed = type
    ? logs
        .filter((log) => log.type === type)
        .reduce((total, log) => total + log.quantity, 0)
    : 0;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation checks with toast notifications
    if (memberConsumed + quantity > MEMBER_LIMIT) {
      toast.error(`You can't take more than ${MEMBER_LIMIT} chocolates!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsSubmitting(false);
      return;
    }

    if (typeConsumed + quantity > TYPE_LIMIT) {
      toast.warning(`Only ${TYPE_LIMIT} ${type} chocolates are available!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post(`${baseUrl}/api/logs`, {
        member: loggedInMember,
        type,
        quantity,
      });

      toast.success('Entry added successfully!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => window.location.reload()
      });
    } catch (err) {
      console.error("Failed to add entry:", err);
      toast.error('Error adding entry. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        Add Chocolate Entry
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Member</label>
          <input
            type="text"
            value={loggedInMember}
            disabled
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 capitalize"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chocolate Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
          >
            <option value="">Select Chocolate</option>
            <option value="orange">Orange</option>
            <option value="classic">Classic</option>
            <option value="butter scotch">Butter Scotch</option>
            <option value="sea salt">Sea Salt</option>
            <option value="almond">Almond</option>
            <option value="coffee crisp">Coffee Crisp</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            placeholder="Quantity"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-md ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Adding..." : "Add Entry"}
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>
          <span className="font-medium">Your consumption:</span> {memberConsumed}/{MEMBER_LIMIT}
        </p>
        {type && (
          <p>
            <span className="font-medium">{type} available:</span> {TYPE_LIMIT - typeConsumed}/{TYPE_LIMIT}
          </p>
        )}
      </div>
    </form>
  );
};

export default AddEntryForm;