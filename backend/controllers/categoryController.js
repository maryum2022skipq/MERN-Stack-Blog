const asyncHandler = require("express-async-handler");

const Post = require("../models/posts");
const User = require("../models/users");
const Category = require("../models/categories");

//@desc get categories
//@route GET api/categories
//@access PUBLIC
const getCategories = asyncHandler(async (req, res) => {
    const cats = await Category.find();
    if (!cats) {
        res.status(400)
        throw new Error("No categories found.")
    }
    res.status(200).json(cats);
});

//@desc create categories
//@route POST api/categories
//@access PRIVATE
const postCategories = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        throw new Error("Please fill the required fields.");
    }
    const cat = await Category.create({
        name: req.body.name,
        description: req.body.description ? req.body.description : "",
    })

    res.status(200).json(cat);
})



module.exports = {
    getCategories,
    postCategories,
};
