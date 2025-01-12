import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

// Create a context to hold the socket instance.
// Default value is set to null.
const SocketContext = createContext(null);

// Custom hook to access the socket instance from the context.
// This makes it easier to use the socket in any component.
export const useSocket = () => {
  // Retrieve the socket instance from the context.
  const socket = useContext(SocketContext);
  return socket;
};

//functional component to provide the socket connection to the entire app.
export const SocketProvider = (props) => {
  // Initialize the socket connection using `io` from socket.io-client.
  // `useMemo` ensures the connection is only created once.
  const socket = useMemo(() => io("localhost:8000"), []);

  // Return a context provider to pass the socket instance down the component tree.
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
