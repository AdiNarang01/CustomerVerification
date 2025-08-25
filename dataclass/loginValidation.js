function validateLoginInput({ username, email, password }) {
  const missingFields = [];

  if (!password) missingFields.push("password");
  if (!username && !email) missingFields.push("username or email");

  if (missingFields.length > 0) {
    return {
      success: false,
      error_code: "CUSLOGIN01",
      error: "ValidationError",
      message: `Missing fields: ${missingFields}`
    };
  }

  return { success: true };
}

module.exports = validateLoginInput;
