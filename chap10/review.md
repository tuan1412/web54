# Nghiệp vụ upload file
- Client upload file
- Server lưu trữ

Client upload => http request với body là form-data >< gọi API thì http request với body là json

Server cần có cách đọc khác > <  express.json() => Multer
Có 3 cách lưu
- Lưu ở DB => Ko bh dùng
- Lưu ở disk của server api => sử dụng tạm => gọi dữ liệu ảnh => chiếm băng thông của chúng ta, backup, heroku free thì sau một khoảng thời gian sẽ xoá mất file
- Lưu ở cloud => cloud storage (firebase, cloudinary, s3, google storage)

Multer cung cấp 2 loại storage => một cái middleware
- Disk storage => cung cấp cơ chế lưu file ở disk => uploads => static uploads ra để trả file người dùng
- Memory storage => middleware upload.single => req.file (buffer, original name, minetype) => áp dụng docs của firebase upload lên => download url

# Backend
Lập trình web Backend - Frontend

Backend:
- Phía bên server (NodeJS với ExpressJS) => API
- Thao tác với CSDL (MongoDB qua một thư viện là mongoose)
- Thao tác với API bên thứ 3 (firebase)

Frontend
- Giao tiếp với server khi cần (cần lưu trữ hay quản lý dữ liệu)
=> HTTP, Websocket
- HTML, CSS, JS (Code bằng ngôn ngữ gì => parse 3 ngôn ngữ này để trình duyệt có thể hiểu được) => JS để thay đổi DOM

Client upload ảnh => loading
Client gọi lên server => loading true
Server trả kết quả => loading false => có đường link ảnh

Load ảnh xong => ảnh hiện ra luôn
C1: input file => chọn ảnh => trình duyệt đọc được cái ảnh đó rồi => base64 để hiện thị luôn cái ảnh đó

C2: setDOM => img.src = 'http://upload.png'