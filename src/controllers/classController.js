const { z } = require("zod");
const Class = require("../models/Class");
const Teacher = require("../models/Teacher");
const createClassSchema = z.object({
  name: z.string(),
  teacherId: z.string(),
  studentCount: z.number().optional(),
});
const updateClassSchema = z.object({
  name: z.string().optional(),
  teacherId: z.string().optional(),
  studentCount: z.number().optional(),
});
const createClass = async (req, res) => {
  try {
    const { success, err } = createClassSchema.safeParse(req.body);
    if (!success || !req.body.name.startsWith("Class ")) {
      console.log(err);
      return res
        .status(409)
        .json({ success: false, message: "The schema is not right" });
    }
    const existingClass = await Class.findOne({ name: req.body.name });
    if (existingClass) {
      return res.status(409).json({
        success: false,
        message: "There is aldready a class with the same name",
      });
    }
    const teacher = await Teacher.findById(req.body.teacherId);
    if (!teacher) {
      return res
        .status(404)
        .json({ success: false, message: "There is no teacher of this id" });
    }

    const newClass = new Class(req.body);
    await newClass.save();
    return res
      .status(201)
      .json({ success: true, message: "Class created", data: newClass });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "There is an error",
    });
  }
};
const getAllClasses = async (req, res) => {
  try {
    const startIndex = req.query.page || 1;
    const query = {};
    const start = (startIndex - 1) * 10;
    const totalDocs = await Class.countDocuments();
    if (totalDocs.length === 0) {
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
    if (start >= totalDocs) {
      return res.status(404).json({
        success: false,
        message: "There is no page available",
      });
    }

    const totalPages = Math.ceil(totalDocs / 10);
    const allClasses = await Class.find(query).limit(10).skip(start).lean();
    const pagination = {
      page: startIndex,
      pages: totalPages,
      total: totalDocs,
    };
    return res.status(200).json({
      sucess: true,
      data: allClasses,
      pagination,
    });
  } catch (error) {
    res.status(400).json("There is an error");
  }
};
const updateClass = async (req, res) => {
  try {
    const id = req.params.id;
    const { success, error } = updateClassSchema.safeParse(req.body);
    if (!success || Object.keys(req.body).length === 0) {
      console.log(error);
      return res
        .status(400)
        .json({ success: false, message: "The body is not prpoer" });
    }
    const existingClass = await Class.findOne({ name: req.body.name });
    if (existingClass) {
      return res.status(409).json({
        success: false,
        message: "There is a same class with the same name",
      });
    }
    await Class.updateOne({ _id: id }, req.body);
    return res.status(201).json({
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
const deleteClass = async (req, res) => {
  try {
    const id = req.params.id;
    const classFind = await Class.findById(id);
    if (!classFind) {
      return res.status(404).json({ success: false, message: "No one found" });
    }
    await Class.deleteOne({ _id: id });
    return res.status(200).json({ success: true, data: classFind });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "There is an error",
    });
  }
};
const getClass = async (req, res) => {
  try {
    const existingClass = await Class.findById(req.params.id);
    if (!existingClass) {
      return res
        .status(404)
        .json({ success: false, message: "There is an error" });
    }
    return res
      .status(200)
      .json({ success: true, data: existingClass, message: "Found" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "There is an error",
    });
  }
};
module.exports = {
  createClass,
  getAllClasses,
  updateClass,
  deleteClass,
  getClass,
};
