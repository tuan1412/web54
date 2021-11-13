# Project structure
Chia project theo chiều dọc, mỗi một chiều có nhiều layer

Router: tập hợp các API cùng tiền tố
- post: /api/posts
- comment: /api/comments

Mỗi Router nằm trong 1 file, 1 module cụ thể, router trách nhiệm chọn controller tương ứng để xử lý nghiệp vụ

Controller xử lý logic
- Input đầu vào: req.params, req.body, req.query, req.headers
- Xử lý logic xử lý với db qua model, tương tác bên thứ 3

Model có nhiệm vụ define schema, tạo model tương ứng => Model có trách nhiệm kết nối và thao tác với DB


# API đăng nhập, đăng kí
Không khác gì về quản lý user thông thường.

Password không được lưu plain text mà phải được mã hoá bằng một hàm băm => mã hoá một chiều

Sử dụng thư viện bcriptjs => hash, compare

# Design schema
Mối quan hệ 1 - n (một nhiều)
C1: embed documents
VD: 1 Post có nhiều comment: Post có trường comments
VD: 1 User có nhiều địa chỉ: User có trường addresses
C2: ref
VD: Comment có postId trở đến Post

Mối quan hệ m - n (nhiều nhiều)
VD: 1 Post có nhiều tag, 1 Tag có thể được tag vào nhiều Post
C1: embed documents
Post có tags, Tags có posts
Nghiệp vụ hiện thị các tag được tag bài viết đó thì ok
Nghiệp vụ hiện thị số post có tag cố định thì lại khó

C2: ref
TagPost { postId: ref tới Post, tagId ref Tag}

Mối quan hệ 1 - 1 (một một)
Thông thường ném hết vào 1 schema
User có profile khá là to => Profile ra một collection riêng
Đánh id ref ở cả 2 Schema