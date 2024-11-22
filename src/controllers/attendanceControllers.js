const { z } = require("zod");
const Attendance = require("../models/Attendance");
const attendanceSchema = z.object({
  studentId: z.string(),
  status: z.enum(["Present", "Absent"]),
});
const addAttendanceSchema = z.object({
  classId: z.string(),
  date: z.string().date().optional(),
  attendance: z.array(attendanceSchema),
});
const updateAttendanceSchema = z.object({
  classId: z.string(),
  date: z.string().date(),
  attendance: z.array(attendanceSchema),
});
const addAttendanceOfClass = async (req, res) => {
  try {
    const { success, error } = addAttendanceSchema.safeParse(req.body);
    if (!success) {
      console.log(error);
      return res
        .status(404)
        .json({ success: false, message: "There is an error in schema" });
    }
    const { classId, attendance } = req.body;
    const date = req.body.date ? new Date(req.body.date) : new Date();
    date.setHours(0, 0, 0, 0);
    const existingAttendance = await Attendance.findOne({
      classId,
      date: { $eq: date },
    });
    if (existingAttendance) {
      return res
        .status(409)
        .json({ success: false, message: "Aldready existing attendance" });
    }
    const addAll = attendance.map((record) => ({
      classId,
      studentId: record.studentId,
      status: record.status,
      date: date,
    }));
    const newAttendance = await Attendance.insertMany(addAll);
    return res.status(201).json({
      success: true,
      data: newAttendance,
      message: "Attendance created for the students",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "There is an error",
    });
  }
};
const getAttendace = async (req, res) => {
  try {
    const query = {};
    const page = req.query.page || 1;
    if (req.query.classId) {
      query["classId"] = req.query.classId;
    }
    if (req.query.studentId) {
      query["studentId"] = req.query.studentId;
    }
    if (req.query.date) {
      query["date"] = req.query.date;
    }
    if (req.query.status) {
      query["status"] = req.query.status;
    }
    const totalDocs = await Attendance.countDocuments(query);
    if (totalDocs == 0) {
      return res.status(404).json({
        message: "There is no data found",
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }
    const pages = Math.ceil(totalDocs / 10);
    const skip = (page - 1) * 10;
    const findAll = await Attendance.find(query).limit(10).skip(skip).lean();
    return res.status(200).json({
      success: true,
      message: "Found the items",
      data: findAll,
      pagination: {
        total: totalDocs,
        pages,
        page,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "There is an error",
    });
  }
};
const updateAttendanceOfClass = async (req, res) => {
  try {
    const { success, error } = updateAttendanceSchema.safeParse(req.body);
    if (!success) {
      console.log(error);
      return res
        .status(404)
        .json({ success: false, message: "There is an error in schema" });
    }
    const { classId, attendance } = req.body;
    const date = new Date(req.body.date);
    date.setHours(0, 0, 0, 0);
    const existingAttendance = await Attendance.findOne({
      classId,
      date: { $eq: date },
    });
    if (!existingAttendance) {
      return res.status(409).json({
        success: false,
        message: "No aldredy existing attendace available",
      });
    }
    const bulkUpdate = attendance.map((record) => ({
      updateOne: {
        filter: { studentId: record.studentId, classId, date },
        update: { $set: { status: record.status } },
      },
    }));
    const newAttendance = await Attendance.bulkWrite(bulkUpdate);
    return res.status(201).json({
      success: true,
      data: newAttendance,
      message: "Attendance created for the students",
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
  addAttendanceOfClass,
  getAttendace,
  updateAttendanceOfClass,
};
