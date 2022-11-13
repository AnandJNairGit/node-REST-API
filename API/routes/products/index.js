const express = require("express");
const { default: mongoose } = require("mongoose");
const Product = require("../../models/product");
const router = express.Router();

const multer = require("multer");

//DEFINE STORAGE CONFIGURATION
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  fileName: (req, file, cb) => {
    console.log("the file name os---------->", file.filename);
    cb(null, file.filename);
  },
});

//DEFINE FILE FILTER CONFIGURATION
const fileFilter = (req, file, cb) => {
  console.log("the file is-------->", file);
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage, fileFilter });

//hANDLE gET REQUEST
router.get("/", async (req, res, next) => {
  const products = await Product.find().select("name price _id productImage").exec();
  console.log(products);
  res.status(200).json({
    count: products.length,
    //MODIFY THE PRODUCTS LIST TO SHOW REQUEST DETAILS
    products: products.map((item) => {
      return {
        _id: item._id,
        name: item.name,
        price: item.price,
        productImage: item.productImage,
        //SEND URL TO GET THE DETAILS OF PARTICULAR ROUTE
        request: {
          type: "GET",
          url: `http://localhost:3000/products/${item._id}`,
        },
      };
    }),
  });
});

//HANDLE POST REQUEST
router.post("/", upload.single("productImage"), (req, res, next) => {
  console.log(req.file.path);

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
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
      console.log("insudddddiiiee   eerrrrooottrtrrr");
      console.log(err);
      res.status(500).json(err);
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
    const productDetails = await Product.findByIdAndUpdate(id, req.body);
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
