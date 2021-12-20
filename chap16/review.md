Router - react router dom v6

# Tại sao?
Rõ ràng trang web hầu hết cần điều hướng qua nhiều đường dẫn

Web: client - server
Server routing: /url thay đổi => gọi lên server để trả về một file html (js, css)

Client routing: lần đầu tiên gọi lên server rồi => html, những lần điều hướng tiếp theo ko gọi lên server nữa. Bản chất dùng JS để thay đổi đường dẫn, thay đổi giao diện (window.history)

Single page app => Client routing (index.html)

`Chú ý: ko phải cứ React thì sẽ dùng client routing. Cụ thể: NextJS làm server rendering mà vẫn dùng React, server routing`

# Thư viện
react router dom => v6
Hầu hết các project hiện h thì là v5

# Khai báo
Khai báo rằng trang web chúng ta sử dụng những đường dẫn gì và tương ứng với các đường dẫn ấy thì chúng ta cần hiển thị giao diện gì

```
 <Routes>
    <Route path="/" element={<PostList />} />
    <Route path="/posts/:postId" element={<PostDetail />} /> // posts/123, posts/abc

    <Route element={<PrivatePage />}>
      <Route path="/posts/create" element={<CreatePost />} />
    </Route>

    <Route element={<GuestPage />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  
    <Route path="*" element={<div>404 Page</div>} />
  </Routes>
```
Layout Route, chú ý Outlet là component nằm giữa để chỉ element render khi nằm giữa Layout route

# Navigating
Thẻ Link:
Link của react router dom chứ ko dùng thẻ a. Ví dụ a mặc định gọi lên server. Khi đó chúng ta load lại trang => mất công gọi lên server rồi

Link client routing, window.history => đổi đường dẫn
```
<Link to="/" />
```

Navigate function
Tạo thành công bài post, chuyển sang trang list (tự động truyển trang)
useNavigate
```
const navigate = useNavigate();

function() {
  navigate('/home');
}
```
Component Navigate => render component thì sẽ tự động chuyển trang

Data access
Đường dẫn nó vẫn chứa thông tin cần thiết => params, query string, đường dẫn

window.location => lấy ra đường dẫn

useParams();
useLocation();
useSearchParams();

# Xác thực và phân quyền trên client
- Định danh (token) => localstorage
- API get user /auth/me => verify token, lấy thông tin

=> Trước khi render giao diện chính => định danh đc user => sau render giao diện

Phần quyền trên route => Outlet
Phân quyền trên componet => Chỗ lấy user (qua context), render phụ thuộc nghiệp vụ
