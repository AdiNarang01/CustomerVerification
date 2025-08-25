const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateLoginInput = require("../dataclass/loginValidation");
const Customer = require("../models/Customer");
const Blacklist = require("../models/Blacklist")

const loginCustomer = async (req, res) => {
  try {
      const validation = validateLoginInput(req.body);
      if (!validation.success) {
        return res.status(400).json(validation);
      }

    const { username, email, password } = req.body;

    const customer = await Customer.findOne( username ? { username } : { email } );
    if (!customer) {
      return res.status(404).json({
        success: false,
        error_code: "CUSLINER01",
        error: "Customer Not Found",
        message: username ? "Invalid UserName" : "Invalid Email",
      });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error_code: "CUSLINER02",
        error: "AuthenticationError",
        message: "Invalid credentials",
      });
    }
    const ttl = process.env.JWT_EXPIRE;
    const token = jwt.sign( { id: customer._id }, process.env.JWT_SECRET, { expiresIn: ttl });
    return res.json({
      success: true,
      value: "working",
      customerId: customer._id,
      token,
    });
  } 
    catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error_code: "LINAPIER01",
      error: "ServerError",
      message: "Something went wrong",
    });
  }
};

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

module.exports = {loginCustomer,logoutCustomer};
