const jwt = require("jsonwebtoken");
const Blacklist = require("../models/Blacklist")

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error_code: "AUTH01",
      error: "Unauthorized",
      message: "No token provided. Please login again",
    });
  }

  try {
    const blacklisted = await Blacklist.findOne({ token : authHeader });
    if (blacklisted) {
      return res.status(401).json({
        success: false,
        error_code: "AUTH02",
        error: "Unauthorized",
        message: "Token has been logged out. Please login again",
      });
    }
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error_code: "AUTH02",
      error: "Unauthorized",
      message: "Invalid or expired token. Please login again",
    });
  }
}

module.exports = authMiddleware;
