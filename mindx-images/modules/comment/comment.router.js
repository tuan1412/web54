const router = require('express').Router();
const commentController = require('./comment.controller');
// tập hợp các api có routing là /api/comments

router.get('/', commentController.getAllComments);

module.exports = router;
