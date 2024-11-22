const express = require("express");
const {
  addAttendanceOfClass,
  getAttendace,
  updateAttendanceOfClass,
} = require("../controllers/attendanceControllers");
const { jwtMiddleware } = require("../middlewares/jwtMilddleware");
const router = express.Router();
router.post("/all", jwtMiddleware, addAttendanceOfClass);
router.get("/", getAttendace);
router.put("/", jwtMiddleware, updateAttendanceOfClass);
module.exports = router;
