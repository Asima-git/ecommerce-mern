const Product = require("../../models/Product");

const getFilterProducts = async(req,res)=>{
  try {
    const {category = [],brand=[],sortBy = 'price-lowtohigh'} = req.query
    let filters = {};
    if(category.length){
      filters.category = {$in:category.split(',')}
    }
    if(brand.length){
      filters.category = {$in:brand.split(',')}
    }
    let sort = {}
    switch (sortBy) {
      case 'price-lowtohigh':
        sort.price = 1
        break;
      case 'price-hightolow':
        sort.price = -1
        break;
      case 'title-atoz':
        sort.title = 1
        break;
      case 'title-ztoa':
        sort.title = -1
        break;
      default:
        sort.price = 1
        break;
    }
    const products =  await Product.find(filters).sort(sort);
    return res.status(200).json({
        success: true,
        message: "Product Listed successfully",
        data: products,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
    });
  }
}

const getProductDetails = async(req,res)=>{
 try {
  const {id} = req.params
  const product = await Product.findById(id);
  if(!product) return res.status(404).json({
    success:false,
    message:"Product not found"
  })
  return res.status(200).json({
    success:true,
    message:"Get All deatils of product",
    data:product
  })
 } catch (error) {
  console.error(error);
  return res.status(500).json({
    success: false,
    message: "An error occurred while updating the product",
  });
 }
}

module.exports = {getFilterProducts,getProductDetails}