// api/auth
const router = require('express').Router();
const authController = require('./auth.controller');
const authValid = require('./auth.validation');
const validateInput = require('../../common/middlewares/validateInput');
const getUser = require('../../common/middlewares/getUser');

// đăng ký, post
// req.query
router.post(
  '/signup',
  validateInput(authValid.signupSchema, 'body'),
  authController.signUp);

router.post(
  '/login',
  validateInput(authValid.loginSchema, 'body'),
  authController.login
);

router.get(
  '/me',
  getUser,
  authController.getUserInfo,
);

module.exports = router;