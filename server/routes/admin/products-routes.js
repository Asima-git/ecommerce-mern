const express = require('express');
const {handleImageUploader,fetchAllProduct, updateProduct, deleteProduct, addProduct} = require('../../controllers/admin/productsController')

const {upload} = require('../../helpers/cloudinary');
const router = express.Router();
router.post("/upload-image", upload.single("my_file"), handleImageUploader);
router.post("/add-product",addProduct);
router.get("/get-product",fetchAllProduct);
router.put("/update-product/:id",updateProduct);
router.delete("/delete-product/:id",deleteProduct);

module.exports = router