require('dotenv').config();
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const { createServer } = require("http");
const { Server } = require("socket.io");
const PostRouter = require('./modules/post');
const CommentRouter = require('./modules/comment');
const AuthRouter = require('./modules/auth');
const UploadRouter = require('./modules/upload');
const EventEmitter = require('events');
const HttpError = require('./common/httpError');

const ioEvent = new EventEmitter();

const log = require('./common/middlewares/log');
const errorHandler = require('./common/errorHandler');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)

  console.log('Mongodb connected');
  const app = express();

  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    }
  });

  // Mẹo
  global.io = io;

  // cách này vẫn work nhé mọi người, do lúc đó chưa retart xong
  ioEvent.on('new-comment', data => {
    const { postId, newComment } = data;
    console.log('vao day')
    io.in(`room-post-${postId}`).emit('new-comment', newComment);
  })
  

  io.on("connection", (socket) => {
    console.log('socket connected', socket.id);

    socket.emit('sayHi', { message: 'Server say hihi' })

    socket.on('hi', (data) => {
      console.log('hi', data);

      socket.emit('hi', { message: 'Server say hi' })
    })
    // socket.emit('hi2', { message: 'Server say hi' })
    socket.on('join-post', postId => {
      socket.join(`room-post-${postId}`);
    })

    socket.on('disconnect', () => {
      console.log('socket disconnected', socket.id);
    });
  });

  app.use(cors())
  app.use(log)
  app.use((req, res, next) => {
    req.io = io;
    req.ioEvent = ioEvent;
    next();
  });
  app.use(express.json());

  app.use(express.static('public'));

  app.use('/uploads', express.static('uploads'));

  app.use('/api/posts', PostRouter);
  app.use('/api/comments', CommentRouter);
  app.use('/api/auth', AuthRouter);
  app.use('/api/upload', UploadRouter);

  // app.get('/', (req, res) => res.sendFile(a.html))
  // app.get('/posts', (req, res) => res.sendFile(b.html))

  app.use('*', (req, res) => {
    throw new HttpError('Not found api', 404);
  })

  app.use(errorHandler);

  httpServer.listen(process.env.PORT || 9000, (err) => {
    if (err) throw err;

    console.log('Server connected');
  });
}

main();
