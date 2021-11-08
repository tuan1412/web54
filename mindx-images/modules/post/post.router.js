const router = require('express').Router(); // khởi tạo object
const postController = require('./post.controller');

// Router tập hợp các routing có tiền tố /api/posts
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPost);
router.post('/', postController.createPost);
router.put('/:postId', postController.updatePost);
router.delete('/:postId', postController.deletePost);
router.put('/:postId/like', postController.incLikePost);
router.put('/:postId/comments', postController.getCommentByPost);

module.exports = router;