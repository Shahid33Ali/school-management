const jwt = require("jsonwebtoken");
const jwtMiddleware = async (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header || !header.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ sucess: false, message: "The token is not correct" });
  }
  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.username = decoded.username;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};
module.exports = { jwtMiddleware };
