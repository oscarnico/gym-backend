const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/serviceController");

router.post("/", serviceController.addService);

router.get("/", serviceController.getService);

router.get("/:serviceId", serviceController.getServicesById);

router.patch("/:serviceId", serviceController.editServieById);

router.delete("/:serviceId", serviceController.deleteServiceById);

module.exports = router;