const Cart = require('../../models/Cart')
const Product = require('../../models/Product')

const addToCart = async(req,res)=>{
  try {
    const {userId,productId,qty} = req.body
    if(!userId || !productId || qty <= 0){
      return res.status(400).json({
        success:false,
        message:"Invalid data provided"
      })
    }
    const product = await Product.findById(productId);
    if(!product){
      return res.status(404).json({
        success:false,
        message:"Product not found"
      })
    }
    let cart = await Cart.findOne({userId});
    if(!cart){
      cart = new Cart({userId,items:[]}) 
    }
    const findCurrentProductIndex = cart.items.findIndex(item=>item.productId.toString() === productId);
    if(findCurrentProductIndex === -1){
      cart.items.push({productId,qty});
    }else{
      cart.items[findCurrentProductIndex].qty += qty
    }
    await cart.save();
    return res.status(200).json({
      success:true,
      data:cart
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
    });
  }
}

const getCart = async(req,res)=>{
  try {
    const {userId} = req.params
    if(!userId){
      return res.status(404).json({
        success: false,
        message: "User Id is mandetory!",
      });
    }
    const cart = await Cart.findOne({userId}).populate({
      path: 'items.productId',
      select : "image title price salePrice"
    })
    if(!cart){
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    const validItems = cart.items.filter(productItem =>productItem.productId)
    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }
    const populateCartItems = validItems.map(item=>({
      productId :item.productId._id,
      image :item.productId.image,
      title :item.productId.title,
      price :item.productId.price,
      salePrice :item.productId.salePrice,
      qty :item.qty
    }))
    return res.status(200).json({
      success:true,
      data:{ ...cart._doc,
        items: populateCartItems,}
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
    });
  }
}

const deleteCart = async(req,res)=>{
  try {
    const {userId,productId} = req.params;
    if(!userId || !productId){
      return res.status(400).json({
        success:false,
        message:"Invalid data provided"
      })
    }
    const cart = await Cart.findOne({userId}).populate({
         path: 'items.productId',
         select : "image title price salePrice"
      })
      if(!cart){
        return res.status(404).json({
          success: false,
          message: "Cart not found",
        });
      }
      cart.items = cart.items.filter(item=>item.productId._id.toString() !== productId)
      await cart.save()

      await cart.populate({
        path: 'items.productId',
        select : "image title price salePrice"
     })

     const populateCartItems = cart.items.map(item=>({
      productId : item.productId ? item.productId._id : null,
      image :item.productId ? item.productId.image : null,
      title :item.productId ? item.productId.title :null,
      price :item.productId ? item.productId.price :null,
      salePrice :item.productId ? item.productId.salePrice : null,
      qty :item.qty
    }))

    return res.status(200).json({
      success:true,
      data:{ ...cart._doc,
        items: populateCartItems,}
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
    });
  }
}

const updateCart = async(req,res)=>{
  try {
    const {userId,productId,qty} = req.body
    if(!userId || !productId || qty <= 0){
      return res.status(400).json({
        success:false,
        message:"Invalid data provided"
      })
    }
    const cart = await Cart.findOne({userId});
    if(!cart){
      return res.status(404).json({
        success:false,
        message:"Cart Is not found"
      })
    }
    const findCurrentProductIndex = cart.items.findIndex(item=>item.productId.toString() === productId)
    if(findCurrentProductIndex === -1){
      return res.status(404).json({
        success:false,
        message:"Cart item not present"
      })
    }
    cart.items[findCurrentProductIndex].qty = qty;
    await cart.save();
    await cart.populate({
      path: 'items.productId',
       select : "image title price salePrice"
    })

    const populateCartItems = cart.items.map(item=>({
      productId : item.productId ? item.productId._id : null,
      image :item.productId ? item.productId.image : null,
      title :item.productId ? item.productId.title :null,
      price :item.productId ? item.productId.price :null,
      salePrice :item.productId ? item.productId.salePrice : null,
      qty :item.qty
    }))

    return res.status(200).json({
      success:true,
      data:{ ...cart._doc,
        items: populateCartItems,}
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
    });
  }
}

module.exports = {addToCart,updateCart,deleteCart,getCart}