const express = require("express");
const {
  createClass,
  getAllClasses,
  updateClass,
} = require("../controllers/classController");
const { deleteTeacher } = require("../controllers/teacherController");
const router = express.Router();
router.post("/", createClass);
router.get("/", getAllClasses);
router.put("/:id", updateClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteTeacher);
module.exports = router;
