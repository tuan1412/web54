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
  tags: [{
    type: mongoose.Types.ObjectId,
  }],
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // comments: [
  //   { type: mongoose.Types.ObjectId, ref: 'Comment' }
  // ]
}, {
  timestamps: true,
  toJSON: { virtuals: true }, // option này chỉ nên define khi mà có dùng cơ hế virtual field
  toObject: { virtuals: true } // option này chỉ nên define khi mà có dùng cơ hế virtual field
});

PostSchema.virtual('comments', {
  ref: 'Comment', // The model to use
  localField: '_id', // Find people where `localField` // modal post
  foreignField: 'postId', // post của bên model comment
})

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
