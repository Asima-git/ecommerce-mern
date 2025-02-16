const dotenv = require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const adminProductRouter = require('./routes/admin/products-routes');
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const adminOrderRouter = require('./routes/admin/order-routes');
const searchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/product-review-routes");

const app = express()
const PORT = process.env.PORT || 5000

app.use(
    cors({origin: process.env.FRONTEND_URI,
        methods: ['GET','POST','DELETE','PUT'],
        allowedHeaders:[
            "Content-Type",
            "Authorization",
            "Cache-control",
            'Expires',
            'Pragma'
        ],
        credentials:true
    })
)

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/admin/products',adminProductRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/search", searchRouter);
app.use("/api/shop/review", shopReviewRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {2
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err)); 
