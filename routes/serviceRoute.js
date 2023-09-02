const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')

const serviceController = require("../controllers/serviceController");

router.post("/", auth.checkIfAuth, serviceController.addService);

router.get("/", auth.checkIfAuth, serviceController.getService);

router.get("/:serviceId", auth.checkIfAuth, serviceController.getServicesById);

router.patch("/:serviceId", auth.checkIfAuth, serviceController.editServieById);

router.delete("/:serviceId", auth.checkIfAuth, serviceController.deleteServiceById);

module.exports = router;