const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const paymentController = require("../controllers/paymentController");

router.post("/", auth.checkIfAuth, paymentController.assingService);

router.get("/", auth.checkIfAuth, paymentController.getPayments);

router.get(
  "/totalServices",
  auth.checkIfAuth,
  paymentController.getTotalServices
);

router.get("/:paymentById", auth.checkIfAuth, paymentController.getPaymentById);

router.delete(
  "/dele/:paymentId",
  auth.checkIfAuth,
  paymentController.deleteServiPay
);

router.get(
  "/:serviceByCustomerId",
  auth.checkIfAuth,
  paymentController.getServicesByCustomerId
);

router.get(
  "/:paymentByCustomerId",
  auth.checkIfAuth,
  paymentController.getPaymentByCustomerId
);

module.exports = router;
