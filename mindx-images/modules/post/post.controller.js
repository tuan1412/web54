// tập hợp nghiệp vụ
const PostModel = require('./post');
const CommentModel = require('../comment/comment');

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
      message: err.message || 'Something went wrong',
    });
  }
};

const getPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const foundPost = await PostModel.findById(postId);

    res.send({
      success: 1,
      data: foundPost,
    });
  } catch (err) {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || 'Something went wrong',
    });
  }
};

const createPost = async (req, res) => {
  try {
    const newPostData = req.body;

    const newPost = await PostModel.create(newPostData);

    res.send({
      success: 1,
      data: newPost,
    });
  } catch (err) {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || 'Something went wrong',
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const updatePostData = req.body;

    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: postId },
      updatePostData,
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
      message: err.message || 'Something went wrong',
    });
  }
};

const deletePost = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || 'Something went wrong',
    });
  }
};

const incLikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    // lay ra post => 3
    // Đã có client khác gọi API inc like => 4
    // +1 => +1 vào giá trị 3
    // save 4
    // xử lý tương tranh

    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { likeCount: 1 }},
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
      message: err.message || 'Something went wrong',
    });
  }
}

const getCommentByPost = async (req, res) => {
  try {
    const { postId } = req.params;
  
    const comments = await CommentModel.find({ postId });

    res.send({
      success: 1,
      data: comments,
    });
  } catch (err) {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || 'Something went wrong',
    });
  }
}

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  incLikePost,
  getCommentByPost
};
