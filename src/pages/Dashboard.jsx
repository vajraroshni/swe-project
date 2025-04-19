import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🍽️ Welcome to the Restaurant Dashboard</h2>
      <button onClick={() => navigate("/menu")}>Manage Menu</button>
      <br /><br />
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate('/inventory')}>🧺 View Inventory</button>
      <button onClick={() => navigate('/purchase-orders')}>📦 Purchase Orders</button>
      <button onClick={() => navigate('/reports')}>📊 Reports</button>
      <button onClick={() => navigate('/order-entry')}>🛒 Enter New Order</button>
      <button onClick={() => navigate('/chef-inventory')}>👨‍🍳 Chef Inventory</button>
      <button onClick={() => navigate('/supply-request')}>📝 Supply Request</button>






    </div>
  );
}

export default Dashboard;
