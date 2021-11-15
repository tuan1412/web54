const bcrypt = require('bcryptjs');
const UserModel = require('./user');
const tokenProvider = require('../../common/tokenProvider');
const HttpError = require('../../common/httpError');

const signUp = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    throw new HttpError('username không được để trống', 422);
  }
  if (password && password.length < 6) {
    throw new HttpError('password cần ít nhất 6 kí tự', 422); // promise reject => nhảy xuống catch
  }

  const existedUser = await UserModel.findOne({ username });

  if (existedUser) {
    throw new HttpError('đăng ký thất bại', 400);
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await UserModel.create({ username, password: hashPassword });

  const token = tokenProvider.sign(newUser._id);

  res.send({
    success: 1,
    data: {
      _id: newUser._id,
      username: newUser.username,
      token,
    },
  });
};

const login = async (req, res) => {
    const { username, password } = req.body;
    // validate user input
    const existedUser = await UserModel.findOne({ username });

    if (!existedUser) {
      throw new HttpError('đăng nhập thất bại (không có username)', 400);
    }

    const hastPassword = existedUser.password;

    const matchedPassword = await bcrypt.compare(password, hastPassword);

    if (!matchedPassword) {
      throw new HttpError('đăng nhập thất bại (password ko đúng)', 400);
    }
    // Là ai, được làm gì

    const token = tokenProvider.sign(existedUser._id);

    res.send({
      success: 1,
      data: {
        _id: existedUser._id,
        username: existedUser.username,
        token,
      },
    });
  
};

module.exports = {
  signUp,
  login,
};
