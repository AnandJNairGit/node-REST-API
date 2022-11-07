const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "fetched orders" });
});

router.post("/", (req, res, next) => {
  res.status(200).json({ message: "order created" });
});

router.get("/:orderID", (req, res, next) => {
  const id = req.params.orderID;
  res.status(200).json({ message: "hey, this is your order", id: id });
});

router.delete("/:orderID", (req, res, next) => {
  const id = req.params.orderID;
  res.status(200).json({ message: `order ${id} deleted`, id: id });
});

module.exports = router;
