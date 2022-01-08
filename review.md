# Web Full Stack

## Web
- Là một mảng nghề nghiệp trong lĩnh vực lập trình
- Web là một mảng rất là bền vững
- Web App => Web có khả năng tương tác mạnh

## Fullstack
- Client - Server
Client => Chính là máy tính người dùng
Server => Một hoặc nhiều máy tính đặt tại chỗ cố định

- Lập trình Fullstack => Sử dụng code để thực thi chương trình ở phía Client (Frontend) và phía Server (Backend)

Lập trình => Tạo ra chương trình => Máy tính đọc chương trình đấy => Chạy

Môi trường thực thi:
- Client: Trình duyệt (Chrome, Firefox, Edge, ...) (Bộ biên (thông) dịch JS, HTML, CSS) thực thi JS, HTML, CSS
- Server: tuỳ ngôn ngữ sẽ có bộ biên (thông) dịch khác nhau (môi trường). JS có NodeJS, Java (JVM), ...

Mặc dù Code có khả năng nằm ở một máy tính => 2 project sẽ chạy ở môi trường thực thi khác nhau => Môi trường phân tán (Client - Server kết nối qua giao thức mạng)

`Hiểu được môi trường chạy ở đâu rất là quan trọng`

- Client
Trình duyệt hiện này chỉ hiểu được HTML, CSS, JS

WebApp => Sử dụng JS rất là nhiều => Ko chỉ đơn thuần là HTML, CSS

Project Frontend hiện đại sẽ phức tạp => Gồm các tool chains
+ Module management => Webpack
+ Code Transform => Babel(JS)

=> Sử dụng các framework và các template có sẵn => Dựng project

Chú ý: phần tích hợp các ngôn ngữ, thư viện vào project của mình => Có config được ko? Tool có support được ko
VD: talwindcss, scss, less, antd design, ...

React (Vue, Angular) => Framework JS hiện đại

Tư tưởng Declarative => Hiển thị giao diện dựa vào state

Lập trình muốn từ A đổi thành B => Quy định A là gì (state là gì X), B state là gì Y

=> Quy định state X, State Y thì máy tính (framework) sẽ hỗ trợ việc đổi như thế nào

React
=> State, Props => Phục vụ declarative

Component => Dùng tái sử dụng và dễ bảo trì code
+ Class Component
+ Functional Component => Quan trọng
+ Hooks => Quản lý state, props => Xử lý logic 

=> Suy nghĩ theo kiểu Hook => Dependency => Dữ liệu thay đổi thì ta nên làm gì 

>< Component thay đổi thì nên làm gì

+ liftstate up, xử lý form (controller and uncontroller), router, redux, antd, ....

Câu hỏi: nên học gì tiếp theo => Nếu đi theo Frontend (react developer)

+ Nắm chắc HTML, CSS, JS
CSS: Unit, Position, Document Flow, Varibale, ...
JS: Clousure, Promise, Scope, Các kiểu dữ liệu JS, DOM trong Document (sự kiện, ...)
+ Các tool đấy là gì, config như nào, lợi ích, tìm hiểu các tool khác
+ Tìm hiểu kĩ lại state, props, chia state thế nào là hợp lý
+ Tìm hiểu kĩ về hook, custom hook
+ Tìm hiểu hệ sinh thái xoay quanh React
State Lib: redux, react-query, ...
Router: react router, NextJS
UILib: Antd, MaterialUI
...
+ Code các component (chia như nào, props ra sao,..) dễ tái sử dụng
+ React pattern (HOC, render props, custom hook)

=> Luyện tập, cập nhật qua blog, newsletter, code mẫu (project, ..)






