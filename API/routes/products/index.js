const express = require("express");
const { default: mongoose } = require("mongoose");
const Product = require("../../models/product");
const router = express.Router();

//hANDLE gET REQUEST
router.get("/", async (req, res, next) => {
  const products = await Product.find().exec();
  console.log(products);
  res.status(200).json(products);
});

//HANDLE POST REQUEST
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

//HANDLE GET BY ID REQUEST
router.get("/:productID", async (req, res, next) => {
  const id = req.params.productID;
  try {
    const productDetails = await Product.findById(id).exec();
    console.log(productDetails);
    res.status(200).json(productDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//HANDLE UPDATE BY ID REQUEST
router.patch("/:productID", async (req, res, next) => {
  const id = req.params.productID;
  try {
    const productDetails = await Product.findByIdAndUpdate(id,req.body);
    console.log(productDetails);
    res.status(200).json(productDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//HANDLE DELETE BY ID REQUEST
router.delete("/:productID", async (req, res, next) => {
  const id = req.params.productID;
  try {
    const productDetails = await Product.findByIdAndDelete(id);
    console.log(productDetails);
    res.status(200).json(productDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
