const express = require("express");
const upload = require("../middlewares/multer");
const {
  createTeacher,
  getAllTeachers,
  getTeacher,
  deleteTeacher,
  updateTeacher,
} = require("../controllers/teacherController");
const { jwtMiddleware } = require("../middlewares/jwtMilddleware");
const { uploadPhoto } = require("../controllers/studentControllers");

const router = express.Router();
router.post("/", jwtMiddleware, upload.single("image"), createTeacher);
router.get("/", getAllTeachers);
router.get("/:id", getTeacher);
router.delete("/:id", jwtMiddleware, deleteTeacher);
router.put("/:id", jwtMiddleware, upload.single("image"), updateTeacher);
router.put("/:id/upload/photo", upload.single("image"), uploadPhoto);
module.exports = router;
