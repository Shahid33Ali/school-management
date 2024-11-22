const express = require("express");
const { reportGeneration } = require("../controllers/reportController");
const router = express.Router();
router.get("/:id", reportGeneration);
module.exports = router;
