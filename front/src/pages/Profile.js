import ProfileSidebar from "../components/ProfileSidebar";
// import axios from "axios";
// import API_URL from "../api";
// import { useState, useEffect } from "react";

const Profile = () => {
  // const [user, setUser] = useState([]);
  // const { id } = 40;
  // const getUser = async () => {
  //   try {
  //     const user = await axios.get(`${API_URL}/user/${id}`);
  //     setUser(user.data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  // useEffect(() => {
  //   getUser();
  // }, [user]);

  return (
    <div id="profile">
      <section>
       <ProfileSidebar></ProfileSidebar>
      </section>
      <section id= "myprofile">
      {/* <div className="flex-row">
          <div className="profileimg">
            <img
              src={`http://localhost:5000/api/images/${id}`}
              alt={id}
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
        </div> */}
      </section>
    </div>
  );
};

export default Profile;
