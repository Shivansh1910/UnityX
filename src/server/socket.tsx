import React, { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
}

export const SocketProvider = (props) => {
  const socket = useMemo(() => io("http://localhost:8000"), [])

  return (
    <SocketContext.Provider value={{ socket } as any}>
      {props.children}
    </SocketContext.Provider>
  )
}