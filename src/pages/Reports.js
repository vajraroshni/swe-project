// src/pages/Reports.js
import React, { useState } from "react";
import "../styles/common.css";
import "./Reports.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Reports() {
  const [reportType, setReportType] = useState("sales");
  const [reportData, setReportData] = useState(null);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const navigate = useNavigate();

  const generateReport = () => {
    toast.info(`Generating ${reportType} report...`);

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

    setTimeout(() => {
      setReportData(mockData[reportType]);
      toast.success("Report generated ✅");
    }, 800);
  };

  return (
    <div className="page-container reports-page">
      <h2 className="report-header">📊 Reports</h2>
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      <div className="report-controls">
        <label>Report Type:</label>
        <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
          <option value="sales">Sales Report</option>
          <option value="inventory">Inventory Report</option>
          <option value="financial">Financial Report</option>
        </select>

        <label>From:</label>
        <input
          type="date"
          value={dateRange.from}
          onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
        />
        <label>To:</label>
        <input
          type="date"
          value={dateRange.to}
          onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
        />

        <button className="generate-btn" onClick={generateReport}>
          📥 Generate Report
        </button>
      </div>

      {reportData && (
        <div className="report-table-wrapper">
          <h3 className="report-subheader">
            📄 {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
          </h3>

          {reportType === "sales" && (
            <table className="report-table">
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
            <table className="report-table">
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
            <table className="report-table">
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

      {/* Decorative Footer Image */}
      <img
        src="/images/reports-generation.png"
        alt="Footer Decoration"
        className="footer-image"
      />
    </div>
  );
}

export default Reports;
