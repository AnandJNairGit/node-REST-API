const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Product",
  },
  quantity: { type: Number, require: true, default: 1 },
});

module.exports = mongoose.model("Order", orderSchema);
