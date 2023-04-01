import Favourites from "../components/Favourites";

const Profile = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const user = localUser.result;
  const id = user.user_id;
  // console.log(users)

  return (
    <div id="profile">
      <section id="myprofile">
        <div id="profileData">
          <div className="profileimg">
            <img src={`./profile.jpg`} alt={id}></img>
          </div>
          <div className="w">
            {" "}
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

        <div id="fav">
          <Favourites></Favourites>
        </div>
      </section>
    </div>
  );
};

export default Profile;

// const [users, setUsers] = useState([]);
// const getAllUsers = async () => {
//   try {
//     const users = await axios.get(`${API_URL}/AllUsers`);
//     setUsers(users.data);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// useEffect(() => {
//   getAllUsers();
// }, []);

// const [favouritesArr, setfavouritesArr] = useState([]);
// console.log(users)
// const getFavouritesArr= async () => {
//   try {
//     const user = await favourites.map((element) => {
//       return users.find((elem) => elem.user_id == element);

//     });

//     setfavouritesArr(user); //undefined
//   } catch (error) {
//     console.log(error.message);
//   }}

// useEffect(() => {
//   getFavouritesArr()

// }, [])

// console.log(favourites)
// console.log(favouritesArr)
