const mongoose = require("mongoose");

async function connectDB() {
  try {
    const uri = process.env.MONGO_URI; // your Atlas SRV connection string
    await mongoose.connect(uri);
    console.log("MongoDB database connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
