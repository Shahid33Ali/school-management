const express = require("express");
const {
  addStudent,
  getAllStudents,
  getStudent,
  deleteStudent,
  updateStudent,
  uploadPhoto,
} = require("../controllers/studentControllers");
const upload = require("../middlewares/multer");
const { jwtMiddleware } = require("../middlewares/jwtMilddleware");
const router = express.Router();
router.post("/", jwtMiddleware, upload.single("image"), addStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudent);
router.delete("/:id", jwtMiddleware, deleteStudent);
router.put("/:id", jwtMiddleware, upload.single("image"), updateStudent);
router.put("/:id/upload/photo", upload.single("image"), uploadPhoto);
module.exports = router;
