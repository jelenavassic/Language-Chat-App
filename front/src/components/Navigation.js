import { NavLink } from "react-router-dom";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let id;
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  function logout() {
    localStorage.removeItem("user");
    window.location.reload(false);
  }
  
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
      <div className="menu-icon" onClick={toggleMenu}>
      <FontAwesomeIcon icon={faBars} />

    </div>
      {user ? (
        <ul className={`nav ${showMenu ? 'show-menu' : ''}`} id="navgap">
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
              {user.images === null ? (
                <img src={`./profile.jpg`} alt={id}></img>
              ) : (
                <img
                  src={`http://localhost:5000/api/images/${user.user_id}`}
                  alt={user.user_id}
                ></img>
              )}
              </div>
              <div>
                {user.first_name} {user.last_name}
              </div>
            </div>
          </li>
        </ul>
      ) : (
        <ul className={`nav ${showMenu ? 'show-menu' : ''}`}>
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
