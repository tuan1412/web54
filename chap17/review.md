# Redux là gì
Thư viện để quản lý state trong React (react-redux, redux toolkit)

Quan trọng nhất là giải quyết vấn đề gì?
- Lift state up: có những state cần share cho nhiều component khác nhau => Lift state đến global => Tất cả component đều có quyền truy cập state này
- Props drilling: thay vì truyền props từng cấp một => Component nào mà cần sử dụng thì component lắng nghe state đó
VD: A => B => C => D thay vì truyền props A xuống đến D, D gắn vào store của redux là xong
D = connect(D)

# Tư tưởng
- State là một object và nằm ở một store duy nhất (Single Source Of Truth)
- UI Component không được chỉnh sửa trực tiếp state của store => dispatch action => store sẽ nhận action này => truyền vào các hàm reducer => Chỉnh sửa state
- Reducer pure function (state, action)=> ko làm ảnh hưởng state cũ => return state mới

# Implement
Ngày xưa, chỉ cần react-redux cũng đủ rồi
=> action.js, reducer.js, connect, ...

=> Redux toolkit

Slice là một khái niệm redux toolkit
- Một phần state
- Reducer tập hợp nhiều function xử lý state
- Quản lý actions

Store => Tập hợp reducer (slice)

Provider => Bọc ngoài cùng toàn bộ component
Component lắng nghe state
```
useSelector

const color = useSelector(storeState => storeState.color.activeColor)
```

Component cần dispatch action
```
useDispatch

const dispatch = useDispatch();

<!-- dispatch({ type: 'color/setActiveColor', payload: 'red' }) -->
dispatch(action) => dispatch(setActiveColor('red'))
```
Action chia ra làm 2 loại
- Sync => set màu => đồng bộ
- Async => Promise => load câu danh ngôn => createAsyncThunk


