const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const productRoutes = require("./API/routes/products");
const orderRoutes = require("./API/routes/orders");
const mongoose = require("mongoose");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CONNECT MONGO DB
const mongooseConnectUrl =
  "mongodb+srv://AnandJNair:vgsNvMZSAaKYzHs9@node-rest-shop.pmvdiqd.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongooseConnectUrl);

//Handle CORS error
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//CUSTOME MIDDLEWARE
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
