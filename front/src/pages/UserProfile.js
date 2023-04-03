import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../api";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import Chat from "../components/Chat";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

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
  }, [id]);

console.log(user)



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
        </div>
       
      </section>
      <section className="chat">
  <Chat></Chat>
      </section>
    </div>
  );
};
export default UserProfile;
