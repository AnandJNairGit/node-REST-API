const express = require("express");
const app = express();
const morgan = require("morgan");

const productRoutes = require("./API/products");
const orderRoutes = require("./API/orders");

app.use(morgan("dev"));

// routes that handle request
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

module.exports = app;
