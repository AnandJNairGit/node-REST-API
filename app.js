const express = require("express");
const app = express();

const productRoutes = require("./API/products");
const orderRoutes = require("./API/orders");

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

module.exports = app;
