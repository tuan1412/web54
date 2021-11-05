const mongoose = require('mongoose');
const express = require('express');

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
  createdBy: String,
}, {
  timestamps: true
});

const CommentSchema = new mongoose.Schema({
  content: String,
  createdBy: String,
  // postId tương đương với _id của Post
  postId: mongoose.Types.ObjectId,
}, {
  timestamps: true
});

const PostModel = mongoose.model('Post', PostSchema)

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mindx-demo')
  
  console.log('Mongodb connected');
  const app = express();

  app.use(express.json());

  app.get('/api/posts', async (req, res) => {
    try {
      const posts = await PostModel.find();
      res.send({
        success: 1,
        data: posts
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
  })

  app.get('/api/posts/:postId', async (req, res) => {
    try {
      const { postId } = req.params;

      const foundPost = await PostModel.findById(postId);
      // const foundPost = await PostModel.findOne({ _id: postId });
      // const foundPost = await PostModel.findOne({ likeCount: 1 });

      res.send({
        success: 1,
        data: foundPost
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
  })

  app.post('/api/posts', async (req, res) => {
    try {
      const newPostData = req.body;

      const newPost = await PostModel.create(newPostData);

      res.send({
        success: 1,
        data: newPost
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
  })

  app.put('/api/posts/:postId', async (req, res) => {
    try {
      const { postId } = req.params;

      const updatePostData = req.body;

      // option { new: true } để kết quả trả về là document đã được update
      // const updatedPost = 
      //   await PostModel
      //     .findByIdAndUpdate(postId, updatePostData, { new: true });
      
      const updatedPost = 
        await PostModel
          .findOneAndUpdate({ _id: postId }, updatePostData, { new: true });

      res.send({
        success: 1,
        data: updatedPost
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
  })

  app.put('/api/posts/:postId/like', (req, res) => {
    // yêu cầu: người dùng gửi lên like => tăng like count trong document
    // $inc trong mongodb
  })

  app.delete('/api/posts/:postId', async (req, res) => {
    try {
      const { postId } = req.params;

      const deletedPost = await PostModel.findByIdAndDelete(postId);
      res.send({
        success: 1,
        data: deletedPost
      })
    } catch (err) {
      res.status(400).send({ success: 0, data: null, message: err.message || 'Some thing went wrong'})
    }
  })

  app.get('/api/posts/:postId/comments', async (req, res) => {

  })


  app.listen(9000, (err) => {
    if (err) throw err;

    console.log('Server connected');
  });
}

main();
// User Story

// mindx images
// Là S, có thể V, để làm gì
// Là khách, có thể xem toàn bộ bài post
// Là khách có thể đăng kí
// Là khách có thể đăng nhập

// Là người dùng có thể like
// là người dùng có thể tạo bài post
// ...