const Order = require('../../models/Order')


const getAllOrder = async (req, res) => {
    try {
      const orders = await Order.find();
  
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


  const updateOrderStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { orderStatus } = req.body;
  
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found!",
        });
      }
  
      await Order.findByIdAndUpdate(id, { orderStatus });
  
      return res.status(200).json({
        success: true,
        message: "Order status is updated successfully!",
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
  };
  
  module.exports = {getAllOrder,getOrderDetails,updateOrderStatus}