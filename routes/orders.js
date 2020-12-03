const express = require("express");
const router = express.Router();
const { getOrders, addOrders, deleteOrders } = require("../controllers/orders");

router.route("/").get(getOrders).post(addOrders);
router.route("/:id").delete(deleteOrders);

module.exports = router;
