const PostModel = require("./post");
const CommentModel = require("../comment/comment");

const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.send({
      success: 1,
      data: posts,
    });
  } catch (err) {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    });
  }
};

const getPost = async (req, res) => {
  const { postId } = req.params;

  const foundPost = await PostModel.findById(postId);

  res.send({
    success: 1,
    data: foundPost,
  });
};

const createPost = async (req, res) => {
  const { user } = req;
  console.log("create post", user);

  const newPostData = req.body;
  const newPost = await PostModel.create({
    ...newPostData,
    createdBy: user._id,
  });

  res.send({
    success: 1,
    data: newPost,
  });
};

const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { user } = req;

  const updatePostData = req.body;

  const updatedPost = await PostModel.findOneAndUpdate(
    { _id: postId, createdBy: user._id },
    updatePostData,
    { new: true }
  );

  if (!updatedPost) {
    throw new Error("Not found post");
  }

  res.send({
    success: 1,
    data: updatedPost,
  });
};

const deletePost = async (req, res) => {
  const { postId } = req.params;

  const deletedPost = await PostModel.findOneAndDelete(
    { _id: postId },
    updatePostData,
    { new: true }
  );

  res.send({
    success: 1,
    data: deletedPost,
  });
};

const incLikePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { likeCount: 1 } },
      { new: true }
    );

    res.send({
      success: 1,
      data: updatedPost,
    });
  } catch (err) {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    });
  }
};

const getCommentByPost = async (req, res) => {
  const { postId } = req.params;

  const comments = await CommentModel.find({ postId });

  res.send({
    success: 1,
    data: comments,
  });
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  incLikePost,
  getCommentByPost,
};
