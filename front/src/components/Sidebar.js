import { NavLink } from "react-router-dom";

const Sidebar = () => {
  function logout(){
    localStorage.removeItem("user");
    window.location.reload(false);

  }
  return (
    <div>
      <div className="sidebar">
      <ul id="side">
        <li>
          <NavLink to="/">About</NavLink>
        </li>
        <li>
          <NavLink to="/myprofile">My Profile</NavLink>
        </li>

        <li>
          <NavLink to="/AllUsers">Find a partner</NavLink>
        </li>
        <li onClick={logout}>
          <NavLink to="/login">Log out</NavLink>
        </li>
      </ul>
    </div>
    </div>
  );
};
export default Sidebar;
