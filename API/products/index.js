const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "handling GET request to products" });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  res
    .status(200)
    .json({ message: "handling POST request to products", createdProduct: req.body });
});

router.get("/:productID", (req, res, next) => {
  const id = req.params.productID;
  if (id == "anand") {
    res.status(200).json({ message: "hey! this is anand" });
  } else {
    res.status(200).json({ message: "use products/anand route to find anand" });
  }
});

module.exports = router;
