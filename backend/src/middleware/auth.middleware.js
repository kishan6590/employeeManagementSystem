import jwt from "jsonwebtoken";
const isLoggedin = async function (req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(400).json({
        message: "Unauthorized Access",
        success: false,
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(500).json({
      messager: "Internal Server Error",
      error,
      success: false,
    });
  }
};
export default isLoggedin;
