const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')

const customerController = require("../controllers/customerController");

router.post("/", auth.checkIfAuth, customerController.addCustomer);

router.get("/", auth.checkIfAuth, customerController.getCustomers);

router.get("/:customerId", auth.checkIfAuth, customerController.getCustomersById);

router.patch("/:customerId", auth.checkIfAuth, customerController.editCustomerById)

router.delete("/:customerId", auth.checkIfAuth, customerController.deleCustomersById);

module.exports = router; 