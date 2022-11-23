const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    profileBackground: {
      type: true,
      default: "",
    },
    socialInstagram: {
      type: true,
      default: "",
    },
    socialGithub: {
      type: true,
      default: "",
    },
    socialFacebook: {
      type: true,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
