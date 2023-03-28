import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import API_URL from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import AllUsers from "./AllUsers";

const Login = () => {
  const [user, loginUser] = useState({
    email: "",
    password: "",
  });
  const history = useNavigate();

  const login = async (user) => {
    try {
      await axios.post(`${API_URL}/singin`, user).then(function (res) {
        if (res.status === 200) {
          // console.log(res);
          // alert(res.data.message);
          history("/myprofile");
        }
      });
    } catch (error) {
      console.log(error);
      let er = document.getElementById("errorLogin");
      er.style.display = "block";
      
    }
  };



  const handleChange = (e) => {
    e.preventDefault();
    try {
      if (user.email !== "" && user.password !== "") {
        login(user);
       
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="login">
      <div className="form">
        <form onSubmit={handleChange}>
          <h2>LOG IN</h2>
          <p className="error" id="errorLogin">
            Invalid email or password
          </p>
          <div className="input">
            <div className="formDiv">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => loginUser({ ...user, email: e.target.value })}
              ></input>
            </div>
            <div className="formDiv">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) =>
                  loginUser({ ...user, password: e.target.value })
                }
              ></input>
            </div>
          </div>
          <div>
            <button type="submit" className="submit">
              Log in
            </button>
          </div>
          <div>
 
            <NavLink to="/register"><span className="ch"> Don't have an account? </span>
              <span className="l">Sign up</span></NavLink>
          
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
