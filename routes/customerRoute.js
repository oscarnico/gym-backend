const express = require("express");
const router = express.Router();

const custumerController = require("../controllers/custumerController");

router.get("/", custumerController.getCustumers);

router.get("/:custumerId", custumerController.getCustumersById);

router.delete("/:custumerId", custumerController.deleCustumersById);

module.exports = router;