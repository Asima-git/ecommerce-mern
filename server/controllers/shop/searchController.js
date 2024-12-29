const Product = require('../../models/Product');

const searchProduct = async(req,res)=>{
   try {
    const {keyword} = req.params;
    if(!keyword || typeof keyword !== 'string'){
        return res.status(404).json({
            success: false,
            message: "  Keyword is required and must be a string",
          });
    }
    const regEx = new RegExp(keyword,'i');
          const createSearchQuery = {
            $or : [
                {title:regEx},
                {description:regEx},
                {category:regEx},
                {brand:regEx}
            ]
          }
     const searchResult = await Product.find(createSearchQuery);
     return res.status(200).json({
        success: true,
        data: searchResult,
      });
   } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
    });
   }
}


module.exports = {searchProduct}