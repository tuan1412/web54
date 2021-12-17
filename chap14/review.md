# Buổi 14
- React
+ UI Component (props) => tái sử dụng UI
+ Tái sử dụng UI là nhờ truyền các props khác nhau ở các chỗ khác nhau
VD: Chỗ A cần button màu đỏ => props variant = danger, Chỗ B cần button màu xanh => props variant = primary

- Custom hook
+ Tái sử dụng logic
+ Nó là một function (đầu vào là parameters)
+ Tập hợp các hook (useState, useEffect, useCallback, useMemo, useContext, useRef)

VD useLocalStorage => đồng bộ (sync) vào localstorage
Chỗ A cần handle tasks, key là todo:tasks, value default là []
Chỗ B cần handle text, key là todo:text, value default là ''

+ Output tuỳ mục đích sử dụng, trả kết quả là mảng

- Luyện tập
+ children props đặc biệt của React => Toàn bộ các element nằm giữa thẻ đóng và mở của Component
=> Layout

+ biến môi trường
=> Code trên nhiều môi trường
Code gọi API local, deploy gọi API chỗ khác
=> Biến môi trường vào
Nhờ create-react-app, ko cần cài đặt config lib nào để đọc file env
=> Biến môi trường bắt đầu REACT_APP
=> Sử dụng axios => instance baseUrl

+ List Post
=> Hook là lắng nghe sự thay đổi của data