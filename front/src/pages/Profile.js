import { useState, useEffect } from "react";
import Favourites from "../components/Favourites";
import axios from "axios";
import API_URL from "../api";
import { NavLink } from "react-router-dom";
import MyChats from "../components/MyChats";

const Profile = (users) => {
   const localUser = JSON.parse(localStorage.getItem("user"));
  const id = localUser.user_id;

  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get(`${API_URL}/user/${id}`);
        setUser(user.data);
        localStorage.setItem("user", JSON.stringify(user.data));
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [id]);

  

 

  return (
    <div id="profile">
      <section id="myprofile">
        <div id="profileData">
     
          <div className="name">
          <div className="profileimg">
            {" "}
            {user.images === null ? (
              <img src={`./profile.jpg`} alt={id}></img>
            ) : (
              <img
                src={`http://localhost:5000/api/images/${user.user_id}`}
                alt={user.user_id}
              ></img>
            )}
           </div>
            <div className="n">
              {user.first_name} {user.last_name}
            </div>
            <div className="l">Practicing: {user.practicing_language}</div>
            <div id="edit"> <NavLink to="/editProfile">Edit Profile</NavLink></div>
            

          </div>
          <div className="flex-column">
        <div className="myChats">My Chats</div>
          <MyChats></MyChats></div>
        </div>
        <div id="myProfileMain">
             
           <div className="w">
            <h2>
              <span className="l">My </span>
              <span className="ch"> favourites</span>
            </h2>
          </div> 
          <div id="fav">
            <Favourites users={users}></Favourites>
          </div>
         </div>
      </section>
    </div>
  );
};

export default Profile;
