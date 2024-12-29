const mongoose = require('mongoose')
const productReviewSchema = new mongoose.Schema({
    productId:String,
    userId:String,
    name:String,
    reviewMessage:String,
    reviewValue:Number,
},{timestamps:true})
const productReview = mongoose.model('ProductReview',productReviewSchema)
module.exports = productReview