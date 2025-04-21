// src/pages/GeneratePO.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/common.css";


function GeneratePO() {
  const [ingredients, setIngredients] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated ingredient list from backend
    setTimeout(() => {
      setIngredients([
        { id: 1, name: "Tomatoes", unit: "kg" },
        { id: 2, name: "Paneer", unit: "kg" },
        { id: 3, name: "Flour", unit: "kg" },
      ]);
    }, 300);
  }, []);

  const handleChange = (id, value) => {
    setQuantities({ ...quantities, [id]: value });
  };

  const handleGenerate = () => {
    const orders = ingredients
      .filter(i => quantities[i.id])
      .map(i => ({
        ingredientId: i.id,
        name: i.name,
        quantity: parseFloat(quantities[i.id])
      }));

    if (orders.length === 0) {
      alert("Please enter quantities for at least one ingredient.");
      return;
    }

    console.log("Mock PO Created:", orders); // later POST to backend
    alert("Purchase Order created!");
    navigate("/inventory");
  };

  return (
    <div className="page-container">

      <h2>📦 Generate Purchase Order</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Unit</th>
            <th>Quantity to Order</th>
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
                  value={quantities[i.id] || ""}
                  onChange={e => handleChange(i.id, e.target.value)}
                  placeholder="0"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button onClick={handleGenerate}>Generate PO</button>
      <button onClick={() => navigate("/inventory")} style={{ marginLeft: "1rem" }}>
        Cancel
      </button>
    </div>
  );
}

export default GeneratePO;
