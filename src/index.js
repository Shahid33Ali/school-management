const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const TeacherRouter = require("./routes/teacherRoutes");
const ClassRouter = require("./routes/classRoutes");
const StudentRouter = require("./routes/studenRoutes");
const AdminRouter = require("./routes/adminRoute");
const AttendanceRouter = require("./routes/attendanceRoutes");
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
app.use("/api/class", ClassRouter);
app.use("/api/students", StudentRouter);
app.use("/admin/login", AdminRouter);
app.use("/api/attendance", AttendanceRouter);
app.get("/health", (req, res) => {
  res.json({ message: "Health is good" });
});
app.listen(process.env.PORT || 3001, () => {
  console.log("Connected to port");
});
