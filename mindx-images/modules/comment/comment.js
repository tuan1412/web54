// Model kết nối cơ sở dữ liệu
const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  postId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  createdBy: String
}, {
  timestamp: true
});

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = CommentModel;