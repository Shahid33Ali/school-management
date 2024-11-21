const mongoose = require("mongoose");
const TeacherSchema = new mongoose.Schema({
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
  subject: {
    type: String,
    required: true,
    enum: ["History", "English", "Maths", "Physics", "Chemistry", "Hindi"],
  },
  profileImageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = Teacher;
