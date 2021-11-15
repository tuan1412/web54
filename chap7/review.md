# Nhóm Lê Minh Hoàng, Bùi Xuân Hiếu, Ngô Việt Tùng

Chủ đề: thương mại điện tử

2 Giao diện: admin và cho người dùng
Admin => Thêm sản phẩm => Người dùng mua => Tìm kiếm => Mua => Hoá đơn => Thanh toán => Admin hoàn thành

chuột xịn không dây
=> chuot-xin-khong-day

chuột xịn, chuot xin => chuot-xin
C1: sử dụng url, thêm số sinh ngẫu nhiên => đính id mongodb
C2: search không dấu
https://www.npmjs.com/package/slugify


Khách, Người dùng, Admin
Sản phẩm
- Tên, rat, category, ...
Giỏ hàng
Hoá đơn
Bài đánh giá
Wishlist
Mã giảm giá
Category
Sub Categories

1 user - nhiều hoá đơn
1 sản phẩm - 1 category, 
1 category - n sản phẩm một category - nhiều sản phẩm => id nằm phía product
1 sản phẩm thuộc nhiều nhóm con
1 sản phẩm có nhiều
1 sub được tag nhiều sản phẩm 
=> Mối quan hệ nhiều nhiều
=> Bảng phụ gồm 2 trường id tới
SubProduct { productId, subId }
=> find({ subId: }) => 
Sản phẩm có subs: [], Sub có products
https://docs.mongodb.com/manual/tutorial/query-embedded-documents/

Chúng ta cần xác định mối quan hệ giữa 2 đối tượng
Product - RatingPost
1 Product - Nhiều Rating Post
1 RatingPost - 1 Product
=> Có 2 câu, 1 câu 1 - 1, 1 câu 1-nhiều
=> Mối quan hệ nó sẽ là 1 nhiều
=> Chọn câu có chữ 1 - nhiều 
=> Id ref ở đâu => để phía nhiều => Rating product id

Product - Subcategory
1 Product gắn nhiều sub category
1 Subcategory gắn nhiều product
=> Có 2 câu, 2 câu 1-nhiều
=> Mối quan hệ nhiều nhiều
=> Bảng phụ (prodId, subId)

User - Profile (avatar, fullname, addr, highschool)
1 User 1 Profile
1 Profile 1 User
=> Có 2 câu, 2 câu là 1 - 1
=> Mối quan hệ nó là 1 - 1

User
role: ['']
Sản phẩm - RatingPost
RatingPost có productId
1 sản phẩm có nhiều bài vote
1 bài vote thì gắn với 1 sản phẩm

RatingPost - Sản phẩm
1 bài vote thì gắn với 1 sản phẩm
1 sản phẩm thì nhiều bài vote

Ảnh sản phẩm: Upload nhiều ảnh và có thể xóa ảnh ko phù hợp

Người dùng có thể xem lịch sử mua hàng
Follow sản phẩm, category => Realtime => socket
=> Sản phẩm hết hàng, ấn follow => khi có hàng, gửi email, bắn thông báo
Category => Thông báo có hàng
Là khách xem sản phẩm liên quan cùng category
=> recommend
1. Cùng category, brand
2. Cùng combo
3. Gợi ý dựa top tìm kiếm, top rating, top về giá
4. Dựa vào lịch sử mua hàng

Là khách có thêm giỏ hàng (local storage)
Là khách có thể list sản phẩm yêu thích

Là người dùng có thể đánh giá (một ng có thể vote nhiều lần)
(Dùng firebase => Luồng đăng kí đăng nhập như nào, đồng bộ dữ liệu hay ko, xử lý xác thực phân quyền API khác như nào)

Là người dùng có thể áp mã giảm giá
Là người dùng có thể thanh toán
Là người dùng có thể xoá giỏ hàng

{
  postId: 1,
  vote: 4
},
{
  postId: 1,
  vote: 3
}
Rating Post tách ra rồi
Fetch list => số vote trung bình
Lấy thông tin sản phẩm => Dựa vào rating post để tính toán
(trong db trường nào tính toán được thì ko lên lưu) => không phù hợp một số trường hợp nhất định

Product {
  rating: '',
  rateCount: 
}
=> CRUD Rating Post => Tính toán lại rating của Product => Get list, get detail => ra luôn được kết quả rating

Order
=> CouponId => Áp mã gì
=> totalPrice => tính luôn giá trị hoá đơn

products, coupon => giá trị hoá đơn
coupon lưu thêm trường số lượng