// Xử lý nghiệp vụ
const CommentModel = require('./comment');

const getAllComments = async (req, res) => {
  try {
    const comments = await 
      CommentModel.find()
        .populate({ path: 'postId', select: 'title' })
        .populate('createdBy', 'username');

    res.send({
      success: 1,
      data: comments
    })
  } catch (err) {
    res
      .status(400)
      .send({
        success: 0,
        data: null,
        message: err.message || 'Something went wrong'
      })
  }
}

const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const { user, ioEvent, io } = req;

    const comment = await CommentModel.create({
      postId,
      content,
      createdBy: user._id,
    });

    const cloneComment = JSON.parse(JSON.stringify(comment))

    const newComment = {
      ...cloneComment,
      content: comment.content,
      createdBy: {
        _id: user._id,
        username: user.username,
      }
    }

    // io.in(`room-post-${postId}`).emit('new-comment', newComment);
    global.io.in(`room-post-${postId}`).emit('new-comment', newComment);
    // eventEmitter.EventEmitter
    // ioEvent.emit('new-comment', { postId, newComment });

    res.send({
      success: 1,
      data: newComment
    })
  } catch (err) {
    res
      .status(400)
      .send({
        success: 0,
        data: null,
        message: err.message || 'Something went wrong'
      })
  }
}

module.exports = {
  getAllComments,
  createComment
}