import { NavLink } from "react-router-dom";

const Navigation = () => {
  function logout() {
    localStorage.removeItem("user");
    window.location.reload(false);
  }
  const user = JSON.parse(localStorage.getItem("user"));
  let id;
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
          <div className="hide"> {(id = user.user_id)}</div>
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
          <li>
            <div className="flex-column">
              <div id="sideImg">
                <img
                  src={`http://localhost:5000/api/images/${id}`}
                  alt={id}
                ></img>{" "}
              </div>
              <div>
                {user.first_name} {user.last_name}
              </div>
            </div>
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
