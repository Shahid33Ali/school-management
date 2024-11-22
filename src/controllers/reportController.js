const PDFDocument = require("pdfkit");
const Class = require("../models/Class");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const reportGeneration = async (req, res) => {
  try {
    const doc = new PDFDocument();
    const classId = req.params.id;
    const classData = await Class.findById(classId);
    const className = classData.name;
    const classTeacher = await Teacher.findById(classData.teacherId);
    const classTeacherName = await classTeacher.name;
    const students = await Student.find({ classId });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="class_students.pdf"'
    );
    doc.pipe(res);
    doc.fontSize(25).text(`Class: ${className}`, { align: "center" });
    doc.moveDown();
    doc.fontSize(18).text(`Teacher: ${classTeacherName}`, { align: "left" });
    doc.moveDown();
    doc.fontSize(18).text("Students List:", { align: "left" });
    doc.moveDown();
    doc.fontSize(12);
    students.forEach((student) => {
      doc.text(`Name: ${student.name}, Email: ${student.email}`);
      doc.moveDown();
    });
    doc.end();
  } catch (error) {}
};
module.exports = { reportGeneration };
