import React from 'react';
import { useDebounce } from 'use-debounce';
// import { usePosition } from 'use-position';

import Button from '../Button';
import useSyncLocalStorage from '../../hooks/useSyncLocalStorage'

function FormAddTask({ handleAddTask }) {
  const [text, setText] = useSyncLocalStorage('todo:text', '');
  const [debounceValue] = useDebounce(text, 1000);

  React.useEffect(() => {
    // fetch(debounceValue)
  }, [debounceValue])

  console.log('1', text, debounceValue)

  React.useEffect(() => {
    inputRef.current.focus();
  },[]);

  const inputRef = React.useRef(null);

  const onAddTask = () => {
    if (text) {
      setText('');
      handleAddTask(text);
    }
  }

  const handleChangeInput = e => {
    const value = e.target.value;
    setText(value);
  }

  return (
    <div className="mt-3 flex">
    <div className="flex-grow">
      <input
        ref={inputRef}
        className="w-full h-full px-2 border rounded"
        value={text}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            onAddTask();
          }
        }}
        onChange={handleChangeInput}
        placeholder="Enter new task" 
      />
    </div>
    <Button onClick={onAddTask} label="Add" />
  </div>
  )
}

export default FormAddTask;