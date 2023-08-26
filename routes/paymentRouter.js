const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

router.post("/",paymentController.assingService);

router.get("/", paymentController.getPayments);

router.get("/", paymentController.getPaymentById);

router.delete("/", paymentController.deletePayment);

router.get("/", paymentController.getServicesByCustomerId);

router.get("/", paymentController.getPaymentByCustomerId);

module.exports = router;