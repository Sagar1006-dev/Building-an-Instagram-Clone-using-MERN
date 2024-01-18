const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Create Express app and set the port
const app = express();
const PORT = 4000;

// Import MongoDB URL from config file and connect to MongoDB
const { MONGODB_URL } = require("./config");
mongoose.connect(MONGODB_URL);

// Event listener for successful database connection
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", () => {
  console.log("db connection error");
});

// Import models
require("./models/userModel");
require("./models/postModel");

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Route handling
const userRoute = require("./routes/userRoute");
app.use(userRoute);
const postRoute = require("./routes/postRoute");
app.use(postRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
