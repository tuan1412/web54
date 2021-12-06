import React from 'react';
import clsx from 'clsx';
import Button from '../../component/Button';

function TaskList({ tasks, handleDeleteTask }) {
  const clsList = clsx({
    'border': tasks.length > 0,
    'divide-y divide-gray-100 mt-8': true
  })

  console.log('render task list');

  return (
    <ul className={clsList}>
        {tasks.map((task, idx) => {
          return (
            <li className="p-2 flex" key={idx}>
              <div className="mr-2 inline-flex items-center flex-grow">
                {task.content}
              </div>
              <Button            
                label="Delete"     
                onClick={() => handleDeleteTask(idx)}
                variant="danger"
              />
            </li>
          )
        })}
      </ul>
  )
}

export default TaskList;