const express = require("express");
const router = express.Router();
const protectedRoute = require("../middleware/protectedRoute");

const mongoose = require("mongoose");
const PostModel = mongoose.model("PostModel");

router.get("/posts", (req, res) => {
  PostModel.find()
    .populate("author", "_id fullName")
    .then((allPosts) => {
      res.json({ status: "success", allPosts });
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
      res.json({ status: "success", myposts });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: "error", error: "Internal Server Error" });
    });
});

// router.delete("/delete-post/:postId", protectedRoute, (req, res) => {
//   PostModel.findOne({ _id: req.params.postId })
//     .populate("author", "_id fullName")
//     .exec((error, post) => {
//       if (error || !post) {
//         return res.status(400).json({ error: error });
//       }
//       if (post.author._id.toString() === req.userData._id.toString()) {
//         post.remove().then((result) => {
//           res.json({ result });
//         });
//       }
//     });
// });
// router.post("/create-post", protectedRoute, (req, res) => {
//   console.log(req.body);
//   const { title, content, imgUrl } = req.body;

//   if (!title || !content || !imgUrl) {
//     return res
//       .status(400)
//       .json({ status: "error", error: "Mandatory fields cannot be empty" });
//   }

//   const { password, ...safeUserData } = req.userData;
//   const postModel = new PostModel({
//     title,
//     content,
//     imgUrl,
//     author: safeUserData,
//   });

//   postModel
//     .save()
//     .then((dbPost) => {
//       res.status(201).json({ status: "success", data: dbPost });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ status: "error", error: "Internal Server Error" });
//     });
// });

router.delete("/delete-post/:postId", protectedRoute, (req, res) => {
  PostModel.findByIdAndDelete(req.params.postId)
    .populate("author", "_id fullName")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "Post not found" });
      }

      // Check if the user has the necessary permissions
      if (result.author._id.toString() !== req.userData._id.toString()) {
        return res.status(403).json({
          error: "Unauthorized: You don't have permission to delete this post",
        });
      }

      res.json({ result });
    })
    .catch((error) => {
      console.error("Error deleting post:", error.message);
      res.status(500).json({ error: "Internal server error" });
    });
});
router.post("/create-post", protectedRoute, async (req, res) => {
  try {
    console.log(req.body);

    const { title, content, imgUrl } = req.body;

    if (!title || !content || !imgUrl) {
      return res
        .status(400)
        .json({ status: "error", error: "Mandatory fields cannot be empty" });
    }

    const { password, ...safeUserData } = req.userData;
    const postModel = new PostModel({
      title,
      content,
      imgUrl,
      author: safeUserData,
    });

    const dbPost = await postModel.save();

    res.status(201).json({ status: "success", data: dbPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

module.exports = router;
