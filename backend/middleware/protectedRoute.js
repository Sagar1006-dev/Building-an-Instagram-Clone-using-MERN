const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const mongoose = require("mongoose");
const UserModel = mongoose.model("UserModel");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Login required" });
  }

  const tokenValue = authorization.replace("Bearer ", "");

  jwt.verify(tokenValue, JWT_SECRET, (error, payload) => {
    if (error) {
      return res.status(401).json({ error: "Login required" });
    }

    const { _id } = payload;

    // Use findById to find a user by ID
    UserModel.findById(_id)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "User not found" });
        }

        // Assign user data to req.userData
        req.userData = user

        // Call next to proceed to the next middleware or route handler
        next();
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });
};
