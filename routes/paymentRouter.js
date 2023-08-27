const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

router.post("/",paymentController.assingService);

router.get("/", paymentController.getPayments);

router.get("/paymentById", paymentController.getPaymentById);

router.delete("/", paymentController.deletePayment);

router.get("/serviceByCustomerId", paymentController.getServicesByCustomerId);

router.get("/paymentByCustomerId", paymentController.getPaymentByCustomerId);

module.exports = router;