const expressHandler = require("express-async-handler");

//@desc get goals
//@route GET api/goals
//@access PRIVATE
const getPosts = expressHandler(async (req, res) => {
  res.status(200).json({ message: "get posts" });
});

//@desc post goals
//@route POST api/goals
//@access PRIVATE
const createPosts = expressHandler(async (req, res) => {
  if (!req.body.title || !req.body.content || !req.body.username) {
    res.status(400);
    throw new Error("Please fill the required fields.");
  }
  res.status(200).json({ message: "create post" });
  console.log(req.body);
});

//@desc update goals
//@route PUT api/goals/:id
//@access PRIVATE
const updatePosts = expressHandler(async (req, res) => {
  res.status(200).json({ message: `update post ${req.params.id}` });
});

//@desc delete goals
//@route DELETE api/goals/:id
//@access PRIVATE
const deletePosts = expressHandler(async (req, res) => {
  res.status(200).json({ message: `delete post ${req.params.id}` });
});

module.exports = {
  getPosts,
  createPosts,
  updatePosts,
  deletePosts,
};
