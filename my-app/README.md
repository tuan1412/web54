# Cách xưa
- http://localhost:3000 => index.html
- http://localhost:3000/login => login.html
....

Mỗi một route trả về một file html => hầu như giao diện đã được define sẵn trong file HTML rồi

# Single page app
- http://localhost:3000 => index.html => div#root
- http://localhost:3000/login => index.html => div#root

Toàn bộ giao diện => Javascript render ra (createElement, appendDOM, ...)

Client rendering => Giao diện mọi người JS render ra
Server rendering => Server sẽ tổng hợp thành html => Trả về người dùng