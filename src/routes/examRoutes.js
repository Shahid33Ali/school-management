const express = require("express");
const { createExam, getExams } = require("../controllers/examControllers");
const { jwtMiddleware } = require("../middlewares/jwtMilddleware");
const router = express.Router();
router.post("/", jwtMiddleware, createExam);
router.get("/", getExams);
module.exports = router;
