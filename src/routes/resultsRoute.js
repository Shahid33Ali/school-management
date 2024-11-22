const express = require("express");
const {
  addResults,
  getResults,
  getResult,
} = require("../controllers/resultsController");
const { jwtMiddleware } = require("../middlewares/jwtMilddleware");
const router = express.Router();
router.post("/", jwtMiddleware, addResults);
router.get("/", getResults);
router.get("/:id", getResult);
module.exports = router;
