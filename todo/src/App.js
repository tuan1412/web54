import React from 'react';

import FormAddTask from './component/FormAddTask/FormAddTask';
import TaskList from './component/TaskList';

import useSyncLocalStorage from './hooks/useSyncLocalStorage';

function App() {
  const [tasks, setTasks] = useSyncLocalStorage('todo:tasks', [])
  
  const handleAddTask = (text) => {
    setTasks(preTasks => [...preTasks, { content: text, isCompleted: false }]);
  }

  const handleDeleteTask = React.useCallback(
    (deleteIdx) => {
      setTasks(preTasks => preTasks.filter((_, currentIdx) => currentIdx !== deleteIdx));
    }, 
  [setTasks]);

  const title = React.useMemo(() => {
    const unCompletedTasks = tasks.filter(task => !task.isCompleted)
    return unCompletedTasks.length > 0 ? `There is ${unCompletedTasks.length} tasks to done` : 'All tasks is done';
  }, [tasks]);
  
  return (
    <div className="container mx-auto">
      <FormAddTask handleAddTask={handleAddTask} />
      <div className="my-2">{title}</div>
      <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} />
    </div>
  );
}

export default App;

// component => CollapseContext collapsed, setCollapsed = true, false
// header
// content

