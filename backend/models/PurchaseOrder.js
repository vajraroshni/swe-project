// models/PurchaseOrder.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Supplier = require('./Supplier');

const PurchaseOrder = sequelize.define('PurchaseOrder', {
  purchaseOrderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  supplierId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Supplier,
      key: 'supplierId'
    }
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('pending', 'sent', 'received', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending'
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  isPaid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'purchase_orders'
});

// Define associations
PurchaseOrder.belongsTo(Supplier, { foreignKey: 'supplierId' });
Supplier.hasMany(PurchaseOrder, { foreignKey: 'supplierId' });

module.exports = PurchaseOrder;