import { NavLink } from "react-router-dom";

const ProfileSidebar = () => {
  function logout() {
    localStorage.removeItem("user");
    window.location.reload(false);
  }
  return (
    <ul id="side">
      <li>
        <NavLink to="/editProfile">Edit Profile</NavLink>
      </li>
      <li>
        <NavLink to="/AllUsers">Find a partner</NavLink>
      </li>

      <li onClick={logout}>
        <NavLink to="/login">Log out</NavLink>
      </li>
    </ul>
  );
};
export default ProfileSidebar;
