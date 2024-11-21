const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true,
    lowercase: true,
  },
  classId: {
    type: mongoose.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  profileImageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
