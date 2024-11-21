const express = require("express");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const router = express.Router();
const adminSchema = z.object({
  username: z.string(),
  password: z.string(),
});
router.post("/", (req, res) => {
  try {
    const { success } = adminSchema.safeParse(req.body);
    if (!success) {
      return res
        .status(409)
        .json({ success: false, message: "The body is not in correct format" });
    }
    if (req.body.username !== "admin" || req.body.password !== "123456") {
      return res
        .status(402)
        .json({ success: false, message: "Incorrect admin credentials" });
    }
    const token = jwt.sign(
      { username: req.body.username },
      process.env.JWT_SECRET
    );
    res
      .status(200)
      .json({ success: true, message: "created token successfully", token });
  } catch (error) {
    console.log(eror);
    res.status(400).json({ success: false, message: "There is an error" });
  }
});
module.exports = router;
