import React from "react";
import axios from 'axios';

import API_URL from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {


    const [user, loginUser] = useState({
      
      email: "",
      password: "",
    
    });
    const history = useNavigate();
  
    const login = async (user) => {
      try {
        await axios.post(`${API_URL}/singin`, user); //koja metoda?
      } catch (error) {
        console.log(error);
      }
    };
    const handleChange = (e) => {

      e.preventDefault();
try{
  if (user.email !== "" && user.password !== "") {

    login(user);
    alert("Korisnik je ulogovan!");
    history("/myprofile");
}
}catch (error) {
        console.log(error);
      }
     

  }


  return (
    <div id="login">
      <div className="form">
        <form onSubmit={handleChange}>
          <h2>LOG IN</h2>
          <div className="input">
            <div className="formDiv">
              <label>Email:</label>
              <input type="text" name="email" id="email" onChange={(e) =>loginUser({ ...user, email: e.target.value })}></input>
            </div>
            <div className="formDiv">
              <label>Password:</label>
              <input type="password" name="password" id="password" onChange={(e) =>loginUser({ ...user, password: e.target.value })}></input>
            </div>
          </div>
          <div>
            <button type="submit" className="submit">
              Log in
            </button>
          </div>
          <div>
            <a href="http://localhost:3000/register">
              <span className="ch"> Don't have an account? </span>
              <span className="l">Sign up</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

// ///
// let users = [];

// allUsers();
// showUsers();

// function allUsers() {
//   axios.get("http://localhost:5000/allUsers").then(function (response) {
//     showUsers(response.data.data);
//   });
// }

// function showUsers(data) {
//   users = data;
//   console.log(users);
//   let html = "";
//   users.forEach((element) => {
//     html += `<div class="user">
//       <div class="user-item img" >
//        <img src="http://localhost:4000/images/${element.user_id}" alt="${element.user_id}">
//       </div>
//       <div id="title">
//         <div class="user-item name" id="name">${element.user_id} ${element.first_name}</div>
       
//     </div>`;
//   });

//   document.getElementById("main").innerHTML += html;
// }


export default Login;
