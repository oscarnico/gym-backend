const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");

router.post("/", customerController.postCustomer);

router.get("/", customerController.getCustomers);

router.get("/:customerId", customerController.getCustomersById);

router.delete("/:customerId", customerController.deleCustomersById);

module.exports = router;