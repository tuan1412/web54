const router = require('express').Router(); // khởi tạo object
const postController = require('./post.controller');
const postValid = require('./post.validation');
const validateInput = require('../../common/middlewares/validateInput');
const isAuth = require('../../common/middlewares/isAuth');

// ko define query
// /posts?key1=value&key2=value
router.get('/', postController.getAllPosts);
router.get('/:postId', postController.getPost);
router.post(
  '/',
  // validateInput(postValid.createPostSchema, 'body'),
  isAuth,
  postController.createPost
);
router.put(
  '/:postId',
  isAuth,
  postController.updatePost
);
router.delete('/:postId', isAuth, postController.deletePost);
router.put('/:postId/like', isAuth, postController.incLikePost);
router.get('/:postId/comments', postController.getCommentByPost);

module.exports = router;