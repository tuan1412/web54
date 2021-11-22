# Buổi 9
- Hiểu một số kiến thức nâng cao khi truy vấn MongoDB
- Filter, Pagination, Sort, Populate

## Filter
https://docs.mongodb.com/manual/tutorial/query-documents/

Giả sử dữ liệu mẫu như sau:
```
// Post collection
[
  {
    title: "Mặt trời",
    description: "Chói",
    likeCount: 3,
    imageUrl: "http://example.png",
    tags: ["thiên nhiên", "hành tinh", "sáng"]
    createdBy: ObjectId("61979b27d9a8a7d221213aa2")
  },
  {
    title: "Mặt trăng",
    description: "tối",
    likeCount: 10,
    imageUrl: "http://example.png",
    tags: ["thiên nhiên", "hành tinh"]
    createdBy: ObjectId("61979b27d9a8a7d221213aa2")
  },
  {
    title: "Cây cối",
    description: "Xanh",
    likeCount: 2,
    imageUrl: "http://example.png",
    tags: ["Xanh"]
    createdBy: ObjectId("61893a7d4b9eb7c6de02dae9")
  },
]
```
## Equality Condition
Điều kiện bằng
```
<field>: value
```
Tìm tất cả các post có người tạo với id 61893a7d4b9eb7c6de02dae9
```
const posts = await PostModel.find({ createdBy: "61893a7d4b9eb7c6de02dae9" })
```
`Chú ý: mongoose đã tự động convert string thành ObjectId để so sánh`

## Condition with operator
https://docs.mongodb.com/manual/reference/operator/query-comparison/
https://docs.mongodb.com/manual/reference/operator/query/regex/

### Điều kiện hơn kém, không bằng
Tìm hiểu về $lt, $gt, $ne, $lte, $gte
```
// Tìm tất cả các post có số like lớn hơn 10
const posts = await PostModel.find({ likeCount: { $gt: 10 } })
```

### Điều kiện với tập hợp
Tìm hiểu về $in, $nin
```
// Tìm tất cả các post được tạo bởi 61979b27d9a8a7d221213aa2 hoặc 61893a7d4b9eb7c6de02dae9
const posts = await PostModel.find({ createdBy: { $in: ["61979b27d9a8a7d221213aa2, "61893a7d4b9eb7c6de02dae9"] } })
```

### Lọc chuỗi với regex
Một trong những tác vụ thường gặp là tìm kiếm theo keyword
Tìm hiểu về $regex
```
// Tìm tất cả các post mà title có chữ mặt (không phân biệt chữ hoa, thường)
const posts = await PostModel.find({ title: { $regex: new RegExp('mặt', i) } })
```

### Query Embed Documents
Phù hợp với bài toán trường cần filter là trường embed các documents khác, trong đó với dữ liệu mẫu trên là mảng tags
https://docs.mongodb.com/manual/tutorial/query-embedded-documents/

```
// Tìm tất cả các post được tag "Thiên nhiên" (mảng tag có ít nhất một tag là "Thiên nhiên")
const posts = await PostModel.find({ tags: "Thiên nhiên" })
```

## Pagination
Khi dữ liệu còn ít, việc lấy tất cả dữ liệu sẽ không gặp vấn đề gì. Tuy nhiên, khi dữ liệu nhiều lên, 1000, 100000 documents việc lấy toàn bộ dữ liệu như vậy khiến câu query trở lên chậm chạp.

Mặc khác, ở client, tại một thời điểm nhất định cũng không hiển thị cũng như xử lý hết dữ liệu, mà thường sẽ hiển thị theo trang, thể hiện rõ các hành động như chuyển trang (pagination per page) hoặc cuộn xuống load thêm dữ liệu (infinite scroll)

Để xử lý được task vụ này, thông thường dữ liệu sẽ được mô tả như sau:

* Input: trang hiện tại (có thể đánh số từ 1 hoặc 0), số phần tử trên một trang
* Output: Các phần tử trên trang hiện tại, tổng số phần tử (để hiển thị số trang tối da)

Khi đó, với mongoose ta xử lý như sau
```
// Để lấy phần tử số trang hiện tại
PostModel.find().skip(offset).limit(limit)
```
Trong đó offset là phần tử bắt đầu cần lấy (MongoDB sẽ đánh phần tử từ 0), limit là số phần tử cần lấy. Do đó, giả sử page được đánh bắt đầu từ 1, số phần tử một trang là 10 thì offset được tính như sau:
```
const offset = (pageCurrent - 1) * sizeOfPage
```
Để lấy toàn bộ số phần tử, ta có hàm countDocuments
```
const total = await Post.countDocuments()
```
Ta có thể dùng Promise.all để chạy song song các thao tác bất đồng bộ trên
```
 const [posts, total] = await Promise.all([
    PostModel
      .find()
      .skip(offset)
      .limit(limit),
    PostModel.countDocuments()
  ])
```
## Sort
Dữ liệu trả về có thể được sort. Ví dụ với bài toán lấy bài post được sắp xếp theo ngày tạo giảm dần
```
const posts = await PostModel.find().sort({ createdAt: -1 });
```
Tương tự như vậy với chiều tăng dần là 1 và các field khác nếu cần sắp xếp
## Populate
Populate là cơ chế mongoose cung cấp (không phải có sẵn của MongoDB), cũng chưa chắc có trên các thư viện khác để kết nối dữ liệu giữa collection này sang collection khác
https://mongoosejs.com/docs/populate.html

Ví dụ: 
- API get posts ta cần thêm thông tin người tạo (username) thay vì chỉ có mỗi createBy là ObjectId
- API get posts ta cần thêm tags (title) thay vì có mỗi tagId
- API get posts cần list comments (title, createBy) thay vì cần gọi thêm API nữa

### Populate xuôi
Để populate được ta cần tạo ref. Ví dụ
```
const PostSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  likeCount: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true
});
```
createdBy theo ý nghĩa là userId, ref tới collection User, để populate được ta thêm trường ref với value là 'User'. 'User' này tương ứng với tên model User

Khi đó để lấy thêm thông tin user, khi chủ thể query là PostModel, ta làm như sau:
```
PostModel.find().populate({ path: 'createdBy' }),     
```

### Populate ngược
Trong ví dụ trên thì để populate thành công, thì model cần có trường ref (PostModel có trường createdBy), vậy trong trường hợp PostModel không có trường nào liên quan tới comment, thì ta có populate sang comment được không

Một số ví dụ trong doc thì thường sẽ là PostModel sẽ có thêm trường comments. Tuy nhiên như vậy, trong cơ sở dữ liệu, mỗi một document Post sẽ gánh thêm rất nhiều comments. => Ta cần có cơ chế không lưu comments vào trong post => vitrual field

```
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    ...
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'user'
    }
  },
  { 
    timestamps: true, 
    toJSON: { virtuals: true }, // option này chỉ nên define khi mà có dùng cơ hế virtual field
    toObject: { virtuals: true } // option này chỉ nên define khi mà có dùng cơ hế virtual field
  } // createdAt, updatedAt
);

PostSchema.virtual('comments', {
  ref: 'comment', // The model to use
  localField: '_id', // Find people where `localField` // modal post
  foreignField: 'postId', // post của bên model comment
})
```
Ta define là một trường comments là một trường ảo (chỉ xuất hiện khi ta thực hiện tác vụ populate), với ref là tên Model bên comment (hay là tên model ta cần ref tới), localField là tên trường bên Post là trường sẽ so sánh với foreignField (trường bên comment) để xác định được mối quan hệ

Khi đó ta có thể lấy ra list comments khi truy vấn Post mà ko cần lưu nó ở trong cơ sở dữ liệu
```
const foundPost = await PostModel.findById(postId)
    .populate('createdBy', 'email')
    .populate({
      path: 'comments',
      populate: {
        path: 'createdBy' // populate multiple level
      }
    }); // populate ngược
```

Trong ví dụ trên, từ PostModel ta có thể thực hiện nhiều lần populate, cũng như populate trường vitrual và populate multiple level