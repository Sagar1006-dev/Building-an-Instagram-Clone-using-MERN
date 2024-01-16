const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    default: "No img available",
  },
  author: {
    type: ObjectId,
    ref: "UserModel",
  },
});

mongoose.model("PostModel", postSchema);
