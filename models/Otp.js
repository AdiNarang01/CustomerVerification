const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true 
  },
  expiresAt: { 
    type: Date,
    required: true 
  },
});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Otp", otpSchema);
