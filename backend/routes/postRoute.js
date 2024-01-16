const express = require("express");
const router = express.Router();
const protectedRoute = require("../middleware/protectedRoute");

const mongoose = require("mongoose");
const PostModel = mongoose.model("PostModel");

router.get("/posts", (req, res) => {
  PostModel.find()
    .populate("author", "_id fullName")
    .then((allPosts) => {
      res.json({ status: "success",  allPosts });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: "error", error: "Internal Server Error" });
    });
});

router.get("/myposts", protectedRoute, (req, res) => {
  PostModel.find({ author: req.userData._id })
    .populate("author", "_id fullName")
    .then((myposts) => {
      res.json({ status: "success",  myposts });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: "error", error: "Internal Server Error" });
    });
});

router.post("/create-post", protectedRoute, (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ status: "error", error: "Mandatory fields cannot be empty" });
  }

  const { password, ...safeUserData } = req.userData;
  const postModel = new PostModel({
    title,
    content,
    author: safeUserData,
  });

  postModel
    .save()
    .then((dbPost) => {
      res.status(201).json({ status: "success", data: dbPost });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: "error", error: "Internal Server Error" });
    });
});

module.exports = router;
