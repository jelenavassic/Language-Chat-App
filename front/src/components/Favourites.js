import { useState, useEffect,useMemo} from "react";
import { NavLink } from "react-router-dom";

const Favourites = (users) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.user_id;
  const localStorageFav = localStorage.getItem(`favourites${id}`);
  const favourites = useMemo(() => localStorageFav ? JSON.parse(localStorageFav) : [], [localStorageFav]);
  const allUsers = users.users.users;
  const [favouritesArr, setFavouritesArr] = useState([]);
  const [favouritesCount, setFavouritesCount] = useState(0);

  useEffect(() => {
    if (allUsers.length > 0) {
      const mappedFavourites = favourites.map((fav) =>
        allUsers.find((user) => user.user_id === fav)
      );
      setFavouritesArr(mappedFavourites);
    }
  }, [allUsers,favourites]);  

  function removeFav(removeId) {
    let newfavourites = favourites.filter((element) => element != removeId);
    localStorage.setItem(`favourites${id}`, JSON.stringify(newfavourites));
    setFavouritesCount((prevCount) => prevCount + 1);

  }

  return (
    <div className="fav">
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
