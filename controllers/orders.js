const Orders = require("../model/Orders");

// @desc    Get all ORDERS
// route    GET /api/v1/transactions
// access   Public(Everyone)
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Orders.find();
    return res.status(200).json({
      success: true,
      counts: orders.length,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Add ORDERS
// route    POST /api/v1/transactions
// access   Public(Everyone)
exports.addOrders = async (req, res, next) => {
  try {
    const {
      productName,
      productNumber,
      quantity,
      unitCost,
      customerName,
      customerNumber,
    } = req.body;

    const orders = await Orders.create(req.body);

    return res.status(201).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc    Delete ORDERS
// route    DELETE /api/v1/transactions/:id
// access   Public(Everyone)
exports.deleteOrders = async (req, res, next) => {
  try {
    const order = await Orders.findById(req.params.id);

    if (!order)
      res.status(404).json({
        success: false,
        error: "Order Not Found!",
      });

    await order.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// {
//   "productName": "7 Bed Stand",
//   "productNumber": "1245",
//   "quantity": "6",
//   "unitCost": "340",
//   "customerName": "Mr Olatunde",
//   "customerNumber": "09093663636"
// }
