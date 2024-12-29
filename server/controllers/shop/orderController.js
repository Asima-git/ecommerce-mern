const dotenv = require("dotenv").config();
const paypal = require('../../helpers/payPal')
const Order = require('../../models/Order')
const Cart = require('../../models/Cart')
const Product = require('../../models/Product')

const createOrder = async(req,res)=>{
  try {
    const {userId,cartId,cartItems,addressInfo,orderStatus,paymentMethod,paymentStatus,
        totalAmount,
        orderDate,
        orderUpdateDate,
        paymentId,
        payerId} = req.body;

        const create_payment_json = {
          intent: 'sale',
          payer: {
            payment_method: 'paypal'
          },
          redirect_urls: {
            return_url: `${process.env.FRONTEND_URI}/shop/paypal-return`,
            cancel_url: `${process.env.FRONTEND_URI}/shop/paypal-cancel`
          },
          transactions: [
            {
              item_list: {
                items: cartItems.map(item => ({
                  name: item.title || 'No title', // Default fallback
                  sku: item.productId || 'No SKU', // Default fallback
                  price: item.price.toFixed(2),
                  currency: 'USD',
                  quantity: item.qty // Corrected property name (qty -> quantity)
                }))
              },
              amount: {
                currency: 'USD',
                total: totalAmount.toFixed(2)
              },
              description: 'Purchase from MyShop' // Updated description
            }
          ]
        };
        
        paypal.payment.create(create_payment_json,async(error,paymentInfo)=>{
          if(error){
            console.log(error)
            return res.status(500).json({
              success:false,
              message:'error while creating paypal payment'
            })
          }else{
            const newlyCreatedOrder = new Order({
              userId,cartId,cartItems,addressInfo,orderStatus,paymentMethod,paymentStatus,
              totalAmount,
              orderDate,
              orderUpdateDate,
              paymentId,
              payerId,
            })
            await newlyCreatedOrder.save();
            const approvalURL = paymentInfo.links.find(link=>link.rel === 'approval_url').href;
            return res.status(201).json({
              success:true,
              approvalURL,
              orderId:newlyCreatedOrder._id 
            })
          }
        })
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
    });
  }
}

const capturePayment = async(req,res)=>{
    try {
      const {paymentId,payerId,orderId} = req.body
      let order = await Order.findById(orderId)
      if(!order){
        return res.status(404).json({
          success: false,
          message: "Order can not be found",
        }); 
      }
      order.paymentStatus = 'paid';
      order.orderStatus = 'confirmed';
      order.paymentId = paymentId
      order.payerId = payerId

      for(let item of order.cartItems){
        let product = await Product.findById(item.productId)
        if(!product){
          return res.status(404).json({
            success: false,
            message: `Not enough stock for this product ${product.title}`,
          }); 
        }
        product.totalStock -= item.qty
        await product.save();
      }
      
      const getCartId = order.cartId;
      await Cart.findByIdAndDelete(getCartId)
      await order.save();
      return res.status(200).json({
        success: true,
        message: "Order Confirmed",
        data:order
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the product",
      });
    }
  }

  const getAllOrderByUser = async (req, res) => {
    try {
      const { userId } = req.params; 
      const orders = await Order.find({ userId });
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No orders found!",
        });
      }
  
      return res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching the orders.",
      });
    }
  };
  
const getOrderDetails = async(req,res)=>{
  try {
    const {id} = req.params;
      const order = await Order.findById(id)
      if(!order || order.length === 0){
        return res.status(404).json({
          success: false,
          message: "No order found!",
        });
      }
      return res.status(200).json({
        success: true,
        data: order
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
    });
  }
}
module.exports = {createOrder,capturePayment,getOrderDetails,getAllOrderByUser}