// src/pages/InventoryManagement.js
import React, { useState, useEffect } from "react";
import "../styles/common.css";
import { useNavigate } from "react-router-dom";

function InventoryManagement() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIngredients([
        { id: 1, name: "Tomatoes", unit: "kg", quantity: 3, threshold: 5 },
        { id: 2, name: "Paneer", unit: "kg", quantity: 7, threshold: 4 },
        { id: 3, name: "Flour", unit: "kg", quantity: 2, threshold: 10 }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleGeneratePO = (ingredient) => {
    alert(`Generate Purchase Order for: ${ingredient.name}`);
  };

  return (
    <div className="page-container">
      <h2>📦 Inventory Management</h2>
      <button onClick={() => navigate("/dashboard")}>← Back to Dashboard</button>
      <br /><br />

      {loading ? (
        <p>Loading inventory...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>Threshold</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ing) => (
              <tr
                key={ing.id}
                style={{
                  backgroundColor: ing.quantity < ing.threshold ? "#ffe6e6" : "transparent"
                }}
              >
                <td>{ing.name}</td>
                <td>{ing.unit}</td>
                <td>{ing.quantity}</td>
                <td>{ing.threshold}</td>
                <td>
                  {ing.quantity < ing.threshold ? "⚠️ Low Stock" : "✅ OK"}
                </td>
                <td>
                  <button onClick={() => handleGeneratePO(ing)}>
                    📝 Generate PO
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InventoryManagement;
