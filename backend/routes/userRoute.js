const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const protectedRoute = require("../middleware/protectedRoute");

const mongoose = require("mongoose");
const UserModel = mongoose.model("UserModel");

router.get("/home", protectedRoute, (req, res) => {
  res.send("Welcome to Your Home!");
});

// router.post("/register", (req, res) => {
//   const { fullName, email, password } = req.body;

//   if (!fullName || !email || !password) {
//     return res.status(400).json({ error: "Mandatory fields cannot be empty" });
//   }

//   bcrypt.hash(password, 16).then((hp) => {
//     const userData = new UserModel({
//       fullName,
//       email,
//       password: hp,
//     });

//     UserModel.findOne({ email: email })
//       .then((dbUser) => {
//         if (dbUser) {
//           return res.status(400).json({ error: "User already exists" });
//         }

//         userData
//           .save()
//           .then((result) => {
//             res
//               .status(201)
//               .json({ result, message: "User registered successfully" });
//           })
//           .catch((error) => {
//             console.error(error);
//             res.status(500).json({ error: "Internal Server Error" });
//           });
//       })
//       .catch((error) => {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//       });
//   });
// });

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ error: "Mandatory fields cannot be empty" });
    }

    const hashedPassword = await bcrypt.hash(password, 16);

    const dbUser = await UserModel.findOne({ email: email });

    if (dbUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const userData = new UserModel({
      fullName,
      email,
      password: hashedPassword,
    });

    const result = await userData.save();

    res.status(201).json({ result, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Mandatory fields cannot be empty" });
  }

  UserModel.findOne({ email: email })
    .then((dbUser) => {
      if (!dbUser) {
        return res.status(401).json({ error: "Invalid Credentials" });
      }

      bcrypt
        .compare(password, dbUser.password)
        .then((didMatch) => {
          if (didMatch) {
            const jwtToken = jwt.sign({ _id: dbUser._id }, JWT_SECRET);
            const { _id, fullName, email } = dbUser;
            res.json({ token: jwtToken, userInfo: { _id, fullName, email } });
            // res.json({ result: "Login successfully" });
          } else {
            return res.status(401).json({ error: "Invalid Credentials" });
          }
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
