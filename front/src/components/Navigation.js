import { NavLink } from "react-router-dom";

const Navigation = () => {
  function logout() {
    localStorage.removeItem("user");
    window.location.reload(false);
  }
  const user = JSON.parse(localStorage.getItem("user"));
  
  return (
    <div id="header">
      <div className="logo">
        <img src="/logo.jpg" alt="logo"></img>
        <NavLink to="/">
          <div className="app-name">
            <h1>
              <span className="l">Language</span>
              <span className="ch">Chat</span>
            </h1>
          </div>
        </NavLink>
      </div>

      {user ? (
        <ul className="nav navgap">
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
      ) : (
        <ul className="nav">
          <li>
            <NavLink to="/">About</NavLink>
          </li>
          <li>
            <NavLink to="/register">Sing Up</NavLink>
          </li>
          <li>
            <NavLink to="/login">Log in</NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
