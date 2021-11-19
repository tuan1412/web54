Luồng demo chính

Trello (quản lý công việc theo kanban)

Luồng demo chính:
Khách đăng nhập => Người dùng => Tạo bảng
=> Tạo cột => Tạo task => Kéo thả

Là người dùng tạo bảng
Là người dùng, tôi muốn tạo các column trạng thái
Là người dùng có thể kéo thả column
Là người dùng, tôi muốn thêm
/sửa
/xoá các task
Là người dùng, tôi muốn xem mô tả chi tiết khi click vào các task
Là người dùng assign task vào member
Là người dùng có thể kéo thả task
Là người dùng, tôi muốn xem task nào đã quá deadline
Là người dùng có thể comment vào task

User
- email, password
Board
- name, ownerId, background

<!-- Member-Board
userId,
boardId -->

List
name, boardId, order

Card
title
description
order
listId

Comment
taskId
createBy
content

=> Làm thêm thông báo


Luồng demo chính
Social: trang newsfeed. Người dùng tạo bài post, kết bạn, xem bài post người khác, like và comment

Là khách có thể đăng nhập
Là người dùng có thể tạo bài post (Status)
Là người dùng thay đổi profile
Là người dùng xem profile chính mình
Là người dùng thể xem trang cá nhân
Là người dùng có thể kết bạn
Là người dùng thể xem newsfeed
//

User
=> Cân nhắc tách profile
=> Embed

Post (status)
title
images: [],
likeCount

1 user -- Post
1 user được like nhiều post
1 post thì được like nhiều user
Like
userId, postId

Comments => Tạo comment vào post
CommentModel => create, PostModel => push
CommentModel => xoá, PostModel => pop

User - User
1 user có thể follow nhiều người
1 người có thể được nhiều người follow

owner: ref UserId
followers
following
=> Module follow => Module auth


Notification
A like comment B
createBy
recipients

Post
- Check đc mình like bài viết ấy chưa
- Unlike
- Like

Luồng

Khách tạo bài xin cứu trợ => Admin duyệt bài cứu trợ
Khách sẽ tìm kiếm địa điểm cần hộ trợ
=> Gọi điện đến tổng đài lấy info
Tự đến hộ trợ
=> Confirm với tổng đài
=> Bài xin cứu trợ đổi trạng thái

Khách tạo bài cho => Admin duyệt
Admin => gỡ bài


Lọc các bài viết theo các tiêu chí 
cho - nhận
sản phẩm

Chọn địa chỉ => Zoom map

Tạo bài cho
Tạo bài nhận

Khách
Bài
Admin

User {
  username, password, role: admin
}

Post {
  type: ['send', 'receive'],
  cord: [],
  dịa chỉ
  items: [
    { type: 'Gạo', count: '', group: 'Thiết yếu', unit: 'kg' }
    { type: 'Quần áo, count: ''},
    { type: 'Xe máy, count: ''}
  ]
  status: ['', '']
}

Input => Search địa chỉ (Gọi API bên map) => Click vào => placeId => gọi API bên map => toạ độ => Lưu db





