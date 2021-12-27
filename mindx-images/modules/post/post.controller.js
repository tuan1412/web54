const PostModel = require("./post");
const CommentModel = require("../comment/comment");

const getAllPosts = async (req, res) => {
  try {
    // const filter = {
      // createdBy: '61893a654b9eb7c6de02dae6',
      // likeCount: 2
    // }
    // const filter = {
    //   likeCount: { $ne: 2 }
    // }
    // const filter = {
    //   createdBy: { $ne: '61893a654b9eb7c6de02dae6' }
    // }
    // const filter = {
    //   title: { $nin: ['Mặt trời', 'Mặt trăng']}
    // };
    // aggregate không tự đông parse string sang objectId
    // hàm find, findOne, find... là tự động parse string có dạng ObjectId sang ObjectId để so sánh
    const { 
      keyword, 
      createdBy, 
      tag, 
      skip, 
      limit, 
      sortField, 
      sortDirection 
    } = req.query;
    // cách search không dấu
    // title => slug(title) => mat-troi (slug)
    // keyword => slug(keyword) => trời => troi
    // { slug: { $regex: new RegExp(slug(keyword))}}
    
    // chuỗi có keyword ở bất vị trí vào
    // title: { $regex: new RegExp(keyword, 'i') }
    // chuỗi có keyword ở vị trí đầu
    // title: { $regex: new RegExp(`^${keyword}`, 'i') }
    // chuỗi có keyword ở vị trí cuối
    // title: { $regex: new RegExp(`${keyword}$`, 'i') }

    const createdByFilter = createdBy ? { createdBy } : {};
    const keywordFilter = keyword ? 
      { 
        $or: [
          { title: { $regex: new RegExp(`${keyword}`, 'i') }},
          { description: { $regex: new RegExp(`${keyword}`, 'i') }}
        ]
      } : {};

    const tagFilter = tag ? { tags: tag } : {};

    const filter = {
      ...createdByFilter,
      ...keywordFilter,
      ...tagFilter
    };

    const pagination = {
      skip: skip ? Number(skip) : 0,
      limit: limit ? Number(limit): 4
    }

    const sortDirectionParams = sortDirection ? Number(sortDirection) : -1;
    const sortParams = sortField ? {
      [sortField]: sortDirectionParams
    } : {}

    // page bắt đầu từ 1
    // page = 1, skip 0, limit = pageOfSize = 4 => 0, 1, 2, 3, 
    // page = 2, skip 4, limit = 4 => 4, 5, 6, 7
    // page = 3, skip 8, limit = 4 => 8, 9, 10, 11
    // skip = (page - 1) * pageOfSize
    // limit = pageOfSize
    // đá trách nhiệm client

    // tổng số 26
    // pageOfSize là 4
    // maxPage = Math.ceil(total / pageOfSize) // làm tròn lên

    // Nhận xét: tìm posts theo current page, 
    // tìm tổng số post là 2 câu lệnh không liên quan lẫn nhau
    // có nhu cầu gọi song song
    // const posts = await 
    //   PostModel
    //     .find(filter)
    //     .skip(pagination.skip)
    //     .limit(pagination.limit);
    
    // const totalPosts = await PostModel.find(filter).countDocuments();

    // const sortDirection = sortCreatedAt ? Number(sortCreatedAt) : -1;
    
    const [posts, totalPosts] = await Promise.all([
      PostModel
        .find(filter)
        .populate('createdBy', '-password -__v') // populate xuôi
        .populate({ // populate ngược => virtual field
          path: 'comments', // Comment
          populate: {
            path: 'createdBy',
            select: 'username' // populate multi level
          }
        })
        .sort(sortParams)
        .skip(pagination.skip)
        .limit(pagination.limit),
      PostModel.find(filter).countDocuments()
    ])
    // $lookup trong mongodb
    // Promise.all(1s, 2s) => 2s
    // 1s => 2s => 3s

    res.send({
      success: 1,
      data: {
        data: posts,
        total: totalPosts
      },
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

  const comments = await CommentModel.find({ postId }).populate('createdBy');

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
