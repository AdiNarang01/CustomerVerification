// routes/apiRoutes.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware")
const { createCustomer } = require("../controllers/customerCreationService");
const { loginCustomer, logoutCustomer } = require("../controllers/loginlogoutService");
const { otpGeneration, otpValidation } = require("../controllers/otpService");
const {jwtVerify} = require("../controllers/jwtverifyController")

const router = express.Router();
router.post("/customers", createCustomer);
router.post("/customers/login", loginCustomer);
router.post("/protected", authMiddleware, jwtVerify);
router.post("/customers/logout", authMiddleware, logoutCustomer);
router.post("/otp/generate", authMiddleware, otpGeneration);
router.post("/otp/validate", authMiddleware, otpValidation);

module.exports = router;