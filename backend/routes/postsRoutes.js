const express = require("express");
const postRouter = express.Router();
const {
  getPosts,
  createPosts,
  updatePosts,
  deletePosts,
} = require("../controllers/postController");

postRouter.route("/").get(getPosts).post(createPosts);
postRouter.route("/:id").put(updatePosts).delete(deletePosts);

module.exports = postRouter;
