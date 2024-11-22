const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const TeacherRouter = require("./routes/teacherRoutes");
const ClassRouter = require("./routes/classRoutes");
const StudentRouter = require("./routes/studenRoutes");
const AdminRouter = require("./routes/adminRoute");
const AttendanceRouter = require("./routes/attendanceRoutes");
const ReportRouter = require("./routes/reportRoute");
const ExamRouter = require("./routes/examRoutes");
const ResultRouter = require("./routes/resultsRoute");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to db"))
  .catch((err) => {
    console.log("There is an error");
    console.log(err);
  });
app.use("/api/teachers", TeacherRouter);
app.use("/api/classes", ClassRouter);
app.use("/api/students", StudentRouter);
app.use("/api/admin/login", AdminRouter);
app.use("/api/attendance", AttendanceRouter);
app.use("/api/generate/report", ReportRouter);
app.use("/api/exams", ExamRouter);
app.use("/api/results", ResultRouter);
app.get("/health", (req, res) => {
  res.json({ message: "Health is good" });
});
app.listen(process.env.PORT || 3001, () => {
  console.log("Connected to port");
});
