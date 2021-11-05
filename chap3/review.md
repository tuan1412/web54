# Framework web server của NodeJS
Express: 
- dễ học dễ làm hơn rất nhiều lib http thuần của NodeJS
- phổ biến

Khởi tạo được 1 web app chạy trên một port trên máy tính, lắng nghe các request (http) từ client (trình duyệt) tới máy tính đó và trả về kết quả tương ứng

http://localhost:9000, nếu 2 máy cùng một mạng wifi, thì thay localhost thành địa chỉ IP của máy mọi người

Input - Process - Output
Đối với web Frontend gửi yêu cầu qua HTTP protocol và nhận về kết quả (HTML, CSS, JS, Image, JSON)

Input
HTTP packet (thư => headers đầu thư địa chỉ, phương thức, gửi từ đâu, body => nội dung thư)

- Yêu cầu người dùng gửi lên
- đường dẫn http://localhost:9000, http://localhost:9000/posts, http://localhost:9000/comments
- method: get (lấy dữ liệu), post (create), put (update), delete (xoá)
- req.params (lấy từ đường dẫn)
  http://localhost:9000/:postId => http://localhost:9000/abcxyz => postId = xyz => req.params
- req.body (post, put, delete, get không có body)
  app.use(express.json()) => Đánh dấu body đấy sử dụng ngôn ngữ gì => Google dịch hiểu xem body đấy dùng ngô ngữ gì thì mới dịch được
  Người dùng gửi lên nội dung gì => req.body => Chính là cái object đấy
- req.query(lấy từ đường dẫn)
http://localhost:9000/posts?q=web => req.query = { q: web }

Process
CRUD một đối tượng trong danh sách => trả về kết quả

Output
res.sendFile() => http:/localhost:9000 => hiển thị giao diện web

res.send, res.json => json cho client=> client sẽ parse json này thành biến JS => thích tuỳ biến giao diện như nào cũng được

Postman
Test API, gõ đường dẫn => trình duyệt gọi method GET, nếu muốn gọi method khác => cần dùng JS sử dụng fetch, $.ajax, axios
=> Ko làm thế
=> GUI để test => Postman => Gõ đường dẫn, thêm body, đổi method, ấn send => kiểm tra kết quả