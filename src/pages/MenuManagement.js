// src/pages/MenuManagement.js
import React, { useState, useEffect } from "react";
import "../styles/common.css"; // 👈 Import your shared styles
import { useNavigate } from "react-router-dom";

function MenuManagement() {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", description: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulated fetch from mock "server"
  const fetchMenuItems = () => {
    setLoading(true);
    setTimeout(() => {
      setMenuItems([
        { id: 1, name: "Mock Pizza", price: 299, description: "Fake but tasty 🍕" },
        { id: 2, name: "Fake Pasta", price: 249, description: "Imaginary Italian 🇮🇹" },
      ]);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleAddItem = (e) => {
    e.preventDefault();
    const newItemWithId = {
      id: Date.now(),
      ...newItem,
      price: parseFloat(newItem.price)
    };
    setMenuItems([...menuItems, newItemWithId]);
    setNewItem({ name: "", price: "", description: "" });
  };

  const handleDeleteItem = (id) => {
    const updatedItems = menuItems.filter(item => item.id !== id);
    setMenuItems(updatedItems);
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-container">
      <h2>🍽️ Menu Management</h2>
      <button onClick={() => navigate("/dashboard")}>← Back to Dashboard</button>
      <br /><br />

      <form onSubmit={handleAddItem}>
        <h3>Add New Item</h3>

        <label>Item Name:</label>
        <input
          name="name"
          placeholder="e.g. Veg Biryani"
          value={newItem.name}
          onChange={handleChange}
          required
        />

        <label>Price (₹):</label>
        <input
          name="price"
          type="number"
          placeholder="e.g. 199"
          value={newItem.price}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          placeholder="Short item description"
          value={newItem.description}
          onChange={handleChange}
          required
        />

        <button type="submit">➕ Add Item</button>
      </form>

      <br />
      <h3>📋 Menu Items</h3>

      {loading ? (
        <p>Loading menu...</p>
      ) : menuItems.length === 0 ? (
        <p>No items in menu yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                  <button onClick={() => handleDeleteItem(item.id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MenuManagement;
