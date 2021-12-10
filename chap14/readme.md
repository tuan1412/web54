# Buổi 14
- Tìm hiểu về custom hook
- Luyện tập hook trong project thực tế

# Vấn đề về tái sử dụng logic

Quay lại project todo list buổi trước, ta có thể thấy ta dùng 2 hook useState và useEffect để đồng bộ state của danh sách task với localstorage như sau
```
const [tasks, setTasks] = React.useState(() => {
  const storedTasks = localStorage.getItem('tasks');

  if (!storedTasks) {
    return []
  }

  return JSON.parse(storedTasks)
})

React.useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);
```

Bài toán đặt ra là ta cũng muốn sử dụng cơ chế đồng bộ state với localstorage này cho các state khác như state text của ô input thì làm như nào? 

Cách đơn giản nhất là ta copy hết đoạn code trên, thay tasks bằng text, thay key 'tasks' bằng key 'text'. Tất nhiên nó works. Tuy vậy, nếu có nhiều chỗ sử dụng hơn thì code sẽ phìng to và ta sẽ rất mất công bảo trì cần đấy chỗ.

React sinh ra hook ngoài việc giúp tư tưởng lập trình declarative thêm rõ ràng hơn thì còn giúp tái sử dụng logic tốt hơn nhờ viết custom hook.

# Custom hook
https://reactjs.org/docs/hooks-custom.html

Để tái sử dụng logic trên, ta có thể viết một hook useLocalStorage như sau:
```
const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = React.useState(() => {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return defaultValue;

    return JSON.parse(defaultValue);
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState]
}

// App.js
const [tasks, setTasks] = useLocalStorage('todo:tasks', []);

// FormAddTask.js
const [text, setText] = useLocalStorage('todo:text', '');
```

Nhìn vào trên ta có các nhận xét như sau:
- Custom hook bản chất là một function và ta sẽ chạy function đó trong component. Để tái sử dụng nhiều nơi, ta sẽ truyền tham số vào function đó để phù hợp từng chỗ.
- Custom hook bản chất là tập hợp các hook có sẵn của React cung cấp => Cần phải hiểu kĩ các hook này

Ngoài các bộ component React có sẵn (tái sử dụng về mặt UI), ta cũng có rất nhiều custom hook có sẵn (tái sử dụng về mặt logic). Tham khảo thêm tại https://github.com/rehooks/awesome-react-hooks

`Tìm hiểu trước khi có hook, React tái sử dụng logic theo cơ chế nào? Từ khoá: Higher Order Component, renderProps`

# Một số kiến thức khác

## Props children
Ngoài các props do component cha truyền vào, React Component luôn có một props có sẵn là children.

Hiểu một cách đơn giản, children chính là toàn bộ những gì nằm giữa thẻ đóng và thẻ mở của Component

Ví dụ
```
<Button>Test</Button> // props.children = Test
<Input /> // props.children = null
<App>
  <Input />
  <Button>Test</Button>
</App> 
// props.children là cả Input và Button
```

Ứng dụng của children giúp React Developer có thể viết các component dùng chung với độ thẩm mĩ cao hơn (nhìn giống như thẻ HTML thông thường)

=> Áp dụng vào project: Viết Component Layout

## Environment Variables
Tương tự như backend, lập trình frontend ta cũng cần có biến môi trường để không fix các biến config trong code, phục vụ việc dev và deploy ở nhiều môi trường khác nhau. Bình thường webpack sẽ cần config plugin để đọc file .env, còn create-react-app đã có sẵn cơ chế đó.

`Lưu ý, .env trong create-react-app cần có prefix: REACT_APP_`

Áp dụng vào config axios gửi request
```
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? token : '';
  return config;
}, err => {
  return Promise.reject(err);
})

instance.interceptors.response.use(res => {
  if (res && res.data) {
    return res.data;
  }
  return res;
}, err => {
  return Promise.reject(err);
})

export default instance;
```

Code ở trên có sẵn phần token để sử dụng về sau.

## Context và useContext
React hoạt động theo cơ chế props-down. Nghĩa là dữ liệu sẽ đi từ trên xuống dưới, đi từ component ông => cha => con => ...
Trong nhiều trường hợp, có những dữ liệu dùng chung ở rất nhiều nơi như thông tin về theme, thông tin về user thì việc truyền props như vậy rất mệt mỏi. 
Ví dụ cây cấp component là A => B => C => D

Component D cần dùng dữ liệu x của component A, B và C thì không cần dùng. Theo cách thông thường thì ta vẫn cần truyền props xuống B xuống C rồi mới xuống D. Ta cần cơ chế để hạn chế điều này.

=> Context https://reactjs.org/docs/context.html, https://reactjs.org/docs/hooks-reference.html#usecontext
```
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

Áp dụng vào project, AuthContext (chứa thông tin của user để bất kì chỗ nào cũng có thể lấy)