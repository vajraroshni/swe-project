// src/pages/Reports.js
import React, { useState } from "react";
import "../styles/common.css";
import { useNavigate } from "react-router-dom";

function Reports() {
  const [reportType, setReportType] = useState("sales");
  const [reportData, setReportData] = useState(null);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const navigate = useNavigate();

  const generateReport = () => {
    // Simulated report data
    const mockData = {
      sales: [
        { id: 1, item: "Pizza", qty: 10, total: 2990 },
        { id: 2, item: "Pasta", qty: 7, total: 1743 }
      ],
      inventory: [
        { id: 1, ingredient: "Tomatoes", used: 8, unit: "kg" },
        { id: 2, ingredient: "Paneer", used: 5, unit: "kg" }
      ],
      financial: {
        revenue: 10000,
        expenses: 6500,
        profit: 3500
      }
    };

    setReportData(mockData[reportType]);
  };

  return (
    <div className="page-container">
      <h2>📊 Reports</h2>
      <button onClick={() => navigate("/dashboard")}>← Back to Dashboard</button>
      <br /><br />

      <div style={{ marginBottom: "1rem" }}>
        <label>Report Type:&nbsp;</label>
        <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
          <option value="sales">Sales Report</option>
          <option value="inventory">Inventory Report</option>
          <option value="financial">Financial Report</option>
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>From:&nbsp;</label>
        <input
          type="date"
          value={dateRange.from}
          onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
        />
        &nbsp;&nbsp;
        <label>To:&nbsp;</label>
        <input
          type="date"
          value={dateRange.to}
          onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
        />
      </div>

      <button onClick={generateReport}>📥 Generate Report</button>

      <br /><br />
      {reportData && (
        <div style={{ marginTop: "2rem" }}>
          <h3>📄 {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</h3>

          {reportType === "sales" && (
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity Sold</th>
                  <th>Total Revenue (₹)</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map(row => (
                  <tr key={row.id}>
                    <td>{row.item}</td>
                    <td>{row.qty}</td>
                    <td>₹{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === "inventory" && (
            <table>
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Used Quantity</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map(row => (
                  <tr key={row.id}>
                    <td>{row.ingredient}</td>
                    <td>{row.used}</td>
                    <td>{row.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === "financial" && (
            <table>
              <tbody>
                <tr>
                  <td><strong>Total Revenue</strong></td>
                  <td>₹{reportData.revenue}</td>
                </tr>
                <tr>
                  <td><strong>Total Expenses</strong></td>
                  <td>₹{reportData.expenses}</td>
                </tr>
                <tr>
                  <td><strong>Profit</strong></td>
                  <td>₹{reportData.profit}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Reports;
