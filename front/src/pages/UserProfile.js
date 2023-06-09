import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../api";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import Hashids from 'hashids';
const UserProfile = () => {
  const socket = io.connect("http://localhost:5000");
  const [user, setUser] = useState({});
  const { id } = useParams();
  const localUser = JSON.parse(localStorage.getItem("user"));
  const localId = localUser.user_id;
  const localStorageFav = localStorage.getItem(`favourites${localId}`);
  const favourites = localStorageFav ? JSON.parse(localStorageFav) : [];
  const favouriteItem = favourites.filter((element) => element == id);
  const privateChatRoomId = generatePrivateChatRoomId(id, localId);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const getMessages = async () => {
    try {
      const chatMessages = await axios
        .get(`${API_URL}/messages/${privateChatRoomId}`)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(chatMessages);
    } catch (error) {
      console.log(error.message);
    }
  };

  function addToFav() {
    if (!favourites.some((elem) => elem == id)) {
      favourites.push(parseInt(id)); 
    }
    localStorage.setItem(`favourites${localId}`, JSON.stringify(favourites));
    window.location.reload(false);
  }

  function removeFav(removeId) {
    let newfavourites = favourites.filter((element) => element != removeId);
    localStorage.setItem(`favourites${localId}`, JSON.stringify(newfavourites));
    window.location.reload(false);
  }

  function generatePrivateChatRoomId(id1, id2) {
   const uniqueId= (id1*id1)+(id2*id2)
   return uniqueId
  }
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  function sendMessage() {
    if (!message.trim()) {
      return;
    }
    const data = {
      message: message,
      sender: localUser.first_name,
      senderId: localId,
      receiverId: user.user_id,
    };
  
    socket.emit("private chat message", privateChatRoomId, data);
    document.getElementById("message").value = "";
    console.log(data);
    setMessage("");
  }

  function stopTyping() {
    socket.emit("stopTyping", privateChatRoomId);
  }

  const userdata = {
    user: localUser.first_name,
  };

  function emitTyping() {
    socket.emit("typing", privateChatRoomId, userdata);
  }
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get(`${API_URL}/user/${id}`);
        setUser(user.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    
    getUser();
    getMessages();
    return () => {
      socket.off("private chat message");
    };
  }, [id]);

  useEffect(() => {
    socket.emit("join private chat", privateChatRoomId);
    socket.on("private chat message", (message) => {
      if (message !== "") {
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: message.message, sender: message.sender },
        ]);
      }
    });

    socket.on("typing", (userdata) => {
      console.log(userdata.user, localUser.first_name);
      if (userdata.user !== localUser.first_name) {
        document.getElementById(
          "feedback"
        ).innerHTML = `<i>${localUser.first_name} is typing.... </i>`;
      }
    });

    socket.on("stopTyping", () => {
      document.getElementById("feedback").innerHTML = ` `;
    });
    return () => {
      socket.off();
    };
  }, [privateChatRoomId]);

  return (
    <div id="userProfile">
      <section className="sidebar">
        <Sidebar></Sidebar>
      </section>
      <section id="userData">
        <div className="flex-row">
          <div className="profileimg">
            <img
              src={`http://localhost:5000/api/images/${id}`}
              alt={user.user_id}
            ></img>
          </div>
          <div className="flex-column">
            <div className="name">
              {user.first_name} {user.last_name}
            </div>
            <div className="city">
              {user.city}, {user.country}
            </div>
          </div>
        </div>

        <div className="flex-column language-flex">
          <div className="language">
            Native language: {user.native_language}
          </div>
          <div className="language">Practicing: {user.practicing_language}</div>
          <div id="favbtn">
            {" "}
            {favouriteItem.length > 0 ? (
              <button className="removeFav" onClick={() => removeFav(id)}>
                Remove from favourites
              </button>
            ) : (
              <button className="addFav" onClick={addToFav}>
                Add to favourites
              </button>
            )}{" "}
          </div>
        </div>
      </section>

      <section className="chat">
        <section id="chatroom">
          {messages.map((message, index) => (
            <div
              id={privateChatRoomId}
              key={index}
              className={
                message.sender.includes(localUser.first_name)
                  ? "message-outgoing"
                  : "message-incoming"
              }
            >
              <p className="messageP" key={index}>
                {message.message}
              </p>
            </div>
          ))}
          <div id="feedback"></div>
        </section>

        <section id="input_zone">
          <input
            type="text"
            id="message"
            placeholder="Enter message"
            onFocus={emitTyping}
            onBlur={stopTyping}
            onKeyDown={handleKeyDown}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <button id="send_message" onClick={sendMessage}>
            Send message
          </button>
        </section>
      </section>
    </div>
  );
};
export default UserProfile;
