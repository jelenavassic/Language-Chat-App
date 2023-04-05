import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { useState, useEffect } from "react";
     const so = io();


    const socket = so.connect("http://localhost:5000");
const Chat = () => {


    const localUser = JSON.parse(localStorage.getItem("user"));
  // const user = localUser.result;
  const localId = localUser.user_id;
  const id = localUser.user_id;
    function generatePrivateChatRoomId(id1, id2) {
        return parseInt(id1) + parseInt(id2);
      }
    
      const privateChatRoomId = generatePrivateChatRoomId(id, localId);
      const [messages, setMessages] = useState([]);
      const [message, setMessage] = useState("");
    
    
    function sendMessage() {
      socket.emit("private chat message", privateChatRoomId, { message: message });
      setMessage("");
      setMessages((prevMessages) => [    ...prevMessages,    { message: message, sentByCurrentUser: true },  ]);
    }
     
    
    useEffect(() => {
      socket.emit("join private chat", privateChatRoomId);
    
      socket.on("private chat message", (message) => {
        const newMessage = { message: message.message, sentByCurrentUser: false };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    
    
        return () => {
          socket.off("join private chat");
          socket.off("private chat message");
        };
      }, [privateChatRoomId])
    return(
<div></div>
    )
}
export default Chat

