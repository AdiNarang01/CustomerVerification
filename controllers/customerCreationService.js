const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");
const jsonata = require('jsonata');
const { validateCustomerInput } = require("../dataclass/customerValidation");

const createCustomer = async (req, res) => {
  try {
    const validation = validateCustomerInput(req.body);
    if (!validation.success) {
      return res.status(400).json(validation);
    }

    const str = jsonata(`{
      "name": name,
      "username": username,
      "password": password,
      "email": email,
      "mobile": mobile
    }`);

    const reqbody = await str.evaluate(req.body);

    const existingUser = await Customer.findOne({$or: [{ username : reqbody.username }, { email : reqbody.email }, {mobile: reqbody.mobile}]});
    if (existingUser) {
      const displayMessages = {
        mobile: `Number ${reqbody.mobile} already exists`,
        email: `Email ${reqbody.email} is already in use`,
        username: `Username ${reqbody.username} is already taken`,
      };
      const conflictField = Object.keys(fieldMessages).find( key => existingUser[key] === reqbody[key] );
      return res.status(400).json(
          {
              success: false,
              error_code: 'CUSVALER04',
              error: 'User already exist',
              message: displayMessages[conflictField] || 'Either of mobile, email or password already exist'
          }
      );
    }

    const hashedPassword = await bcrypt.hash(reqbody.password, 10);
    const customer = new Customer({
      name: reqbody.name,
      username: reqbody.username,
      password: hashedPassword,
      email: reqbody.email,
      mobile: reqbody.mobile,
    });
    await customer.save();
    res.status(201).json({ success: true, message: "Customer created successfully" });
  }

  catch (err) {
    res.status(500).json({ 
        success: false,
        error_code: 'CUSAPIER01',
        error: "Server error",
        message: err.message 
    });
  }
};

module.exports = { createCustomer };
