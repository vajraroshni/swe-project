const express = require('express');
const router = express.Router();
const { createSupplier } = require('../controllers/supplierController');
router.post('/', createSupplier);
router.get('/', getAllSuppliers); // Route to get all suppliers
router.get('/:id', getSupplierById); // Route to get a supplier by ID
module.exports = router;