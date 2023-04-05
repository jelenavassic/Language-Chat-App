import { useState, useEffect } from "react";
import Favourites from "../components/Favourites";
import axios from "axios";
import API_URL from "../api";
import Chat from "../components/Chat";



const Profile = () => {
  // window.location.reload(false);
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
console.log("DGAGDA")
  return (
    <div id="profile">
      <section id="myprofile">
        <div id="profileData">
          <div className="profileimg"> {user.images===null ?<img src={`./profile.jpg`} alt={id}></img> :  <img
              src={`http://localhost:5000/api/images/${user.user_id}`}
              alt={user.user_id}
            ></img>} 
            {/* <img src={`./profile.jpg`} alt={id}></img> */}
           
          </div>
        
          <div className="w">
          
            <h2>
              <span className="l">My </span>
              <span className="ch"> favourites</span>
            </h2>
          </div>
          <div className="name">
            <div className="n">
              {user.first_name} {user.last_name}
            </div>
            <div className="l">Practicing: {user.practicing_language}</div>
          </div>
        </div>
        <div id="myProfileMain">
          <div id="fav">
            <Favourites></Favourites>
          </div>
          {/* <div className="chat"> <Chat></Chat></div> */}
        </div>
      </section>
    </div>
  );
};

export default Profile;

