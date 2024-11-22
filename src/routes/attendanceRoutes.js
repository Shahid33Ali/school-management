const express = require("express");
const {
  addAttendanceOfClass,
  getAttendace,
  updateAttendanceOfClass,
} = require("../controllers/attendanceControllers");
const router = express.Router();
router.post("/all", addAttendanceOfClass);
router.get("/", getAttendace);
router.put("/", updateAttendanceOfClass);
module.exports = router;
