const express = require("express");
const { pending, updateSalesStatus, getsales } = require("../controllers/salescontrollers");
const router = express.Router();

router.post("/pending",  pending);
router.put("/:id/status",  updateSalesStatus);
router.get("/sales",  getsales);

module.exports = router;
