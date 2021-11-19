// status 2xx client thành công
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  // chỗ này gửi email, gửi telegram
  res.status(status).send({
    success: 0,
    data: null,
    message: err.message || 'Something went wrong',
  });
}

module.exports = errorHandler;