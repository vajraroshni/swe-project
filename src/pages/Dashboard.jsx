// src/pages/Dashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/common.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "🍽️ Menu Management",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      action: () => navigate("/menu"),
    },
    {
      title: "📦 Inventory Management",
      image: "/images/inventory.jpg",
      action: () => navigate("/inventory"),
    },
    {
      title: "🛒 Purchase Orders",
      image: "/images/purchase order.jpg",
      action: () => navigate("/purchase-orders"),
    },
    {
      title: "📊 Reports",
      image: "/images/reports.jpg",
      action: () => navigate("/reports"),
    },
    {
      title: "🚪 Logout",
      image: "/images/logout.jpg",
      action: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  return (
    <div className="page-container" style={{ textAlign: "center" }}>
      <h2>✨ Welcome to the Restaurant Dashboard ✨</h2>
      <p style={{ marginBottom: "2rem" }}>
        Manage everything with ease and efficiency 
      </p>

      <div className="card-container">
        {features.map((feature, index) => (
          <div className="dashboard-card" key={index} onClick={feature.action}>
            <img src={feature.image} alt={feature.title} />
            <h3>{feature.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
