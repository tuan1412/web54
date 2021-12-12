
import React from 'react';

const useSyncLocalStorage = (key, defaultValue) => {
  const [state, setState] = React.useState(() => {
    const storedTasks = localStorage.getItem(key);
  
    if (!storedTasks) {
      return defaultValue
    }
  
    return JSON.parse(storedTasks)
  })
  
  React.useEffect(() => {
    console.log('chạy 2');
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}

export default useSyncLocalStorage;