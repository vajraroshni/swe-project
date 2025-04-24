// controllers/purchaseOrderController.js
const PurchaseOrder = require('../models/PurchaseOrder');
const PurchaseOrderItem = require('../models/PurchaseOrderItem');
const Supplier = require('../models/Supplier');
const Inventory = require('../models/Inventory');
const Ingredient = require('../models/Ingredient');
const sequelize = require('../config/database');

// Get all purchase orders
exports.getAllPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.findAll({
      include: [
        { model: Supplier },
        { 
          model: PurchaseOrderItem,
          include: [{ model: Ingredient }]
        }
      ]
    });
    
    return res.status(200).json({
      success: true,
      data: purchaseOrders
    });
  } catch (error) {
    console.error('Error fetching purchase orders:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch purchase orders',
      error: error.message
    });
  }
};

// Get a single purchase order by ID
exports.getPurchaseOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const purchaseOrder = await PurchaseOrder.findByPk(id, {
      include: [
        { model: Supplier },
        { 
          model: PurchaseOrderItem,
          include: [{ model: Ingredient }]
        }
      ]
    });
    
    if (!purchaseOrder) {
      return res.status(404).json({
        success: false,
        message: 'Purchase order not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: purchaseOrder
    });
  } catch (error) {
    console.error('Error fetching purchase order:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch purchase order',
      error: error.message
    });
  }
};

// Create a new purchase order
exports.createPurchaseOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { supplierId, items } = req.body;
    
    if (!supplierId || !items || !Array.isArray(items) || items.length === 0) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Supplier ID and items array are required'
      });
    }
    
    // Verify supplier exists
    const supplier = await Supplier.findByPk(supplierId, { transaction });
    if (!supplier) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }
    
    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      const ingredient = await Ingredient.findByPk(item.ingredientId, { transaction });
      if (!ingredient) {
        await transaction.rollback();
        return res.status(404).json({
          success: false,
          message: `Ingredient with ID ${item.ingredientId} not found`
        });
      }
      
      totalAmount += ingredient.pricePerUnit * item.quantity;
    }
    
    // Create purchase order
    const purchaseOrder = await PurchaseOrder.create({
      supplierId,
      orderDate: new Date(),
      status: 'pending',
      totalAmount
    }, { transaction });
    
    // Create purchase order items
    for (const item of items) {
      const ingredient = await Ingredient.findByPk(item.ingredientId, { transaction });
      
      await PurchaseOrderItem.create({
        purchaseOrderId: purchaseOrder.purchaseOrderId,
        ingredientId: item.ingredientId,
        quantity: item.quantity,
        price: ingredient.pricePerUnit * item.quantity
      }, { transaction });
    }
    
    await transaction.commit();
    
    // Fetch the complete purchase order with items
    const completePurchaseOrder = await PurchaseOrder.findByPk(purchaseOrder.purchaseOrderId, {
      include: [
        { model: Supplier },
        { 
          model: PurchaseOrderItem,
          include: [{ model: Ingredient }]
        }
      ]
    });
    
    return res.status(201).json({
      success: true,
      data: completePurchaseOrder
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating purchase order:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create purchase order',
      error: error.message
    });
  }
};

// Update purchase order status
exports.updatePurchaseOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status || !['pending', 'sent', 'received', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Valid status is required (pending, sent, received, cancelled)'
      });
    }
    
    const purchaseOrder = await PurchaseOrder.findByPk(id);
    
    if (!purchaseOrder) {
      return res.status(404).json({
        success: false,
        message: 'Purchase order not found'
      });
    }
    
    // Special handling for "received" status - update inventory
    if (status === 'received' && purchaseOrder.status !== 'received') {
      await handleReceivedPurchaseOrder(id);
    }
    
    await purchaseOrder.update({ status });
    
    return res.status(200).json({
      success: true,
      data: purchaseOrder
    });
  } catch (error) {
    console.error('Error updating purchase order status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update purchase order status',
      error: error.message
    });
  }
};

// Helper function to handle received purchase orders
async function handleReceivedPurchaseOrder(purchaseOrderId) {
<<<<<<< HEAD
  const transaction = await sequelize.transaction();
  
  try {
    // Fetch the purchase order details with items
    const purchaseOrder = await PurchaseOrder.findByPk(purchaseOrderId, {
      include: [
        { model: PurchaseOrderItem, include: [{ model: Ingredient }] }
      ],
      transaction
    });
=======
  try {
    // Fetch the purchase order details
    const purchaseOrder = await db.collection('purchaseOrders').findOne({ _id: ObjectId(purchaseOrderId) });
>>>>>>> b2a0ea14144fee369fc3c63e1b88dc36d4afc4e1
    
    if (!purchaseOrder) {
      throw new Error(`Purchase order with ID ${purchaseOrderId} not found`);
    }
    
    if (purchaseOrder.status === 'received') {
      throw new Error(`Purchase order ${purchaseOrderId} has already been received`);
    }
    
    // Update inventory for each item in the purchase order
<<<<<<< HEAD
    for (const item of purchaseOrder.PurchaseOrderItems) {
      // Get current inventory record
      const inventoryItem = await Inventory.findOne({
        where: { ingredientId: item.ingredientId },
        transaction
      });
      
      if (!inventoryItem) {
        // Create new inventory record if it doesn't exist
        await Inventory.create({
          ingredientId: item.ingredientId,
          currentQuantity: item.quantity,
          thresholdValue: 10, // Default threshold
          lastUpdated: new Date()
        }, { transaction });
      } else {
        // Update existing inventory record
        await inventoryItem.update({
          currentQuantity: inventoryItem.currentQuantity + item.quantity,
          lastUpdated: new Date()
        }, { transaction });
      }
    }
    
    // Update purchase order status
    await purchaseOrder.update({
      status: 'received',
      receivedDate: new Date()
    }, { transaction });
    
    await transaction.commit();
    
    return purchaseOrder;
  } catch (error) {
    await transaction.rollback();
=======
    const inventoryUpdates = [];
    for (const item of purchaseOrder.items) {
      // Get current inventory record
      const inventoryItem = await db.collection('inventory').findOne({ itemId: item.itemId });
      
      if (!inventoryItem) {
        // Create new inventory record if it doesn't exist
        inventoryUpdates.push({
          insertOne: {
            document: {
              itemId: item.itemId,
              name: item.name,
              quantity: item.quantity,
              unit: item.unit,
              category: item.category || 'uncategorized',
              lastUpdated: new Date()
            }
          }
        });
      } else {
        // Update existing inventory record
        inventoryUpdates.push({
          updateOne: {
            filter: { itemId: item.itemId },
            update: { 
              $inc: { quantity: item.quantity },
              $set: { lastUpdated: new Date() }
            }
          }
        });
      }
    }

    // Execute all inventory updates in a bulk operation
    if (inventoryUpdates.length > 0) {
      await db.collection('inventory').bulkWrite(inventoryUpdates);
    }
    
    // Update purchase order status
    await db.collection('purchaseOrders').updateOne(
      { _id: ObjectId(purchaseOrderId) },
      { 
        $set: { 
          status: 'received',
          receivedDate: new Date(),
          receivedBy: currentUser.id
        }
      }
    );
    
    // Add to transaction log
    await db.collection('transactionLog').insertOne({
      type: 'PURCHASE_ORDER_RECEIVED',
      purchaseOrderId: purchaseOrderId,
      userId: currentUser.id,
      timestamp: new Date(),
      details: {
        supplierId: purchaseOrder.supplierId,
        supplierName: purchaseOrder.supplierName,
        itemCount: purchaseOrder.items.length,
        totalAmount: purchaseOrder.totalAmount
      }
    });
    
    // Return updated purchase order
    return await db.collection('purchaseOrders').findOne({ _id: ObjectId(purchaseOrderId) });
  } catch (error) {
>>>>>>> b2a0ea14144fee369fc3c63e1b88dc36d4afc4e1
    console.error('Error receiving purchase order:', error);
    throw error;
  }
}