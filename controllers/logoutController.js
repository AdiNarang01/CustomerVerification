const jwt = require("jsonwebtoken");
const Blacklist = require("../models/Blacklist")

const logoutCustomer = async (req, res) => {
  const token = req.headers.authorization;
  const {username} = req.body;
  try {
    const decoded = jwt.decode(token);
    const expiry = new Date(decoded.exp * 1000);
    await Blacklist.create({ token, expiresAt: expiry });

    return res.json({
      success: true,
      message: `${username} is successfully logged out`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error_code: "AUTH05",
      error: "ServerError",
      message: "Something went wrong",
    });
  }
};
module.exports = {logoutCustomer};
