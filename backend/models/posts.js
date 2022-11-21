const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    summary: {
      type: String,
      default: true,
    },
    content: {
      type: String,
      required: true,
    },
    titleImage: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps: ture }
);

module.exports = mongoose.model("Post", postSchema);
