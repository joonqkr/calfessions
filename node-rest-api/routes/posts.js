const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

// CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  // this ^ is in reference to the postId
  try {
    const post = await Post.findById(req.params.id); // the Post and User models are a means by which to access the document collections
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated");
    } else {
      res.status(403).json("No permissions");
    }
  } catch (err) {
    console.log(err);
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  // this ^ is in reference to the postId
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted");
    } else {
      res.status(403).json("No permissions");
    }
  } catch (err) {
    console.log(err);
  }
});

// LIKE/UNLIKE POST
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if already liked by curr user and either like or unlike
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post unliked");
    }
  } catch (err) {
    console.log(err);
  }
});

// GENERATE POSTS BY CHOSEN TAGS
router.get("/timeline/tags", async (req, res) => {
  try {
    const tagsArray = req.query.tags;

    // All posts with the tags
    const tagPosts = await Post.find( {tags: {$all: tagsArray}});
    
    res.status(200).json(tagPosts);

  } catch (err) {
    console.log(err);
  }
});

// GENERATE FEED OF ALL POSTS EVER MADE
router.get("/timeline", async (req, res) => {
  try {
    // Post.find(match key value as param)
    const userPosts = await Post.find({});
    res.status(200).json(userPosts); // all posts together (user + friends)
  } catch (err) {
    console.log(err);
  }
});

// GET ALL OF ONE USER'S LIKED POSTS
router.get("/likes/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ likes: user._id.toString() });
    console.log(user._id);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
});

// GET ALL OF ONE USER'S POST
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
});

// GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
