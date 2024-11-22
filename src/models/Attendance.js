const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  classId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  studentId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  status: {
    type: String,
    required: true,
    enum: ["Present", "Absent"],
  },
  date: {
    type: Date,
    required: true,
  },
});
const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
