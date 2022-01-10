import React from 'react';

export default function useAsync(defaultState) {
  const [state, setState] = React.useState({
    status: 'idle',
    data: typeof defaultData === 'function' ? defaultState() : defaultState,
  });
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const run = React.useCallback(async (promise) => {
    try {
      setState((preState) => ({ ...preState, status: 'loading' }));
      const data = await promise;

      if (isMounted.current) {
        setState({
          status: 'done',
          data,
        });
      }
    } catch {
      if (isMounted.current) {
        setState((preState) => ({ ...preState, status: 'done' }));
      }
    }
  }, []);

  const setData = (newData) => {
    setState((preState) => {
      return {
        ...preState,
        data: typeof newData === 'function' ? newData(preState.data) : newData,
      };
    });
  };

  const isLoading = state.status === 'loading';
  const isIdle = state.status === 'idle';
  const isError = state.status === 'error';
  const isDone = state.status === 'done';

  return {
    isDone,
    isLoading,
    isIdle,
    isError,
    status: state.status,
    data: state.data,
    setData,
    run,
  };
}
