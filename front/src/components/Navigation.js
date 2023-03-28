import { NavLink } from "react-router-dom";

const Navigation = () => {
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
    </div>
  );
};

export default Navigation;
