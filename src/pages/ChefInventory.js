// src/pages/ChefInventory.js
import React, { useEffect, useState } from "react";
import "../styles/common.css";
import { useNavigate } from "react-router-dom";

function ChefInventory() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIngredients([
        { id: 1, name: "Tomatoes", quantity: 3, unit: "kg" },
        { id: 2, name: "Paneer", quantity: 5, unit: "kg" },
        { id: 3, name: "Flour", quantity: 2, unit: "kg" }
      ]);
      setLoading(false);
    }, 300);
  }, []);

  return (
    <div className="page-container">
      <h2>👨‍🍳 Chef Inventory</h2>
      <button onClick={() => navigate("/dashboard")}>← Back to Dashboard</button>
      <br /><br />

      {loading ? (
        <p>Loading inventory...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Available Quantity</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((i) => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.quantity}</td>
                <td>{i.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ChefInventory;
