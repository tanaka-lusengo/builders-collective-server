const PostModel = require("../models/postModels");
const UserModel = require("../models/userModels");

// create new post
const createNewPost = async (req, res) => {
  // destruct post fields
  const { userId, content, image } = req.body;

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
        image: image,
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
const updatePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post has been updated");
    } else {
      res.status(403).json("User can only update their own post");
    }
  } catch (err) {
    res.status(404).json("updatePost error -->", err);
  }
};

// delete post
const deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post has been deleted");
    } else {
      res.status(403).json("User can only delete their own post");
    }
  } catch (err) {
    res.status(500).json("deletePost error -->", err);
  }
};
// like/dislike post
const likePost = async (req, res) => {
  try {
    // find matching id
    const post = await PostModel.findById(req.params.id);
    // like if button is clicked
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post has been liked");
    } else {
      // dislike if button is clicked again/ already existing
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post has been disliked");
    }
  } catch (err) {
    res.status(500).json("likePost error -->", err);
  }
};

// get post
const getPost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json("getPost error -->", err);
  }
};

// get all posts
const getAllPosts = async (_req, res) => {
  try {
    const posts = await PostModel.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json("getAllPosts error -->", err);
  }
};

// get timeline posts/feed for current user and posts from who the user is following
const getTimeline = async (req, res) => {
  try {
    // find current user
    const currentUser = await UserModel.findById(req.params.userId);
    // find all posts from the current user
    const userPosts = await PostModel.find({ userId: currentUser._id });
    // find all posts from those you/current user are following. Using await inside .map wont fetch all, that's why use Promise.all
    const friendsPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return PostModel.find({ userId: friendId });
      })
    );
    // combined the posts into one array to generate feed for current user posts and user's who current follows.
    res.status(200).json(userPosts.concat(...friendsPosts));
  } catch (err) {
    res.status(500).json("getTimeline error -->", err);
  }
};

module.exports = {
  createNewPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getAllPosts,
  getTimeline,
};
