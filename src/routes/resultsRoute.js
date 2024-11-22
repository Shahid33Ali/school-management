const express = require("express");
const { addResults, getResults } = require("../controllers/resultsController");
const { jwtMiddleware } = require("../middlewares/jwtMilddleware");
const router = express.Router();
router.post("/", jwtMiddleware, addResults);
router.get("/", getResults);
module.exports = router;
