const express = require("express");
const { createExam, getExams } = require("../controllers/examControllers");
const router = express.Router();
router.post("/", createExam);
router.get("/", getExams);
module.exports = router;
