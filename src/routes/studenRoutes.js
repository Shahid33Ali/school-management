const express = require("express");
const {
  addStudent,
  getAllStudents,
  getStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/studentControllers");
const upload = require("../middlewares/multer");
const router = express.Router();
router.post("/", upload.single("image"), addStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudent);
router.delete("/:id", deleteStudent);
router.put("/:id", upload.single("image"), updateStudent);
module.exports = router;
