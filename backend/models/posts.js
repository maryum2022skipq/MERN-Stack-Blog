const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a text value."],
      unique: true,
    },
    summary: {
      type: String,
      default: true,
    },
    content: {
      type: String,
      required: [true, "Please add a text value."],
    },
    titleImage: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a text value."],
      ref: "User",
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
