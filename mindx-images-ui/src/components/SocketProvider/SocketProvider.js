import React from 'react';
import { io } from 'socket.io-client';

export const SocketContext = React.createContext();

function SocketProvider({ children }) {
  const socketRef = React.useRef();
  const [status, setStatus] = React.useState('idle');

  React.useEffect(() => {
    const socketClient = io(process.env.REACT_APP_SOCKET_SERVER);
    socketRef.current = socketClient;

    socketRef.current.on('connect', () => {
      setStatus('connected');
    });

    socketRef.current.on('disconnect', () => {
      setStatus('disconnected');
    });

    socketRef.current.on('reconnect', () => {
      setStatus('connected');
    });
  }, []);

  const isConnected = status === 'connected';
  const isDisconnected = status === 'disconnected';

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        socketRef: socketRef.current,
        isDisconnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  return React.useContext(SocketContext);
};

export const useListen = (event, callback) => {
  const { socketRef, isConnected } = useSocket();

  React.useEffect(() => {
    if (isConnected) {
      socketRef.on(event, callback);
      return () => {
        // memory leak
        socketRef.off(event, callback);
      };
    }
  }, [isConnected, callback, socketRef, event]);
};
export default SocketProvider;
