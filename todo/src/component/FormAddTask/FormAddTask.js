import React from 'react';
import Button from '../Button';

function FormAddTask({ handleAddTask }) {
  const [text, setText] = React.useState('');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.focus();
  },[]);

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