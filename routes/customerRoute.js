const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");

router.post("/", customerController.addtCustomer);

router.get("/", customerController.getCustomers);

router.get("/:customerId", customerController.getCustomersById);

router.patch("/:customerId", customerController.editCustomerById)

router.delete("/:customerId", customerController.deleCustomersById);

module.exports = router;