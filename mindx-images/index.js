require('dotenv').config();
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const PostRouter = require('./modules/post');
const CommentRouter = require('./modules/comment');
const AuthRouter = require('./modules/auth');
const UploadRouter = require('./modules/upload');

const log = require('./common/middlewares/log');
const errorHandler = require('./common/errorHandler');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)

  console.log('Mongodb connected');
  const app = express();

  app.use(cors())
  app.use(log)
  app.use(express.json());

  app.use(express.static('public'));

  app.use('/uploads', express.static('uploads'));

  app.use('/api/posts', PostRouter);
  app.use('/api/comments', CommentRouter);
  app.use('/api/auth', AuthRouter);
  app.use('/api/upload', UploadRouter);

  app.use(errorHandler);

  app.listen(process.env.PORT || 9000, (err) => {
    if (err) throw err;

    console.log('Server connected');
  });
}

main();
