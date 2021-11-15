const tokenProvider = require('../tokenProvider');
const UserModel = require('../../modules/auth/user');
const HttpError = require('../httpError');

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new HttpError('Not have token', 401);
  }
  const identityData = tokenProvider.verify(token);

  if (!identityData.userId) {
    throw new HttpError('Invalid token', 401);
  }

  const existedUser = await UserModel.findById(identityData.userId);

  if (!existedUser) {
    throw new HttpError('Not found user', 401);
  }

  req.user = existedUser;
  next();
};

module.exports = isAuth;
