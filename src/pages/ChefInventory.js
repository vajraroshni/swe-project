// src/pages/ChefInventory.js
import React, { useEffect, useState } from "react";
import "../styles/common.css";
import "./ChefInventory.css"; // 💅 Custom styling
import { useNavigate } from "react-router-dom";

function ChefInventory() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIngredients([
        { id: 1, name: "Tomatoes", quantity: 5, unit: "kg" },
        { id: 2, name: "Paneer", quantity: 3, unit: "kg" },
        { id: 3, name: "Flour", quantity: 10, unit: "kg" }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="page-container chef-page">
      <h2 className="chef-header">👨‍🍳 Chef Inventory View</h2>
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      {loading ? (
        <p className="loading-text">Loading inventory...</p>
      ) : (
        <div className="table-wrapper">
          <table className="chef-table">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Quantity</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 👨‍🍳 Footer chain of chef images */}
      <div className="chef-footer">
        <img src="/images/chef1.jpg" alt="Chef 1" />
        <img src="/images/chef2.jpg" alt="Chef 2" />
        <img src="/images/chef3.jpg" alt="Chef 3" />
        <img src="/images/chef4.jpg" alt="Chef 4" />
      </div>
    </div>
  );
}

export default ChefInventory;
