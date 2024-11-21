const { z } = require("zod");
const Student = require("../models/Student");
const addImageToCludinary = require("../utils/addingImage");
const Class = require("../models/Class");

const studentSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  classId: z.string(),
  profileImage: z.string().optional(),
});
const updateSudentSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  classId: z.string().optional(),
  profileImage: z.string().optional(),
});
const addStudent = async (req, res) => {
  try {
    const { success, error } = studentSchema.safeParse(req.body);
    if (!success) {
      console.log(error);
      return res
        .status(409)
        .json({ success: false, message: "Check your request body" });
    }
    const existingStudent = await Student.findOne({ email: req.body.email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ success: false, message: "Same email alderady exists" });
    }
    const newStudent = new Student(req.body);
    if (req.file) {
      const uploadResponse = await addImageToCludinary(req.file);
      newStudent.profileImageUrl = uploadResponse.url;
    }
    await Class.updateOne(
      { _id: req.body.classId },
      { $inc: { studentCount: 1 } }
    );
    await newStudent.save();
    res
      .status(201)
      .json({ success: true, message: "new user created", data: newStudent });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "There is an error",
    });
  }
};
const getAllStudents = async (req, res) => {
  try {
    const startIndex = req.query.page || 1;
    const query = {};
    if (req.query.classId) {
      const classId = req.query.classId;
      query["classId"] = classId;
    }
    const start = (startIndex - 1) * 10;
    const totalDocs = await Student.countDocuments(query);
    if (totalDocs.length === 0 || totalDocs < start) {
      return res.status(404).json({
        success: false,
        data: [],
        pagination: {
          page: 1,
          pages: 1,
          total: 0,
        },
      });
    }
    const totalPages = Math.ceil(totalDocs / 10);
    const allStudents = await Student.find(query).limit(10).skip(start).lean();
    const pagination = {
      page: startIndex,
      pages: totalPages,
      total: totalDocs,
    };
    return res.status(200).json({
      sucess: true,
      data: allStudents,
      pagination,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json("There is an error");
  }
};
const getStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ success: false, message: "No one found" });
    }
    return res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "There is an error",
    });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ success: false, message: "No one found" });
    }
    await Student.deleteOne({ _id: id });
    await Class.updateOne(
      { _id: student.classId },
      { $inc: { studentCount: -1 } }
    );
    return res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "There is an error",
    });
  }
};
const updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const { success, error } = updateSudentSchema.safeParse(req.body);
    if (!success || (Object.keys(req.body).length === 0 && !req.file)) {
      console.log(error);
      return res
        .status(400)
        .json({ success: false, message: "The body is not prpoer" });
    }
    if (req.file) {
      const uploadResponse = await addImageToCludinary(req.file);
      req.body.profileImageUrl = uploadResponse.url;
    }
    if (req.body.email) {
      const existingEmail = await Student.findOne({ email: req.body.email });
      if (existingEmail) {
        return res
          .status(409)
          .json({ success: false, message: "The email aldready exists" });
      }
    }
    await Student.updateOne({ _id: id }, req.body);
    return res.status(200).json({
      sucess: true,
      message: "The user is updated",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "There is an error",
    });
  }
};
module.exports = {
  addStudent,
  getAllStudents,
  getStudent,
  deleteStudent,
  updateStudent,
};
