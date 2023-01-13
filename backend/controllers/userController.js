const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const User = require("../models/users");
const Post = require("../models/posts");

//@desc register new user
//@route POST api/users
//@access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.status(400);
    throw new Error("Please fill the required fields.");
  }
  const email = req.body.email;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    profilePicture: req.body.profilePicture ? req.body.profilePicture : "",
    profileBackground: req.body.profileBackground
      ? req.body.profileBackground
      : "",
    socialInstagram: req.body.socialInstagram ? req.body.socialInstagram : "",
    socialGithub: req.body.socialGithub ? req.body.socialGithub : "",
    socialFacebook: req.body.socialFacebook ? req.body.socialFacebook : "",
    posts: [],
  });

  if (user) {
    res.status(201).json({
      username: user.username,
      emial: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

//@desc authenticate a user
//@route POST api/users/login
//@access PUBLIC
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      username: user.username,
      emial: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user credentials.");
  }
});

//@desc get user details
//@route GET api/users/me
//@access PRIVATE
const getMe = asyncHandler(async (req, res) => {
  const {
    _id,
    username,
    email,
    profilePicture,
    profileBackground,
    socialInstagram,
    socialGithub,
    socialFacebook,
  } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    username,
    email,
    profilePicture,
    profileBackground,
    socialInstagram,
    socialGithub,
    socialFacebook,
  });
});

//@desc get any user details
//@route GET api/users/:user
//@access PRIVATE
const getUserDetails = asyncHandler(async (req, res) => {
  const {
    _id,
    username,
    email,
    profilePicture,
    profileBackground,
    socialInstagram,
    socialGithub,
    socialFacebook,
  } = await User.findById(req.params.id);

  res.status(200).json({
    id: _id,
    username,
    email,
    profilePicture,
    profileBackground,
    socialInstagram,
    socialGithub,
    socialFacebook,
  });
});

//@desc update user details
//@route PUT api/users/me
//@access PRIVATE
const updateUserDetails = asyncHandler(async (req, res) => {
  try {
    if (req.body.password) {
      //hash password
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500);
    throw new Error("User details were not updated.");
  }
});

//@desc delete user details
//@route DELETE api/users/me/
//@access PRIVATE
const deleteUserDetails = asyncHandler(async (req, res) => {
  const userID = req.user.id;
  try {
    //delete all posts by user
    await Post.deleteMany({ user: userID });

    //delete user
    await User.findByIdAndDelete(userID);
    res.status(200).json({ message: `User ${userID} has been deleted.` });
  } catch (error) {
    res.status(500);
    throw new Error("Unable to delete user.");
  }
});

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUserDetails,
  deleteUserDetails,
  getUserDetails,
};
