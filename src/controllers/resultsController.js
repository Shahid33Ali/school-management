const { z } = require("zod");
const Result = require("../models/Results");
const calculateGrade = require("../utils/caluculateGrade");
const resultsSchema = z.object({
  studentId: z.string(),
  marks: z.number(),
});

const addResultsSchema = z.object({
  examId: z.string(),
  results: z.array(resultsSchema),
});

const addResults = async (req, res) => {
  try {
    const { success, error } = addResultsSchema.safeParse(req.body);
    if (!success) {
      console.log(error);
      return res
        .status(409)
        .json({ success: false, message: "Check the body" });
    }
    const { examId, results } = req.body;
    const resultData = results.map((record) => ({
      studentId: record.studentId,
      examId,
      marks: record.marks,
      grade: calculateGrade(record.marks),
    }));

    const newResults = await Result.insertMany(resultData);
    res.status(201).json({ success: true, data: newResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding results" });
  }
};
const getResults = async (req, res) => {
  try {
    const { classId, subject, studentId, grade, examId } = req.query;
    const filter = {};
    if (studentId) filter.studentId = studentId;
    if (grade) filter.grade = grade;
    if (examId) filter.examId = examId;
    const examFilter = {};
    if (classId) examFilter.classId = classId;
    if (subject) examFilter.subject = subject;
    const results = await Result.find(filter)
      .populate({
        path: "examId",
        match: examFilter,
        select: "subject classId",
      })
      .populate("studentId", "name email");
    const filteredResults = results.filter((result) => result.examId);

    res.status(200).json({
      success: true,
      data: filteredResults,
      message: "Results fetched successfully.",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching results.",
    });
  }
};
const getResult = async (req, res) => {
  try {
    const existingResult = await Result.findById(req.params.id);
    if (!existingResult) {
      return res
        .status(404)
        .json({ success: false, message: "There is an error" });
    }
    return res
      .status(200)
      .json({ success: true, data: existingResult, message: "Found" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "There is an error",
    });
  }
};
module.exports = { addResults, getResults, getResult };
