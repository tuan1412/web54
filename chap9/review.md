# MongoDB và mongoose

## Filter
- So sánh bằng
```
Model.find({ field: value })
```
- and: filter với nhiều điều kiện
```
Model.find({ field1: value1, field2: value2 })
```
- Operation
$ne: { field: { $ne: value } } // không bằng
$gt: { field: { $gt: value } } // lớn hơn
$lt, $lte, $gte
=> Ecom: Nghiệp vụ tìm kiếm khoảng giá 1_000_000 - 2_000_000
ProductModel, price
products.find({ price : { $gte :  1000000, $lte : 2000000}});

$in: [] // trong tập hợp
=> Nghiệp vụ tìm kiếm trong nhiều category: Bàn phím, chuột

$nin: [] // không trong tập hợp
$regex:
- Tìm kiếm các document có title chứa từ laptop
db.products.find( { document: { $regex: /Laptop$/ } } )
// Laptop 123 => ko match
// bán laptop 123
// Hàng Laptop => match
{title: { $regex:/laptop/i} }

// Toàn bộ bài post theo tag a
{
  tags: ['ab', 'a']
}
// { tags: 'a' }
// { tags: { $all: ['ab', 'a'] }} => query bằng trong array documments

# Sort
sort({ filed: 1, -1 })

Bài post => trang chủ cần sort theo thời gian tạo giảm dần
Post.find({}).sort({ createdAt: -1 })
=> Trello => Task theo column, order
Task.find({ column: 'TODO'}).sort({ order: 1 })
Product.find({}).sort({ price: -1 })

# Pagination
Product => page 1, page 2,
Post => Cuộn chuột => page 1, page 2

Input: skip, limit || (page, pageOfSize) => skip (page - 1) * pageOfSize
Output: số phần tử của trang cần lấy, total => Tổng số phần tử (moreData: true | fasle)
=> maxOfPage (total, pageOfSize) = Math.ceil(total / pageOfSize)

find().skip().limit()

# Populate
Liên kết dữ liệu giữa các collection với nhau
Post => cần email của createdBy

B1: tạo field có ref
B2: query => populate

PostModel.find() => PostModel phải có field là ref thì mới populate được
=> Populate xuôi

Le Minh Hoang Hiếu Viet Tùng => Ecom 
Hùng Dương Chu Ngọc Bình => Social (IG)
Minh Đức Lê Viết Hoangf  Quang Vinh => trello
Hoàng Hà, Đạt, Hoàng => sos map
Chử Thuỷ => booking
Vương Q Thịnh => trạng thi cử
Chính, Mạnh Hiếu, NG Khánh => social => học tập





