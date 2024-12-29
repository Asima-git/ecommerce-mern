const express = require('express');
const {getAllOrder,getOrderDetails,updateOrderStatus} = require('../../controllers/admin/orderController');
const router = express.Router(); 

router.get('/get',getAllOrder);
router.get('/details/:id',getOrderDetails);
router.put("/update/:id", updateOrderStatus);
module.exports = router