function validateCustomerInput(data) {
    const error = 'Request Validation Failed'

    const { name, username, password, email, mobile } = data;

    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!username) missingFields.push("username");
    if (!password) missingFields.push("password");
    if (!email) missingFields.push("email");
    if (!mobile) missingFields.push("mobile");
  
    if (missingFields.length > 0) {
      return {
        success: false,
        error_code: 'CUSVALER01',
        error: error,
        message: `Missing fields: ${missingFields}`        
      };
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
        return {
            success: false,
            error_code: 'CUSVALER02',
            error: error,
            message: `Invalid email format`        
          };
    }
  
    if (mobile && !/^\d{10}$/.test(mobile)) {
        return {
            success: false,
            error_code: 'CUSVALER03',
            error: error,
            message: `Mobile must be 10 digits`        
          };
    }
  
    return { success: true };
  }
  
  module.exports = { validateCustomerInput };
  