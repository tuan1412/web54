const express = require('express');
const mongoose = require('mongoose');
const PostRouter = require('./modules/post');
const CommentRouter = require('./modules/comment');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mindx-demo')
  
  console.log('Mongodb connected');
  const app = express();

  app.use(express.json());

  app.use('/api/posts', PostRouter);
  app.use('/api/comments', CommentRouter);

  // api/comments ...
  // routing
  // router: Nhóm tất cả routing cùng có prefix vào nhóm
  // app.get('/api/posts', async (req, res) => {
  //   try {
  //     const posts = await PostModel.find();
  //     res.send({
  //       success: 1,
  //       data: posts
  //     })
  //   } catch (err) {
  //     res
  //       .status(400)
  //       .send({
  //         success: 0,
  //         data: null,
  //         message: err.message || 'Something went wrong'
  //       })
  //   }
  // })

  // app.put('/api/posts/:postId/like', (req, res) => {
  //   // yêu cầu: người dùng gửi lên like => tăng like count trong document
  //   // $inc trong mongodb
  // })

  // app.delete('/api/posts/:postId', async (req, res) => {
  //   try {
  //     const { postId } = req.params;

  //     const deletedPost = await PostModel.findByIdAndDelete(postId);
  //     res.send({
  //       success: 1,
  //       data: deletedPost
  //     })
  //   } catch (err) {
  //     res.status(400).send({ success: 0, data: null, message: err.message || 'Some thing went wrong'})
  //   }
  // })

  // app.get('/api/posts/:postId/comments', async (req, res) => {

  // })


  app.listen(9000, (err) => {
    if (err) throw err;

    console.log('Server connected');
  });
}

main();
