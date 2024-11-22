const express = require("express");
const {
  createClass,
  getAllClasses,
  updateClass,
} = require("../controllers/classController");
const { deleteTeacher } = require("../controllers/teacherController");
const { jwtMiddleware } = require("../middlewares/jwtMilddleware");
const router = express.Router();
router.post("/", jwtMiddleware, createClass);
router.get("/", getAllClasses);
router.put("/:id", jwtMiddleware, updateClass);
// router.put("/:id", updateClass);
router.delete("/:id", jwtMiddleware, deleteTeacher);
module.exports = router;
