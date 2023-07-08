const Post = require("../model/post");

exports.createPost = async (req, res) => {
  try {
    const post = await new Post(req.body);
    post.save();

    return res.status(200).json("Post saved successfully");
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAllPosts = async (req, res) => {
  let category = req.query.category;
  let posts;
  try {
    if (category) {
      posts = await Post.find({ categories: category });
    } else {
      posts = await Post.find({});
    }

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ msg: "Post not found" });
    }

    await Post.findByIdAndUpdate(req.params.id, { $set: req.body });

    res.status(200).json("post updated successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ msg: "Post not found" });
    }

    await Post.findByIdAndDelete(post._id)
  } catch (error) {
    res.status(500).json(error);
  }
};
