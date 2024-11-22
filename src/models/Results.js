const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  marks: { type: Number, required: true },
  grade: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
