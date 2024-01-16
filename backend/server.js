const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 4000;

const { MONGODB_URL } = require("./config");
mongoose.connect(MONGODB_URL);
require("./models/userModel");
app.use(require("./routes/userRoute"));

mongoose.connection.on("connected", () => {
  console.log("db connected");
});

app.listen(PORT, () => {
  console.log("Server started");
});
