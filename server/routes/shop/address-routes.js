const express = require('express');
const {addAddress,getAddress,updateAddress,deleteAddress} = require('../../controllers/shop/addressController')
const router = express.Router(); 

router.post('/add',addAddress);
router.get('/get/:userId',getAddress);
router.delete('/delete/:userId/:addressId',deleteAddress);
router.put('/update/:userId/:addressId',updateAddress);

module.exports = router