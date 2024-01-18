const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");
const mongoose = require("mongoose");
const UserModel = mongoose.model("UserModel");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Login required" });
  }

  const tokenValue = authorization.replace("Bearer ", "");

  try {
    const payload = await jwt.verify(tokenValue, JWT_SECRET);
    const { _id } = payload;

    const user = await UserModel.findById(_id);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.userData = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Login required" });
  }
};

