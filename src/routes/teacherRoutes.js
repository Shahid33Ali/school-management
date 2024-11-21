const express = require("express");
const upload = require("../middlewares/multer");
const {
  createTeacher,
  getAllTeachers,
  getTeacher,
  deleteTeacher,
  updateTeacher,
} = require("../controllers/teacherController");

const router = express.Router();
router.post("/", upload.single("image"), createTeacher);
router.get("/", getAllTeachers);
router.get("/:id", getTeacher);
router.delete("/:id", deleteTeacher);
router.put("/:id", upload.single("image"), updateTeacher);
module.exports = router;
