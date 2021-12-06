import React from 'react';
import clsx from 'clsx';

function App() {
  // const [state, setState] = React.useState({
  //   status: '',
  //    quote
  //})
  /// setState({ status: 'loading'});
  const [text, setText] = React.useState('');

  const [tasks, setTasks] = React.useState(() => {
    const storedTasks = localStorage.getItem('tasks');

    if (!storedTasks) {
      return []
    }

    return JSON.parse(storedTasks)
  })

  React.useEffect(() => {
    console.log('useEffect 1');
    document.title = 'Todo React App';
    // chỉ chạy một lần thôi
  }, []);

  React.useEffect(() => {
    console.log('useEffect 2', tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  // componentDidMount() => console.log('useEffect', tasks);
  // componentDiđUpadate() => this.state.tasks !== preState.tasks  console.log('useEffect', tasks);

  React.useEffect(() => {
    console.log('useEffect 3');
  });

  // React.useEffect(() => {
  //   console.log('useEffect 1');
  //   document.title = text;
  //   // chỉ chạy một lần thôi
  //   return () => {
  //     console.log('cleanup', text);
  //   }
  // }, [text]);

  // React.useEffect(() => {
  //   function log() {
  //     console.log('vao day');
  //     console.log(document.body.clientWidth, document.body.clientHeight)
  //   }
  //   window.addEventListener('resize', log);
  //   return () => {
  //     window.removeEventListener('resize', log);
  //   }
  // }, []);

  // React.useEffect(() => {
  //   function log() {
  //     console.log('vao day');
  //     console.log(document.body.clientWidth, document.body.clientHeight)
  //   }
  //   window.addEventListener('resize', log);
  //   return () => {
  //     window.removeEventListener('resize', log);
  //   }
  // }, [tags]);
  const handleAddTask = () => {
    if (text) {
      setTasks(preTasks => [...preTasks, { content: text, isCompleted: false }]);
      setText('');
      // setState, this.setState => hàm bất đồng bộ hêt
    }
  }

  const handleDeleteTask = (deleteIdx) => {
    setTasks(preTasks => preTasks.filter((_, currentIdx) => currentIdx !== deleteIdx));
  }
  const handleChangeInput = e => {
    const value = e.target.value;
    setText(value);
  }

  const clsList = clsx({
    'border': tasks.length > 0,
    'divide-y divide-gray-100 mt-8': true
  })

  console.log('render', text);
  return (
    <div className="container mx-auto">
      <div className="mt-3 flex">
        <div className="flex-grow">
          <input 
            className="w-full h-full px-2 border rounded"
            value={text}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                handleAddTask();
              }
            }}
            onChange={handleChangeInput}
            placeholder="Enter new task" 
          />
        </div>
        <button 
          className="px-3 py-2 text-white bg-blue-500"
          onClick={handleAddTask}
        >
          Add
        </button>
      </div>
      <ul className={clsList}>
        {tasks.map((task, idx) => {
          return (
            <li className="p-2 flex" key={idx}>
              <div className="mr-2 inline-flex items-center flex-grow">
                {task.content}
              </div>
              <button
                onClick={() => handleDeleteTask(idx)}
                className="px-3 py-2 text-white bg-red-500"
              >
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
