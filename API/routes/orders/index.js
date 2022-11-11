const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../../models/order");

//HANDLE ORDERS GET REQUEST
router.get("/", async (req, res, next) => {
  try {
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
          //ADDING REQUEST DETAILS TO THE RESPONSE
          request: {
            type: "GET",
            url: `http://localhost:3000/orders/${item._id}`,
          },
        };
      }),
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//HANDLING ORDER POST REQUEST
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

//HANDLE ORDER GET REQUEST BY ID
router.get("/:orderID", async (req, res, next) => {
  const id = req.params.orderID;
  const order = await Order.findById(id);
  res.status(200).json(order);
});

//HANDLE ORDER PATCH REQUEST BY ID
router.patch("/:orderID", async (req, res, next) => {
  try {
    const id = req.params.orderID;
    const order = await Order.findByIdAndUpdate(id, req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

//HANDLE ORDER DELETE REQUEST BY ID
router.delete("/:orderID", async (req, res, next) => {
  try {
    const id = req.params.orderID;
    const order = await Order.findByIdAndDelete(id);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
