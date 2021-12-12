# Function Component
- Khác với Class component
+ this.state, this.props ko có => props là tham số function(props), state của hook (useState)
+ render => return JSX
+ Ko có lifecycle

# Hook
## useState
- Quản lý state của Comp
```
const [state, setState] = useState()
```
- Chạy một lần
- Tham số đầu vào của useState
+ Giá trị (default state)
+ Function => trả giá trị (defaultState)

- Ko có merge state, set là set toàn bộ giá trị chứ không set từng key, value

`Chú ý: nên lập trình functional programing. state cũ => Không tác động trực tiếp => giữ nguyên giá trị (clone) => ra state mới`

VD: state => [{ content: 1 }], state.push({ content: 2 }); => so sánh state mới cũ => React bị chậm

Thay vì thế: [...state, { content: 1}], filter(), map
state cũ: 3 key-value state mới 4 key-value => state cũ : 4 key-value, state mới cũng vậy => build cây DOM chậm hơn

setState => render => So sánh state và state mới => Build cây DOM ảo => Build cây DOM thật

=> { ...obj }, [...arr], filter, map, reduce

## useEffect
- List dependencies => Các biến phụ thuộc

```
useEffect(() => {
  // chạy useEffect
}, [a, b]);
```
khi a hoặc b thay đổi => useEffect này
so sánh được sự thay đổi => shallow compare
1 === 1 => true
"a" === "a" => true
[] === []; false
{ a: 1} = { a: 1} = false

- Sau khi render (kể cả lần đầu tiên)
=> componentDidMount <=> useEffect(() => {}, []);
componentDidMount <=> useEffect gì ,... hay hook gì

- Hook thinking => Lắng nghe sự thay đổi của data (deps)
Data thay đổi thì chạy hàm gì => Declarative programing

Component thay đổi thì chạy hàm gì => Class Life Cycle
## useMemo
```
const x = useMemo(() => {
  return value;
}, [deps])
``` 
Deps thay đổi => tính toán lại giá trị
Deps không đổi khi ko tính toán => x lần 1 và x lần 2 (dù là ref, primitive) đều so sánh được

Hàm này chạy trước render

## useCallback
```
const func = useCallback(() => {
  return value;
}, [deps])
```
Trả giá trị là function => ghi nhớ ref của giá trị này
=> So sánh được 2 function với nhau

## useRef
Ko có deps => Ko lắng nghe data
Gán một giá trị không thay đổi qua các lần render cho đến khi mình chủ động gán lại
Ref được gán lại => sẽ ko render
Ref gắn vào DOM, để lấy ra DOM thật => Hạn chế xử lý DOM thật, hạn chế luôn document.querySelector


