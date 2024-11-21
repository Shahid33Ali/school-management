const mongoose = require("mongoose");
const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  teacherId: {
    type: mongoose.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  studentCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});
const Class = mongoose.model("Class", ClassSchema);
module.exports = Class;
