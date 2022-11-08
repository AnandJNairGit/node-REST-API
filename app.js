const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const productRoutes = require("./API/products");
const orderRoutes = require("./API/orders");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const middleware = (req, res, next) => {
    console.log("hiii middleware");
    next();
  };
app.use(middleware);

// routes that handle request
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

//error handling
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});



module.exports = app;
