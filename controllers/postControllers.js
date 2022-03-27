const PostModel = require("../models/postModels");

// create new post
const createNewPost = async (req, res) => {
  // destruct post fields
  const { userId, content } = req.body;

  //create new post
  if (!userId || !content) {
    return res.status(400).json({
      errorMessage: "Please provide all required fields",
    });
  } else {
    try {
      const newPost = await new PostModel({
        userId: userId,
        content: content,
      });

      // save new post and respond to client console
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
      console.log("createNewPost error -->", err);
    }
  }
};

// update post
const updatePost = async (req, res) => {};

module.exports = { createNewPost, updatePost };
