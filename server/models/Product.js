const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    image:String,
    title:String,
    description:String,
    category:String,
    brand:String,
    price:Number,
    salePrice:Number,
    totalStock:Number
},{timestamp:true});

const Product = mongoose.model('product',ProductSchema);
module.exports = Product