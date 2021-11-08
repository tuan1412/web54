# Làm quen CSDL (MongoDB)
- Tại sao dùng CSDL thay cho file
+ Tổ chức các đối tượng
User, Post, Comment
+ Tối ưu được các truy vấn
CRUD => Hệ quản trị CSDL đã tối ưu các hàm này rồi
- Khi nào dùng CSDL
+ Giữ lại dữ liệu giữa các HTTP request => CSDL
+ Sử dụng chung dữ liệu giữa các client
VD: vào bằng điện thoại và web cần trả dữ liệu đồng nhất => Có một chỗ chung để lưu => CSDL
Phân biệt khoá 1, 2: làm chức năng giỏ hàng => local storage => Chỉ trên 1 client mới thấy được dữ liệu giỏ hàng thôi

- MongoDB
+ NoSQL, truy vấn nhanh
+ Đi với JS rất là tiện
+ Document tương đương Object, Collection tương đương với mảng, Database tương đương tập hợp các collection (1 Project - 1 DB)
+ Client - Server: thường client ở trong project chính là server của browser: 
Browser => Server (Express) => MongoDB
+ Server Express giao tiếp với server MongoDB qua giao thức mạng (TCP)

- JS giao tiếp với MongoDB
+ MongoDB thì với mỗi một ngôn ngữ đều có một thư viện chuẩn để giao tiếp
+ Sử dụng thư viện mongoose
+ Connect
+ Tạo schema, model tương ứng schema
+ CRUD dựa vào model
