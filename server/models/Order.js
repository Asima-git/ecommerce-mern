const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId:String,
    cartId:String,
    cartItems:[{
        productId:String,
        title:String,
        image:String,
        price:String,
        qty:Number
    }],
    addressInfo:{
        addressId:String,
        address:String,
        city:String,
        pincode:String,
        notes:String
    },
    orderStatus:String,
    paymentMethod:String,
    paymentStatus:String,
    totalAmount:Number,
    orderDate:Date,
    orderUpdateDate:Date,
    paymentId:String,
    payerId:String
},{timestamp:true});

const Order = mongoose.model('order',OrderSchema);
module.exports = Order