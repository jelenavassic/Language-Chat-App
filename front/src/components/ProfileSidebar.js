import { NavLink } from "react-router-dom";

const ProfileSidebar = () => {
  return (
    <div className="sidebar">
      <ul id="side">
        <li>
          <NavLink to="/">About</NavLink>
        </li>
    
        <li>
          <NavLink to="/editProfile">Edit Profile</NavLink>
        </li>
        <li>
          <NavLink to="/AllUsers">Find a partner</NavLink>
        </li>
        <li>
          <NavLink to="/Favourites">Favourites</NavLink>
        </li>
        <li>
          <NavLink to="/login">Log out</NavLink>
        </li>
      </ul>
    </div>
  );
};
export default ProfileSidebar;
