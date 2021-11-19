# Buổi 8
- Validate with Joi

## Tại sao cần validate
Lập trình bao gồm 3 thành phần input - process - output. Input mà không đúng sẽ dẫn tới chương trình phát sinh bug.
=> Do vậy cần kiểm tra dữ liệu đầu vào cẩn thận

`Câu hỏi: phía client form dữ liệu đã validate rồi thì phía server cần validate lại không?`

Câu trả lời là có và cần phải có. 

Việc validate bằng JS để gọi API chỉ có ý nghĩa về mặt giao diện và với người dùng thông thường. Chưa cần đến hacker, một dev có thể bypass code JS một cách dễ dàng qua việc chèn thêm code vào file hoặc đơn giản là gọi API qua postman

## Giới thiệu về Joi
Validate đơn giản ta có thể dùng các biểu thức rẽ nhánh như đã làm ở bài trước.
```
const { username, password } = req.body;

if (!username) {
  throw new HttpError('username không được để trống', 422);
}
if (password && password.length < 6) {
  throw new HttpError('password cần ít nhất 6 kí tự', 422); // promise reject => nhảy xuống catch
}
```

Code như vậy dài dòng và khó đọc, khả năng tái sử dụng kém. Để tập trung hơn vào xử lý nghiệp vụ, ta nên đơn giản hoá việc validate này gọn nhất có thể
=> Có rất nhiều thư viện làm việc đó, trong đó có [Joi](https://joi.dev/api/?v=17.4.2)

Để sử dụng, ta cần cài đặt vào project
```
npm i joi
```
Để validate, ta sẽ khai báo một schema tương ứng. Ví dụ đoạn xử lý phía trên sẽ là
```
const loginSchema = Joi.object({ 
  username: Joi.string().required(),
  password: Joi.string().min(6).required()
}); 
const result = loginSchema.validate(req.body); 
const { value, error } = result; 
const valid = error == null; 
```
Nếu vi phạm schema thì error sẽ có giá trị, nếu không thì null

## Validation middleware
Để code gọn gàng và tái sử dụng, ta có thể viết chỗ xử lý validate vào middleware

```
// auth.validation.js
const signUpSchema = Joi.object({ 
  username: Joi.string().required(),
  password: Joi.string().min(6).required()
});
module.exports = { signUpSchema }

// validateInput.js
const validateInput = (schema, property) => { 
  return (req, res, next) => { 
  const { error } = schema.validate(req[property]); 
  const valid = error == null; 
  
  if (valid) { 
    next(); 
  } else { 
    const { details } = error; 
    const message = details.map(i => i.message).join(',');
 
    console.log("error", message);
    throw new HttpError(message, 422)
  } 
}}

// auth.router.js
app.post('/signup', validateInput(signUpSchema, 'body'), authController.signup)
```