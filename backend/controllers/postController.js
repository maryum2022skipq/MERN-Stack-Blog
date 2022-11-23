const expressHandler = require("express-async-handler");

const Post = require("../models/posts");

//@desc get goals
//@route GET api/goals
//@access PRIVATE
const getPosts = expressHandler(async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

//@desc post goals
//@route POST api/goals
//@access PRIVATE
const createPosts = expressHandler(async (req, res) => {
  if (!req.body.title || !req.body.content || !req.body.username) {
    res.status(400);
    throw new Error("Please fill the required fields.");
  }

  const post = await Post.create({
    title: req.body.title,
    summary: req.body.summary ? req.body.summary : "",
    content: req.body.content,
    titleImage: req.body.titleImage ? req.body.titleImage : "",
    username: req.body.username,
    categories: req.body.categories ? req.body.categories : [],
  });

  res.status(200).json(post);
});

//@desc update goals
//@route PUT api/goals/:id
//@access PRIVATE
const updatePosts = expressHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new Error("Post not Found.");
  }
  const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatePost);
});

//@desc delete goals
//@route DELETE api/goals/:id
//@access PRIVATE
const deletePosts = expressHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new Error("Post not Found.");
  }
  await Post.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPosts,
  createPosts,
  updatePosts,
  deletePosts,
};
