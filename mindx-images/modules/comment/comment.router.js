const router = require('express').Router();
const commentController = require('./comment.controller');
const isAuth = require('../../common/middlewares/isAuth');

router.get('/', commentController.getAllComments);
router.post('/', isAuth, commentController.getAllComments);

module.exports = router;
