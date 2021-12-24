# Chap 18
- Sử dụng Antd Design Component
- Giới thiệu các thư viện phổ biến

# Cách sử dụng thư viện
Lợi ích của việc sử dụng thư viện là giúp lập trình viên nhanh chóng giải quyết các vấn đề gặp phải nhờ các giải pháp có sẵn. Các thư viện mã nguồn mở phổ biến đã được cộng đồng phát triển, đóng góp và bảo trì nên có chất lượng tốt, giúp code clean và ít bug hơn.

Tuy nhiên, không phải lúc nào cũng ngay lập tức tìm kiếm thư viện mà cần phải suy nghĩ xem
- Vấn đề có khó không, có dễ phát sinh bug không, có đủ thời gian giải quyết không
- Thư viện đó có phổ biến, tin cậy không, cộng đồng support tốt không
- Thư viện đó có dễ dàng tích hợp không (doc cụ thể, các API phù hợp nghiệp vụ, dễ cài đặt vào dự án), bản thân và team có phải học thêm nhiều khái niệm không
- Có đánh đổi gì không (thư viện có nặng không, load thêm nhiều không, cách xử lý có giảm performant chỗ nào không)

`Với bất kì thư viện nào cũng đều có doc và các example. Developer hãy làm quen với việc đọc doc và nghiền ngẫm ví dụ thường xuyên để tích hợp và sử dụng một cách thuần thục nhất`

# Antd Design
React nổi tiếng nhờ khả năng tái sử dụng UI Component và Antd Design là một trong những bộ UI Component phổ biến nhất. https://ant.design/docs/react/introduce

Ưu điểm:
- Bộ component support siêu đầy đủ, đi từ A-Z không thiếu cái nào
- Giao diện hiện đại, đẹp, dễ nhìn

Nhược điểm
- Phong cách design phù hợp với trang quản trị hơn trang cho người dùng cuối
- Custom lại giao diện khó hơn các thư viện khác (thường phải sử dụng nhiều selector để đè CSS khá cực)
- Sử dụng Less nên đôi khi khó sử dụng và tích hợp vào các toolchains hoặc framework React (đặc biệt với NextJS)

Cách sử dụng
- Đọc doc, đọc example =))
- Chọn component giống hoặc gần giống với giao diện của mình
- Custom theo nghiệp vụ nhờ thay đổi các props sao cho phù hợp

# Môt số thư viện phổ biến và nổi tiếng
https://github.com/enaqx/awesome-react

https://github.com/brillout/awesome-react-components