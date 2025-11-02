const express = require("express");
const { pending, updateSalesStatus, getsales } = require("../controllers/salescontrollers");
const { auth } = require("../middlewares/auth")
const router = express.Router();

router.post("/pending", auth, pending);
router.put("/:id/status", auth, updateSalesStatus);
router.get("/sales", auth, getsales);

module.exports = router;
