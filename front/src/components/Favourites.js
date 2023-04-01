import ProfileSidebar from "./ProfileSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../api";
import { NavLink } from "react-router-dom";

const Favourites = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const user = localUser.result;
  const localId = user.user_id;
  const localStorageFav = localStorage.getItem(`favourites${localId}`);
  const favourites = localStorageFav ? JSON.parse(localStorageFav) : [];
  console.log(favourites);
  const [users, setUsers] = useState([]);
  const getAllUsers = async () => {
    try {
      const users = await axios.get(`${API_URL}/AllUsers`);
      setUsers(users.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const [favouritesArr, setFavouritesArr] = useState([]);

  useEffect(() => {
    if (users.length > 0) {
      const mappedFavourites = favourites.map((fav) =>
        users.find((user) => user.user_id === fav)
      );
      setFavouritesArr(mappedFavourites);
    }
  }, [users, favourites]); //ako je prazan niz  ne ubacuje nista u favARR

  console.log(favourites);
  console.log(favouritesArr);

  function removeFav(id) {
    let newfavourites = favourites.filter((element) => element != id);
    localStorage.setItem(`favourites${localId}`, JSON.stringify(newfavourites));

    // alert(id)
  }

  return (
    <div className="fav">
      <div className="sideb">
        <ProfileSidebar></ProfileSidebar>
      </div>
      <div className="mainFav">
        {favourites.length <= 0 ? (
          <div className="favourites">
            You don't have any saved users, start searching{" "}
            <a href="http://localhost:3000/AllUsers">now!</a>
          </div>
        ) : (
          <div id="favourites">
            {favouritesArr?.map((element) => {
              const id = `${element.user_id}`;
              const username = `${element.first_name}`;
              return (
                <div className="user flex-column" key={element.user_id}>
                  <div className="flex-row">
                    <div className="profileimg">
                      <img
                        src={`http://localhost:5000/api/images/${element.user_id}`}
                        alt={element.user_id}
                      ></img>
                    </div>
                    <div className="flex-column">
                      <div className="name">
                        {element.first_name} {element.last_name}
                      </div>
                      <div className="city">
                        {element.city}, {element.country}
                      </div>
                    </div>
                  </div>

                  <div className="flex-column language-flex">
                    <div className="language">
                      Native language: {element.native_language}
                    </div>
                    <div className="language">
                      Practicing: {element.practicing_language}
                    </div>
                    <div className="btnoptions">
                      <NavLink to={`/user/${id}`}>
                        <button
                          title={`Chat with ${username}`}
                          className="chatbtn"
                          id={id}
                        >
                          Chat
                        </button>
                      </NavLink>

                      <button
                        className="removeFav"
                        id={`removeFav-${id}`}
                        onClick={() => removeFav(id)}
                        title="Remove from favourites"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default Favourites;
