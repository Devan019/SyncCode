import React, { useEffect, useState, createContext } from "react";

export const SocketIo = createContext(null);

const SocketContext = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [userEmail, setuserEmail] = useState("");

  const [obj, setobj] = useState(JSON.parse(localStorage.getItem("combinedFormData")));

  useState(()=>{
    console.log(obj)
    setuserEmail(obj.email)
  } ,[obj])

  useEffect(() => {
    if (!userEmail) return; // Ensure email is provided

    const ws = new WebSocket(`ws://localhost:8080/ws/code?email=${encodeURIComponent(userEmail)}`);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      console.log("Message received:", event.data);
      if (event.data.startsWith("socket_id:")) {
        setSocketId(event.data.split(":")[1]); // Extract socket ID
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [userEmail]);

  return (
    <SocketIo.Provider value={{ socket, socketId }}>
      {children}
    </SocketIo.Provider>
  );
};

export default SocketContext;
