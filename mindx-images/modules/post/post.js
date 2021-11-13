const mongoose = require('mongoose');
// dùng mysql
// thò cái hàm find() => controller k phải đổi

const PostSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  likeCount: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true
  },
}, {
  timestamps: true
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
