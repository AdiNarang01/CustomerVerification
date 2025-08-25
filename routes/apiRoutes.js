// routes/apiRoutes.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware")
const { createCustomer } = require("../controllers/customerController");
const { loginCustomer } = require("../controllers/loginController");
const { logoutCustomer } = require("../controllers/logoutController");
const { otpGeneration } = require("../controllers/otp/otpGeneration");
const { otpValidation } = require("../controllers/otp/otpValidation");
const {jwtVerify} = require("../controllers/jwtverifyController")

const router = express.Router();
router.post("/customers", createCustomer);
router.post("/customers/login", loginCustomer);
router.post("/protected", authMiddleware, jwtVerify);
router.post("/customers/logout", authMiddleware, logoutCustomer);
router.post("/otp/generate", authMiddleware, otpGeneration);
router.post("/otp/validate", authMiddleware, otpValidation);

module.exports = router;