// src/pages/SupplyRequest.js
import React, { useState, useEffect } from "react";
import "../styles/common.css";
import "./SupplyRequest.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SupplyRequest() {
  const [ingredients, setIngredients] = useState([]);
  const [requests, setRequests] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIngredients([
        { id: 1, name: "Tomatoes", unit: "kg" },
        { id: 2, name: "Paneer", unit: "kg" },
        { id: 3, name: "Flour", unit: "kg" },
        { id: 4, name: "Cheese", unit: "kg" }
      ]);
    }, 300);
  }, []);

  const handleRequestChange = (id, qty) => {
    setRequests(prev => ({
      ...prev,
      [id]: qty
    }));
  };

  const handleSendRequests = () => {
    const requestList = Object.entries(requests)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const ing = ingredients.find(i => i.id === parseInt(id));
        return { ...ing, quantity: qty };
      });

    if (requestList.length === 0) {
      toast.error("No quantity specified!");
      return;
    }

    console.log("Requested Supplies:", requestList);
    toast.success("Request sent successfully ✅");
    setRequests({});
  };

  return (
    <div className="page-container supply-page">
      <h2 className="supply-header">🍳 Supply Request</h2>
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      <p className="supply-subtext">
        Select ingredients and specify the quantity you need.
      </p>

      <div className="table-wrapper">
        <table className="supply-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Unit</th>
              <th>Quantity Needed</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ing) => (
              <tr key={ing.id}>
                <td>{ing.name}</td>
                <td>{ing.unit}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 2"
                    value={requests[ing.id] || ""}
                    onChange={(e) => handleRequestChange(ing.id, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <br />
      <button className="submit-request-btn" onClick={handleSendRequests}>
        📦 Send Request
      </button>

      {/* ✨ Creative Footer with a food quote and styling */}
      <div className="thank-you-banner">
  <p>Thank you for keeping the kitchen running smoothly! 🍳✨</p>
</div>

    </div>
  );
}

export default SupplyRequest;
