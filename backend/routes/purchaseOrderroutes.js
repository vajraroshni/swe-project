const express = require('express');
const router = express.Router();
const { receiveOrder } = require('../controllers/purchaseOrderController');
router.post('/:id/receive', receiveOrder);
module.exports = router;