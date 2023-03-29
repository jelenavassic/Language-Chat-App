import Favourites from "../components/Favourites";

const Profile = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const user = localUser.result;
  const id = user.user_id;

  return (
    <div id="profile">
      <section id="myprofile">
        <div id="profileData">
          <div className="profileimg">
            <img src={`./profile.jpg`} alt={id}></img>
          </div>
          <div className="w"> <h2>
              <span className="l">Let's</span> 
               <span className="ch"> chat!</span>
            </h2></div>
          <div className="name">
            <div className="n">
              {user.first_name} {user.last_name}
            </div>
            <div className="l">Practicing: {user.practicing_language}</div>
          </div>
        </div>

        <div id="fav">
          <Favourites></Favourites>
        </div>
      </section>
    </div>
  );
};

export default Profile;
