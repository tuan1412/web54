# Buổi 5
- Cài đặt mongodb cloud
- Sử dụng biến môi trường
- API đăng ký, đăng nhập
- Review lại mối quan hệ giữa các thực thể

## MongoDB Atlas
MongoDB hoạt động theo cơ chế client - server, client cần biết địa chỉ của server để truy cập tới

Để cuối khoá deploy thành trang web chạy thật trên heroku thì heroku cần truy cập tới server MongoDB => Không thể dùng local db được => Cần một server public

Có thể sử dụng 500MB miễn phí trên MongoDB https://www.mongodb.com/try

## Biến môi trường
Project trong thực tế chạy trên nhiều môi trường khác nhau, ít nhất là gồm local (phục vụ việc lập trình) và production.

Cụ thể hơn, ta ví dụ như sau:
- Ở local, chạy trên port 8080, kết nối tới server Mongodb local 
- Ở production, chạy trên port 80, kết nối tới server Mongodb Atlas

=> Do đó trong code không thể hard code các biến như port, mongodb uri mà cần có cơ chế linh động => Biến môi trường

Quản lý biến môi trường qua file .env
```
npm i dotenv

\\ index.js
require('dotenv').config()

app.list(process.env.PORT)
```
`Lưu ý file .env không được push lên các nền tảng quản lý mã nguồn mở như github, thay vào đó có để push file .env.example để hướng dẫn`

## API đăng kí, đăng nhập
Bản chất đăng kí, đăng nhập thì vẫn là quản lý đối tượng User (với ít nhất 2 trường username), tuy nhiên nếu chỉ như vậy thì gặp vấn đề là ai nắm quyền truy cập DB người đó sẽ biết được hết password của người dùng (hacker hack được là tèo :D)

=> Cần có cơ chế mã hoá password của User
=> Cơ chế hash password (băm password thành chuỗi có độ dài cố định và không thể dịch nguợc lại)

Để làm được điều này, sử dụng thư viện [bcryptjs](https://www.npmjs.com/package/bcryptjs)

```
npm install bcryptjs
// Hash password
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("B4c0/\/", salt);

// Compare password
bcrypt.compareSync("B4c0/\/", hash); // true
bcrypt.compareSync("not_bacon", hash);
```

## Review lại mối quan hệ giữa các thực thể và cách thiết kế CSDL
### Quan hệ 1 - n (một - nhiều)
Quạn hệ này gặp nhiều nhất.

Ví dụ: 
- 1 user có thể tạo nhiều bài post
- 1 bài post có thể có nhiều comment

Để thiết kế csdl thì có 2 cách:

C1: Embedded Documents
User có trường posts bao gồm toàn bộ bài post của user. 

Cách này chỉ hay dùng nếu trường embeded có số lượng không quá lớn. Ví dụ như địa chỉ nhà của Users thì có thể dùng addresses

Trong trường hợp posts thì không nên vì posts có thể tăng lên rất nhiều

C2: Document References

Bên bài Post có trường createdBy trỏ tới id của User, tương tự như thế Comment có trường postId trỏ tới id của Post 
`Trong mối quan hệ 1 - n, bên n sẽ là bên chứa ref`

### Quan hệ n - m (nhiều - nhiều)
Ví dụ bài viết h sẽ được thêm tag, tag được tạo thoải mái từ user, cần nghiệp vụ hiển thị bài viết có bao nhiêu tag cũng như tìm bài viết theo tag
Khi đó ta có thể diễn giải như sau: một bài post chứa nhiều tag và mỗi tag có thể nằm trong nhiều bài post

Với c1: embed documents thì Post cần có mảng tagIds và Tag cần có trường postIds

Với c2: (hay dùng), sẽ thêm collection để quản lý mối liên hệ nhiều, collection này gồm 2 trường ref với 2 đối tượng.

Ví dụ: TagPost gồm { tagId, postId }

### Quan hệ 1 - 1 (một - một)
Đơn giản và ít gặp, thường dùng khi muốn tách một document có schema quá to. Ví dụ profile của User

Khi này ta có thể để Id Ref ở một trong hai hoặc cả hai trên schema

Ngược lại
user - post
1 user có thể tạo nhiều bài post
1 post có thể được tạo bởi 1 user

post - comment: 1 - n
1 post chứa nhiều comment
1 comment nằm trong 1 post

PostSchema
comments: [CommentModel] => populate của mongoose

Create Comment => Push vào mảng
Xoá Comment => Tìm phần tử trong mảng xoá đi

CommentSchema: tạo doc ở đây, push doc vào PostSchema

Comment => Id => ref đến Post

Post - Tag
1 post có thể thêm được nhiều tag
1 tag có thể nằm trong nhiều post
=> Quan hệ nhiều nhiều
C1: Post
tags [tag1, tag2, tag3]
Tag
posts: [post1, post2, post3, ]

C2: PostTag
{
  tagId: => ref Tag
  postId: => ref Post
}
// tìm bài post theo tag. PostTag => find theo tagId => list PostId => tìm được list Post

Quan hệ 1 - 1
1 User có 1 Profile (fullname, avatar, hobby)
1 profile thì thuộc user

// c1: (fullname, avatar, hobby => UserModel
// c2 ProfileModel userId ref User
      User có profileId ref tới Profile