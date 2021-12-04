# Làm quen React
- Tại sao chúng ta nên học React để làm frontend
- Tư tưởng React cũng như các framework frontend hiện đại (Vue, Angular)
- React chỉ là một thư viện UI

# Phân biệt được lập trình frontend xưa và nay
## Xưa
- Thao tác trực tiếp vào DOM thật
- Load file script ở <script> => sắp xếp khéo đúng thứ tự => Module management tool
- Dùng JS, CSS => Viết code đủ các phiên bản => Transform code tool

## Nay
- Frontend => Xoay quanh config được tool đó => Đã có tool, template, framework được config sẵn cho mình rồi => Mình cần lấy ra và sử dụng
- React: create-react-app => Tool dc FB phát triển => Tạo ra các React Web App => Single page app
- Webpack
+ module management: import css, import scss, import svg, import jsx, js, .... => bundle.js => script
+ es module (import export default) >< commonjs (require module.exports)
+ minify bundle => file nhỏ lại (quan trọng nhất) => load nhanh hơn (đổi tên biến, xoá khoảng trắng), phần nào đó che dấu code
=> Trình duyệt nó chỉ hiểu được HTML, CSS, JS

- Babel
+ Transform JS, sử dụng ES6 => parse về code phù hợp cho một trình duyệt nhất định
=> Ngoài ra tool khác => parse SCSS => CSS, parse Less => CSS, ...

- Webpack dev server
+ localhost:3000 => index.html (public)
+ Hot reload => thay đổi code => tự động load lại

- Single page app
=> localhost:3000/ localhost3000/login => index.html
=> Client rendering => Hoàn toàn dùng JS => tạo ra các DOM => tạo ra các giao diện

- Phân biệt Server rendering 
=> giao diện phần lớn đã có trong html (server sinh ra các file html => trả về người dùng)

