const express = require('express');
const {getFeatureImages,addFeatureImage} = require('../../controllers/admin/featureController');
const router = express.Router(); 

router.post('/add',addFeatureImage);
router.get('/get',getFeatureImages);

module.exports = router