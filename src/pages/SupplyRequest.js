// src/pages/SupplyRequest.js
import React, { useEffect, useState } from "react";
import "../styles/common.css";
import { useNavigate } from "react-router-dom";

function SupplyRequest() {
  const [ingredients, setIngredients] = useState([]);
  const [requests, setRequests] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIngredients([
        { id: 1, name: "Tomatoes", unit: "kg" },
        { id: 2, name: "Paneer", unit: "kg" },
        { id: 3, name: "Oil", unit: "litres" }
      ]);
    }, 300);
  }, []);

  const handleChange = (id, qty) => {
    setRequests({ ...requests, [id]: qty });
  };

  const handleSubmit = () => {
    const finalRequest = ingredients
      .filter(i => requests[i.id] && requests[i.id] > 0)
      .map(i => ({
        id: i.id,
        name: i.name,
        quantity: requests[i.id],
        unit: i.unit
      }));

    console.log("📦 Supply Requested:", finalRequest);
    setSubmitted(true);
    setRequests({});
  };

  return (
    <div className="page-container">
      <h2>📥 Supply Request</h2>
      <button onClick={() => navigate("/dashboard")}>← Back to Dashboard</button>
      <br /><br />

      <table>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Unit</th>
            <th>Request Quantity</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map(i => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td>{i.unit}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  placeholder="Enter quantity"
                  value={requests[i.id] || ""}
                  onChange={(e) => handleChange(i.id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <button onClick={handleSubmit}>📤 Submit Request</button>

      {submitted && (
        <p style={{ color: "green", marginTop: "1rem" }}>
          ✅ Supply request sent to Manager!
        </p>
      )}
    </div>
  );
}

export default SupplyRequest;
