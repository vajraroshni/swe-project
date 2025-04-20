// src/pages/InventoryManagement.js
import React, { useState, useEffect } from "react";
import "../styles/common.css";
import "./InventoryManagement.css";
import { useNavigate } from "react-router-dom";

function InventoryManagement() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'card'
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIngredients([
        {
          id: 1,
          name: "Tomatoes",
          unit: "kg",
          quantity: 3,
          threshold: 5,
          category: "vegetable",
          supplier: "Fresh Farms Co.",
          lastOrdered: "2023-06-15",
        },
        {
          id: 2,
          name: "Paneer",
          unit: "kg",
          quantity: 7,
          threshold: 4,
          category: "dairy",
          supplier: "Dairy Delight",
          lastOrdered: "2023-06-18",
        },
        {
          id: 3,
          name: "Flour",
          unit: "kg",
          quantity: 2,
          threshold: 10,
          category: "grain",
          supplier: "Golden Grains",
          lastOrdered: "2023-06-10",
        },
      ]);
      setLoading(false);
    }, 800); // Slightly longer delay to see animations
  }, []);

  const handleGeneratePO = (ingredient) => {
    // Simulate success with confetti
    const success = true;
    if (success) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
    alert(
      `Purchase order generated for ${ingredient.name} from ${ingredient.supplier}`
    );
  };

  const getCategoryIcon = (category) => {
    const icons = {
      vegetable: "🥦",
      dairy: "🧀",
      grain: "🌾",
      spice: "🧂",
      fruit: "🍎",
    };
    return icons[category] || "📦";
  };

  return (
    <div className="inventory-page">
      <div className="inventory-header-container">
        <h2 className="inventory-header">
          <span className="gold-shimmer">📦</span> Inventory Management
        </h2>
        <div className="view-toggle">
          <button
            className={viewMode === "table" ? "active" : ""}
            onClick={() => setViewMode("table")}
          >
            Table View
          </button>
          <button
            className={viewMode === "card" ? "active" : ""}
            onClick={() => setViewMode("card")}
          >
            Card View
          </button>
        </div>
      </div>

      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      {loading ? (
        <div className="loading-skeleton">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton-card"></div>
          ))}
        </div>
      ) : viewMode === "card" ? (
        <div className="card-view">
          {ingredients.map((ing) => (
            <div
              key={ing.id}
              className={`inventory-card ${
                ing.quantity < ing.threshold ? "low-stock-card" : ""
              }`}
              style={{
                "--stock-level": `${Math.min(
                  100,
                  (ing.quantity / ing.threshold) * 100
                )}%`,
              }}
            >
              <div className="card-header">
                <span className="category-icon">
                  {getCategoryIcon(ing.category)}
                </span>
                <h3>{ing.name}</h3>
              </div>

              <div className="stock-meter">
                <div className="meter-fill"></div>
                <span>
                  {ing.quantity} {ing.unit} / {ing.threshold} {ing.unit}
                </span>
              </div>

              <div className="supplier-info">
                <small>Supplier: {ing.supplier}</small>
                <small>Last ordered: {ing.lastOrdered}</small>
              </div>

              <button
                className="action-btn"
                onClick={() => handleGeneratePO(ing)}
              >
                📝 Generate PO
              </button>

              {ing.quantity < ing.threshold && (
                <div className="pulse-alert"></div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Name</th>
                <th>Unit</th>
                <th>Stock Level</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ing) => (
                <tr
                  key={ing.id}
                  className={`${
                    ing.quantity < ing.threshold ? "low-stock-row" : ""
                  }`}
                >
                  <td className="category-cell">
                    <span className="category-icon">
                      {getCategoryIcon(ing.category)}
                    </span>
                    {ing.category}
                  </td>
                  <td>{ing.name}</td>
                  <td>{ing.unit}</td>
                  <td>
                    <div className="stock-meter">
                      <div className="meter-fill"></div>
                      <span>
                        {ing.quantity}/{ing.threshold}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        ing.quantity < ing.threshold
                          ? "low-stock-badge"
                          : "in-stock-badge"
                      }`}
                    >
                      {ing.quantity < ing.threshold ? "LOW STOCK" : "IN STOCK"}
                    </span>
                    {ing.quantity < ing.threshold && (
                      <div className="pulse-alert"></div>
                    )}
                  </td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => handleGeneratePO(ing)}
                    >
                      📝 Generate PO
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InventoryManagement;
