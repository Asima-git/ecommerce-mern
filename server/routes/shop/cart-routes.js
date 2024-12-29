const express = require("express");
const {addToCart,updateCart,deleteCart,getCart} = require('../../controllers/shop/cartController')
const router = express.Router();

router.post('/add',addToCart);
router.get('/get/:userId',getCart);
router.put('/update-cart',updateCart);
router.delete('/delete-cart/:userId/:productId',deleteCart);

module.exports = router