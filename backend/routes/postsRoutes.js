const express = require("express");
const postRouter = express.Router();

const {
  getPosts,
  getPost,
  createPosts,
  updatePosts,
  deletePosts,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

postRouter.route("/")
  .get(getPosts)
  .post(protect, createPosts);

postRouter.route("/:id")
  .get(getPost)
  .put(protect, updatePosts)
  .delete(protect, deletePosts);



module.exports = postRouter;
