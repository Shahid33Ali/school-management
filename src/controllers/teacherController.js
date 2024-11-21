const { z } = require("zod");
const Teacher = require("../models/Teacher");
const cloudinary = require("../cloudinary/cloudinary");
const addImageToCludinary = require("../utils/addingImage");
const subjectEnum = z.enum([
  "History",
  "English",
  "Maths",
  "Physics",
  "Chemistry",
  "Hindi",
]);
const taecherSchemaCreate = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: subjectEnum,
  image: z.string().optional(),
});
const taecherSchemaUpdate = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  subject: subjectEnum.optional(),
  image: z.string().optional(),
});
const createTeacher = async (req, res) => {
  try {
    const { success, error } = taecherSchemaCreate.safeParse(req.body);
    if (!success) {
      console.log("There is schema error " + error);
      return res
        .status(400)
        .json({ message: "There is an error check your request body " });
    }
    const existingTeacher = await Teacher.findOne({ email: req.body.email });
    if (existingTeacher) {
      return res
        .status(409)
        .json({ message: "There is aldready a teacher with this email" });
    }
    const newTeacher = new Teacher(req.body);
    console.log(req.file);
    if (req.file) {
      const uploadResponse = await addImageToCludinary(req.file);
      newTeacher.profileImageUrl = uploadResponse.url;
    }
    await newTeacher.save();
    res.status(201).json({ success: true, data: newTeacher });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: `There is an error`,
      error: err.message,
    });
  }
};
const getAllTeachers = async (req, res) => {
  try {
    const startIndex = req.query.page || 1;
    const query = {};
    if (req.query.subject) {
      const subject = req.query.subject;
      query["subject"] = new RegExp(subject, "i");
    }
    const start = (startIndex - 1) * 10;
    const totalDocs = await Teacher.countDocuments(query);
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
    const totalPages = Math.floor(totalDocs / 10) + 1;
    const allTeachers = await Teacher.find(query).limit(10).skip(start).lean();
    const pagination = {
      page: startIndex,
      pages: totalPages,
      total: totalDocs,
    };
    return res.status(200).json({
      sucess: true,
      data: allTeachers,
      pagination,
    });
  } catch (error) {
    res.status(400).json("There is an error");
  }
};
const getTeacher = async (req, res) => {
  try {
    const id = req.params.id;
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: "No one found" });
    }
    return res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "There is an error",
    });
  }
};
const deleteTeacher = async (req, res) => {
  try {
    const id = req.params.id;
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: "No one found" });
    }
    await Teacher.deleteOne({ _id: id });
    return res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "There is an error",
    });
  }
};
const updateTeacher = async (req, res) => {
  try {
    const id = req.params.id;
    const { success, error } = taecherSchemaUpdate.safeParse(req.body);
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
    const updatedTeacher = await Teacher.updateOne({ _id: id }, req.body);
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
  createTeacher,
  getAllTeachers,
  getTeacher,
  deleteTeacher,
  updateTeacher,
};
