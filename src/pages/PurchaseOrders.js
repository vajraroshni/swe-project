// src/pages/PurchaseOrders.js 
import React, { useEffect, useState } from "react";
import "../styles/common.css";
import "./PurchaseOrders.css"; // 🌟 Custom styling for this screen
import { useNavigate } from "react-router-dom";

function PurchaseOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          id: 1,
          ingredient: "Tomatoes",
          quantity: 10,
          supplier: "FreshFarm",
          status: "Pending"
        },
        {
          id: 2,
          ingredient: "Paneer",
          quantity: 5,
          supplier: "DairyDelight",
          status: "Approved"
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleApprove = (id) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status: "Approved" } : order
      )
    );
  };

  return (
    <div className="page-container po-page">
      <h2 className="po-header">📦 Purchase Orders</h2>
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      {loading ? (
        <p className="loading-text">Loading purchase orders...</p>
      ) : orders.length === 0 ? (
        <p className="loading-text">No purchase orders available.</p>
      ) : (
        <div className="table-wrapper">
          <table className="po-table">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Quantity</th>
                <th>Supplier</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((po) => (
                <tr key={po.id}>
                  <td>{po.ingredient}</td>
                  <td>{po.quantity}</td>
                  <td>{po.supplier}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        po.status === "Approved" ? "approved" : "pending"
                      }`}
                    >
                      {po.status}
                    </span>
                  </td>
                  <td>
                    {po.status === "Pending" ? (
                      <button
                        className="approve-btn"
                        onClick={() => handleApprove(po.id)}
                      >
                        ✅ Approve
                      </button>
                    ) : (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        ✔️
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🌅 Decorative bottom border image inside a wrapper */}
      <div className="footer-wrapper">
        <img
          src="/images/ingredients photo.jpg"
          alt="Decorative Footer"
          className="footer-image"
        />
        {/* Optional golden overlay
        <div className="gold-overlay"></div>
        */}
      </div>
    </div>
  );
}

export default PurchaseOrders;
