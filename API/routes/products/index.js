const express = require("express");
const { default: mongoose } = require("mongoose");
const Product = require("../../models/product");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "handling GET request to products" });
});

router.post("/", (req, res, next) => {
  console.log(req.body);

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });

  product
    .save()
    .then((result) => {
      console.log("the result is--------->", result);
      res.status(200).json({
        message: "handling POST request to products",
        createdProduct: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });

});

router.get("/:productID", (req, res, next) => {
  const id = req.params.productID;
 
});

module.exports = router;
