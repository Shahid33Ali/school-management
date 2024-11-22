const express = require("express");
const { addResults, getResults } = require("../controllers/resultsController");
const router = express.Router();
router.post("/", addResults);
router.get("/", getResults);
module.exports = router;
