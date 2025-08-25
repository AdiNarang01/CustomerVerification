const jwtVerify = async (req, res) => {
  try {
    const {name} = req.body
    res.status(201).json({ success: true, message: `Hello Customer ${name}, you are authenticated!`,});
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

module.exports = { jwtVerify };
