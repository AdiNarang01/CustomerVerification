const Otp = require("../../models/Otp");
const Customer = require("../../models/Customer");

const otpGeneration = async (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({
      success: false,
      error_code: "OTPVALER01",
      error: "ValidationError",
      message: "Mobile number is required",
    });
  }

  const customer = await Customer.findOne({ mobile: mobile, _id: req.userId });
  if (!customer) {
    return res.status(404).json({
      success: false,
      error_code: "OTPGENER02",
      error: "User not found",
      message: "Please check your mobile number",
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  const existingOtp = await Otp.findOne({ customerId: customer._id, mobile: mobile });
  if (existingOtp) {
    existingOtp.otp = otp;
    existingOtp.expiresAt = expiresAt;
    existingOtp.retryCount = 0;
    await existingOtp.save();
  } else {
    await Otp.create({ customerId: customer._id, mobile: mobile, otp: otp, expiresAt });
  }
  return res.json({
    success: true,
    message: "OTP sent successfully",
    generatedOtp: otp
  });
};


module.exports = { otpGeneration };