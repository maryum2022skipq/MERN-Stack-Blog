const express = require("express");
const router = express.Router();

const { getCategories, postCategories } = require("../controllers/categoryController");

router.route("/")
    .get(getCategories)
    .post(postCategories);

module.exports = router;