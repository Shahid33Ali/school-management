const { z } = require("zod");
const Exam = require("../models/Exam");

const createExamSchema = z.object({
  name: z.string(),
  classId: z.string(),
  subject: z.enum(["English", "Maths", "History", "Physics", "Chemistry"]),
  date: z.string().date(),
});
const createExam = async (req, res) => {
  try {
    const { success, error } = createExamSchema.safeParse(req.body);
    if (!success) {
      console.log(error);
      return res
        .status(409)
        .json({ success: false, message: "Check the body" });
    }
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json({ success: true, data: exam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating exam" });
  }
};
const getExams = async (req, res) => {
  try {
    const { subject } = req.query;
    query = {};
    if (subject) query.subject = subject;
    const exams = await Exam.find(query);
    return res.status(200).json({ success: true, data: exams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error getting exam" });
  }
};
const getExam = async (req, res) => {
  try {
    const exam = await Exam.find(req.params.id);
    if (!exam) {
      return res
        .status(404)
        .json({ seccess: false, message: "There is no exam of this id" });
    }
    return res.status(200).json({ success: true, data: exam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error getting exam" });
  }
};
module.exports = { createExam, getExams, getExam };
