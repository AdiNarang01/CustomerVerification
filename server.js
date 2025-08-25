require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const apiRoutes = require("./routes/apiRoutes");


const app = express();

// Middleware
app.use(express.json());

// DB connection
connectDB();

// Health Check API
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Routes
app.use("/api", apiRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});