const jwt = require("jsonwebtoken");
const Otp = require("../../models/Otp");
const Customer = require("../../models/Customer");

const otpValidation = async (req, res) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({
      success: false,
      error_code: "OTPVALER01",
      error: "ValidationError",
      message: "Mobile and OTP are required",
    });
  }

  const customer = await Customer.findOne({ mobile: mobile, _id: req.userId });
  if (!customer) {
    return res.status(404).json({
      success: false,
      error_code: "OTPVALER02",
      error: "NotFound",
      message: "Customer not found",
    });
  }

  const validOtp = await Otp.findOne({ customerId: customer._id, otp: otp, mobile: mobile });
  if (!validOtp) {
    return res.status(400).json({
      success: false,
      error_code: "OTPVALER03",
      error: "Invalid OTP",
      message: "OTP is invalid or expired",
    });
  }

  await Otp.deleteOne({ _id: validOtp._id });

  return res.json({
    success: true,
    message: "OTP verified successfully",
  });
};

module.exports = {otpValidation}