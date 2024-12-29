const { imageUploadUtils } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUploader = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtils(url);

    return res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while uploading image.",
    });
  }
};

//add new product
const addProduct = async (req, res) => {
  try {
    const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
    const newProduct = new Product({
      image, title, description, category, brand, price, salePrice, totalStock
    })
    await newProduct.save();
    return res.status(200).json({
      success: true,
      message: "Product added successfully",
      data: newProduct
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured"
    })
  }
}

//delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }
    const productOne = await Product.findByIdAndDelete(id);

    // Check if the product exists
    if (!productOne) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    // Handle server error
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product",
    });
  }
};

//updated product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Extract product ID from request parameters
    const { image, title, description, category, brand, price, salePrice,totalStock } = req.body; // Extract fields from request body

    // Find the product by ID
    const findProduct = await Product.findById(id);

    // Check if the product exists
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update only the provided fields
    findProduct.set({
      title: title || findProduct.title,
      description: description || findProduct.description,
      category: category || findProduct.category,
      brand: brand || findProduct.brand,
      price: price === "" ? 0 : price || findProduct.price,
      salePrice: "" ? 0 : salePrice || findProduct.salePrice,
      image: image || findProduct.image,
      totalStock: totalStock || findProduct.totalStock
    });

    // Save the updated product to the database
    await findProduct.save();

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: findProduct,
    });
  } catch (error) {
    console.error(error);

    // Handle server error
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
    });
  }
};


//fetch all products 
const fetchAllProduct = async (req, res) => {
  try {
    const listProduct = await Product.find();
    return res.status(200).json({
      success: true,
      message: "Get All Product List successfully",
      data:listProduct
    }) 

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured"
    })
  }
}
module.exports = { handleImageUploader, fetchAllProduct, updateProduct, deleteProduct, addProduct };
