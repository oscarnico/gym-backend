const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')

const paymentController = require("../controllers/paymentController");

router.post("/", auth.checkIfAuth, paymentController.assingService);

router.get("/", auth.checkIfAuth, paymentController.getPayments);

router.get("/:paymentById", auth.checkIfAuth, paymentController.getPaymentById);

router.delete("/:serviceId", auth.checkIfAuth, paymentController.deletePayment);

router.get("/:serviceByCustomerId", auth.checkIfAuth, paymentController.getServicesByCustomerId);

router.get("/:paymentByCustomerId", auth.checkIfAuth, paymentController.getPaymentByCustomerId);

module.exports = router;