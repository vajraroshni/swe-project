const express = require('express');
const router = express.Router();
const { createSupplier, getAllSuppliers, getSupplierById } = require('../controllers/supplierController');

router.post('/', createSupplier);
router.get('/', getAllSuppliers);
router.get('/:id', getSupplierById);

module.exports = router;