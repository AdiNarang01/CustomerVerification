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
  retryCount: { 
    type: Number, 
    default: 0 
  },
  maxRetries: { type: Number, 
    default: 3 
  }
});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Otp", otpSchema);
