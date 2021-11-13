// tập hợp nghiệp vụ
const PostModel = require('./post');
const CommentModel = require('../comment/comment');
const UserModel = require('../auth/user');

const jwt = require('jsonwebtoken');

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
    const { user }  = req;
    console.log('create post', user)

    const newPostData = req.body; 
    const newPost = await PostModel.create({
      ...newPostData,
      createdBy: user._id
    });

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
    const { user }  = req;
    // thằng user này là thằng gửi yêu cầu update

    // const existedPost = await PostModel.findById(postId);

    // if (!existedPost) {
    //   throw new Error('Not found post');
    // }

    // if (String(existedPost.createdBy) !== String(user._id)) {
    //   throw new Error('Not have permission');

    // }


    // username, password để đăng nhập => Check người dùng hay ko
    // chỉ người tạo bài post đó mới có quyền update bài post
    const updatePostData = req.body;

    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: postId, createdBy: user._id },
      updatePostData,
      { new: true }
    );

    if (!updatedPost) {
      throw new Error('Not found post');
    }

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
    // const token = req.headers.authorization;
    // if (!token) {
    //   throw new Error('Bạn không có xoá tạo bài post');
    // }

    // const identityData = jwt.verify(token, 'web54');

    // const userId = identityData.userId;

    // // xác thực
    // const existedUser = await UserModel.findOne({ _id: userId });
    // console.log(identityData, existedUser);

    // // findDB => tìm ra thông tin user
    // // phân quyền
    // if (!existedUser && existedUser.role !== 'admin') {
    //   throw new Error('Bạn không có xoá tạo bài post');
    // }

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
