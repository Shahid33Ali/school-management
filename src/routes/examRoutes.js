const express = require("express");
const {
  createExam,
  getExams,
  getExam,
} = require("../controllers/examControllers");
const { jwtMiddleware } = require("../middlewares/jwtMilddleware");
const router = express.Router();
router.post("/", jwtMiddleware, createExam);
router.get("/", getExams);
router.get("/:id", getExam);
module.exports = router;
