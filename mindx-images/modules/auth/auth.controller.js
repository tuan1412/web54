const bcrypt = require('bcryptjs');
const UserModel = require('./user');
const tokenProvider = require('../../common/tokenProvider')

const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    // validate user input
    // dù client có check điều kiện hay ko thì server vẫn phải check
    if (!username) {
      throw new Error('username không được để trống');
    }
    if (password && password.length < 6) {
      throw new Error('password cần ít nhất 6 kí tự'); // promise reject => nhảy xuống catch
    }

    // username tồn tại hay chưa
    // check db tồn tại user nào có username này chưa
    const existedUser = await UserModel.findOne({ username });

    if (existedUser) {
      // ko nên trả message cụ thể là username đã tồn tại
      // lộ ra mất có username trong db
      // hacker có thể làm thử password
      throw new Error('đăng ký thất bại')
    }

    const salt = await bcrypt.genSalt(10);
    // salt là chuỗi ngẫu nhiên, tăng độ mạnh hàm mã hoá
    // nếu ko salt => mã hoá có thể giải bằng cách => băm password tương ứng và so sánh
    // nếu ko salt
    // 123456 => abcxyz
    // ngồi bằm 123456 => abcxyz
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = await UserModel.create({ username, password: hashPassword });

    const token = tokenProvider.sign(newUser._id);

    res.send({ 
      success: 1, 
      data: {
        _id: newUser._id,
        username: newUser.username,
        token
      }}
    );
  } catch (err) {
    res.status(400).send({ success: 0, data: null, message: err.message || 'Something went wrong'})
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // validate user input
    const existedUser = await UserModel.findOne({ username });
    
    if (!existedUser) {
      throw new Error('đăng nhập thất bại (không có username)')
    }

    const hastPassword = existedUser.password;

    const matchedPassword = await bcrypt.compare(password, hastPassword);

    if (!matchedPassword) {
      throw new Error('đăng nhập thất bại (password ko đúng)')
    }
    // Là ai, được làm gì

    const token = tokenProvider.sign(existedUser._id);

    res.send({ 
      success: 1, 
      data: {
        _id: existedUser._id,
        username: existedUser.username,
        token,
      }}
    );
  } catch (err) {
    res.status(400).send({ success: 0, data: null, message: err.message || 'Something went wrong'})
  }
}

module.exports = {
  signUp,
  login
}