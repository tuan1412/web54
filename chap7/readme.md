# Buổi 6
- Error Handling trong Express

# Tại sao cần error handling
Lập trình gồm: input -> process -> output. Dù input có sai, process có bug thì vẫn cần có output tương ứng. Output này giúp lập trình viên debug, giúp người dùng biết thao tác lỗi ở đâu, tránh một thao tác mà không có phản hồi (crash app, crash server, ... gây trải nghiệm người dùng tệ cũng như ảnh hưởng tới các ng dùng khác)
=> Cần bắt các lỗi throw ra để xử lý => Error handling

# Error handling trong Express
Trước khi học bài này, ta vẫn thường bắt lỗi ở trong hàm catch của từng controller. Cách này work nhưng có nhược điểm
- duplicate code
- tái sử dụng code kém, khi cần handle thêm như kiểu lỗi nghiêm trọng thì gửi email cho admin thì cần thêm vào nhiều chỗ

Khi đó Express đã cung cấp cơ chế tập trung lỗi tại một chỗ để xử lý https://expressjs.com/en/guide/error-handling.html
```
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

Ở main task của controller thay vì catch err và gửi luôn, ta có thể next(err) để xử lý vào hàm trên.
```
const getPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const foundPost = await PostModel.findById(postId);

    res.send({
      success: 1,
      data: foundPost,
    });
  } catch (err) {
    next(err)
  }
};
```
Ở đây, main task đóng vai trò như một middleware. Để tái sử dụng code hơn nữa ta có thể viết hàm wrapHandleError như sau
```
const wrapHandleError = (controller) => {
  return (req, res, next) => {
    controller(req, res, next).catch(next(err))
  }
}

router.post('/', isAuth, wrapHandleError(postController.createPost));

```

Hoặc sử dụng thư viện https://www.npmjs.com/package/express-async-errors (Cần hiểu bản chất là nó sẽ bắt error và ném vào next)

Để xử lý status cho error ta có thể viết thêm đối tượng HttpError extends Error có sẵn
```
class HttpError extends Error {
  status: number;

  constructor(message, status) {
    this.status = status;
  }
```
Từ đó thay vì throw error thông thương thì ta có thể throw HttpError

