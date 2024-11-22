const { z } = require("zod");
const jwt = require("jsonwebtoken");
const adminSchema = z.object({
  username: z.string(),
  password: z.string(),
});
const adminLogin = (req, res) => {
  try {
    const { success } = adminSchema.safeParse(req.body);
    if (!success) {
      return res
        .status(409)
        .json({ success: false, message: "The body is not in correct format" });
    }
    if (
      req.body.username !== process.env.ADMIN_USER ||
      req.body.password !== process.env.ADMIN_PASSWORD
    ) {
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
    console.log(error);
    res.status(400).json({ success: false, message: "There is an error" });
  }
};
module.exports = adminLogin;
