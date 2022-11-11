const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../../models/order");

router.get("/", async (req, res, next) => {
  const orderList = await Order.find().select("_id product quantity");
  console.log(orderList);
  res.status(200).json({
    count: orderList.length,
    orders: orderList.map((item) => {
      console.log("the item -------->", item);
      return {
        _id: item._id,
        product: item.product,
        quantity: item.quantity,
        request: {
          type: "GET",
          url: `http://localhost:3000/orders/${item._id}`,
        },
      };
    }),
  });
});

router.post("/", async (req, res, next) => {
  try {
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      product: req.body.productId,
      quantity: req.body.quantity,
    });
    const createdOrder = await order.save();
    res.status(200).json({ message: "order created", order: createdOrder });
  } catch (error) {
    res.status(500).json(error);
  }
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
