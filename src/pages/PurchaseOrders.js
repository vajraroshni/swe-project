// src/pages/PurchaseOrders.js
import React, { useEffect, useState } from "react";
import "../styles/common.css";
import { useNavigate } from "react-router-dom";

function PurchaseOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetch
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
    <div className="page-container">
      <h2>📦 Purchase Orders</h2>
      <button onClick={() => navigate("/dashboard")}>← Back to Dashboard</button>
      <br /><br />

      {loading ? (
        <p>Loading purchase orders...</p>
      ) : orders.length === 0 ? (
        <p>No purchase orders available.</p>
      ) : (
        <table>
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
                <td>{po.status}</td>
                <td>
                  {po.status === "Pending" ? (
                    <button onClick={() => handleApprove(po.id)}>✅ Approve</button>
                  ) : (
                    <span style={{ color: "green" }}>Approved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PurchaseOrders;
