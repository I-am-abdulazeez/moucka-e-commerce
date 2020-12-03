const mongoose = require("mongoose");
const moment = require("moment");

// ProductName, ProductNum, Quantity, UnitCost, TotalCost
const OrderSchema = new mongoose.Schema({
  productName: {
    type: String,
    trim: true,
    required: [true, "Please Add some text"],
  },
  productNumber: {
    type: Number,
    trim: true,
    required: [true, "Please add the Product Number"],
  },
  quantity: {
    type: Number,
    trim: true,
    required: [true, "Please add a positive number"],
    min: 1,
  },
  unitCost: {
    type: Number,
    trim: true,
    required: [true],
  },
  totalCost: {
    type: Number,
    trim: true,
    required: [true],
  },
  customerName: {
    type: String,
    trim: true,
    required: [true, "Please enter your Name"],
  },
  customerNumber: {
    type: Number,
    trim: true,
    required: [true, "Please enter your Phone Number"],
  },
  amount: {
    type: Number,
    trim: true,
    required: [true, "Please enter an amount"],
  },
  createdAt: {
    type: String,
    default: moment().format("MMMM Do YYYY, h:mm a"),
  },
});

module.exports = mongoose.model("Order", OrderSchema);
