const express = require("express");
const { pending, updateSalesStatus } = require("../controllers/salescontrollers");
const router = express.Router();

router.post("/pending", pending);
router.get("/:id/status", updateSalesStatus);

module.exports = router;
