const expressHandler = require("express-async-handler");

const Post = require("../models/posts");
const User = require("../models/users");

//@desc get posts
//@route GET api/posts
//@access PUBLIC
const getPosts = expressHandler(async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;

  try {
    let posts;

    if (username) {
      const user = await User.find({ username });
      const userId = user[0]._id;
      if (!user) {
        throw new Error(`No existing posts found of ${username}.`);
      }
      posts = await Post.find({ user: userId.toString() });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500);
    throw new Error(`Couldn't retrieve posts. Error: ${error}`);
  }
});

//@desc get one post
//@route GET api/posts/:id
//@access PUBLIC
const getPost = expressHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(400);
      throw new Error("Post doesn't exist");
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500);
    throw new Error(`Couldn't retrieve post. ${error}`);
  }
});

//@desc post posts
//@route POST api/posts
//@access PRIVATE
const createPosts = expressHandler(async (req, res) => {
  if (!req.body.title || !req.body.content) {
    res.status(400);
    throw new Error("Please fill the required fields.");
  }

  const post = await Post.create({
    title: req.body.title,
    summary: req.body.summary ? req.body.summary : "",
    content: req.body.content,
    titleImage: req.body.titleImage ? req.body.titleImage : "",
    user: req.user.id,
    categories: req.body.categories ? req.body.categories : [],
    likes: [],
    comments: [],
  });

  res.status(200).json(post);
});

//@desc update posts
//@route PUT api/posts/:id
//@access PRIVATE
const updatePosts = expressHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  //check if post exists
  if (!post) {
    throw new Error("Post not Found.");
  }
  //check if user exists
  if (!req.user) {
    res.status(401);
    throw new Error("User not Found.");
  }
  //check if post author is the same as the user logged in
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized.");
  }
  //update post
  const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatePost);
});

//@desc delete posts
//@route DELETE api/posts/:id
//@access PRIVATE
const deletePosts = expressHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  //check if post exists
  if (!post) {
    throw new Error("Post not Found.");
  }
  //check if user exists
  if (!req.user) {
    res.status(401);
    throw new Error("User not Found.");
  }
  //check if post author is the same as the user logged in
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized.");
  }
  //delete post
  await Post.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPosts,
  getPost,
  createPosts,
  updatePosts,
  deletePosts,
};
