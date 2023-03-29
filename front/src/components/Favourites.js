import ProfileSidebar from "./ProfileSidebar";

const Favourites = () => {
  return (
    <div className="fav">
      <div className="sideb">
        <ProfileSidebar></ProfileSidebar>
      </div>
      <div className="mainFav">
        <div>
          <h3>My favourites</h3>
        </div>
        <div className="favourites">
        You don't have any saved users, start searching <a href="http://localhost:3000/AllUsers">now!</a>
      </div>
      {/* <div></div>  ovde staviti usloni is ako ima nesto u local storige*/}
      </div>
      
    </div>
  );
};
export default Favourites;
