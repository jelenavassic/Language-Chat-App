import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../api";
import { NavLink } from "react-router-dom";

const MyChats = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.user_id;
  const [conversationIdsArr, setconversationIdsArr] = useState([]);
  const [allMessages, setMessages] = useState([]);
  const getMessages = async () => {
    try {
      await axios
        .get(`${API_URL}/message/${id}`)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMessages();
  }, [id]);

  useEffect(() => {
    if (allMessages.length > 0) {
      const conversationIds = [
        ...new Set(allMessages.map((msg) => msg.conversationId)),
      ];
      const messagesByConversation = conversationIds.map((id) => {
        const messages = allMessages.filter((msg) => msg.conversationId === id);
        return { conversationId: id, messages };
      });

      setconversationIdsArr(messagesByConversation);
    }
  }, [allMessages]);

 
  return (
    <div className="sideb">
      {conversationIdsArr <= 0 ? (
        <div id="emptyDiv">Your active chats will be visible here.</div>
      ) : (
        <ul id="side">
          {conversationIdsArr?.map((element) => (
            <div className="chatWith" key={element.conversationId}>
              <NavLink to={`/user/${element.messages[0].senderId}`}>
                <li>Chat with {element.messages[0].sender}</li>
              </NavLink>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
export default MyChats;
