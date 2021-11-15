# Middleware
Cơ chế rất hay dùng trong các ngôn ngữ khác

Code xử lý nằm giữa chỗ input đầu vào và main task

app.get(url, [middleware1, middleware2, ...], handler)
* Application middleware => Config một lần => Áp dụng route
app.use(express.json()) => Parse body của HTTP request => thành biến gắn trong req.body. Bản chất express.json() => function
```
function (req, res, next) {

}
```

* Route middleware => isAuth
=> Config theo từng route
```
function (req, res, next) {
  Xử lý logic phần token
}
```
- Middleware1 => midd 2 next() 
- Trong mỗi middleware trả được luôn dữ liệu về dữ liệu cho người dùng sử dụng res
- Truyền dữ liệu qua các middleware => Lợi dụng biến req
=> req[filed] = data cần truyền
isAuth => req.user = user

# Xác thực và phân quyền
Định danh được request đấy là ai gửi
HTTP là stateless => Giải quyết => Gắn thêm dữ liệu vào API phía sau API login => Gắn dữ liệu để dịnh danh

Login => Sinh token trả về client
Client lưu lại (local storage, ...)

Create post => API create post (đính kèm token vào trong header)

Server => verify => thông tin user => Định danh thành công

Xác thực hay phân quyền thì tuỳ nghiệp vụ

## Thực hành
jsonwebtoken => mã hoá định danh ({ userId })
private key => chỉ server biết => server verify token sẽ biết token đó có hợp lệ hay không => cài đặt trong biến môi trường
expired at => token không quá lâu => cài đặt trong biến môi trường

Tái sử dụng code bằng middleware => isAuth middleware
=> Lấy token từ header (req.header)
verify => findDB => req.user = user (throw error => res.status(401))

Main task sẽ xử lý logic dựa vào user này

