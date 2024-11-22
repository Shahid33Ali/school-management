const mongoose = require("mongoose");
const examSchema = new mongoose.Schema({
  name: { type: String, required: true },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  subject: {
    type: String,
    required: true,
    enum: ["English", "Maths", "History", "Physics", "Chemistry"],
  },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
