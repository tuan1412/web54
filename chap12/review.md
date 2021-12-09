# State Props
- Dữ liệu để quản lý hiện thị giao diện
- Declarative programing => Tell **what** => Máy tính xử lý phần **how** cho chúng ta

Props do cha truyền xuống con, con nhận được props đó và không có quyền xử lý props (read only)

State do chính component chứa state quản lý, sẽ có hàm để thay đổi state => this.setState => Không được modify trực tiếp.

Props, State là biến JS => truyền đủ thể loại kiểu dữ liệu JS

Ví dụ về bài tập về nhà
- Hiển thị list tag: tags Array
- Hiển thị tag nào active => cần một biến để check được nó có active hay ko
- Dựa vào yêu cầu có thể chọn dc nhiều tag => kiểu dữ liệu mà thể hiện sự nhiều => Lựa chọn array (Object với nhiều key)
Lợi ích:
+ Check active tag: currentTags.includes() => O(n)
+ Check active tag: mapCurrentTag => mapCurrentTag[tag] => O(1)

=> Chọn được cái state và props để quản lý dc giao diện

# Class component
- class ... extends React.Component
- Life cycle
+ constructors
=> Khai báo state => this.state = {  }
chạy một lần khi component khởi tạo (JS sinh ra các đối tượng chứ chưa mount (gắn) vào giao diện)

+render
=> Render React Component chuyển từ DOM ảo sang DOM thật (JSX => DOM thật)
tags: [] => render this.state.tags.map() => error

+ componentDidMount
giao diện đã được mount
Fetch Data => Gọi API lên server
add event listener => resize, keyup (document)
setTimer
một lần sau render

+ componentDidUpdate
Chạy mỗi lần sau khi component re-render (state thay đổi, props thay đổi, component cha re-render)
Thường kiểm tra sự khác biêt giữa state cũ, props cũ với state mới và props mới rồi setState
=> Kiểm tra (if else khéo)

# Một số khái niệm liên quan
- render
return JSX => return một component
return (
  <div>
    ....
  </div>
)
=> Fragment

- list rendering

array.map() => mảng JSX => mảng JSX cần key ko trùng (phân biệt các key)

- conditional rendering
+ Code render if else return
+ true && <Component />
+ bool ? <ComponentA /> : <ComponentB>

- lift state up
+ React: cha giao tiếp với con => props down
+ Component con giao tiếp với cha (con muốn đổi state thằng cha) => function props (function này có logic sửa state) => con gọi props function =>  thay đổi state thằng cha
+ lift state một cách hợp lý