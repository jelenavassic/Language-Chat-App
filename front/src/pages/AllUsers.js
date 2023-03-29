import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../api";
import Sidebar from "../components/Sidebar";
import Filters from "../components/Filters";
import { NavLink } from "react-router-dom";
// import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

import ReactDOM from "react-dom";

const AllUsers = () => {

  const localUser = JSON.parse(localStorage.getItem("user"));
  const user = localUser.result;
  const localId = user.user_id;


  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const users = await axios.get(`${API_URL}/AllUsers`);
      setUsers(users.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  

  useEffect(() => {
    getAllUsers();
  }, [users]);
  console.log(users);

  let icon = document.querySelectorAll(".favicon");
  icon.forEach((elem) => elem.addEventListener("click", changeIcon));

  function changeIcon() {;
    const newIcon = (
      <div>
        <FontAwesomeIcon icon={solidStar} size="xl" bounce />
      </div>
    );
    const iconNode = ReactDOM.render(newIcon, document.createElement("div"));
    this.innerHTML = "";
    this.appendChild(iconNode);










    
  }





  // napraviti da u lokal storige se cuvaju samo podaci za ulogovanog korisnika koristeci lokalId
  // let favourites
  // const localStorageFav = localStorage.getItem("favourites");
  // if (localStorageFav) {
  //   cart = JSON.parse(localStorageFav);
  // } else {
  //   favourites = [];
  // }????????????????????????????????????????????
  

//   function addToFavourites() {
//     let id = this.dataset.id; //???????????????? da li moze ovako???
//     users.forEach((element) => {
//       let user_id = users.filter((elem) => elem.id == element.id)[0].user_id;
//       let images = users.filter((elem) => elem.id == element.id)[0].images;
//       let first_name = users.filter((elem) => elem.id == element.id)[0].first_name;
//       let last_name = users.filter((elem) => elem.id == element.id)[0].last_name;
//       let city = users.filter((elem) => elem.id == element.id)[0].city;
//       let country = users.filter((elem) => elem.id == element.id)[0].country;
//       let native_language = users.filter((elem) => elem.id == element.id)[0].native_language;
//       let practicing_language = users.filter((elem) => elem.id == element.id)[0].practicing_language;

// let item = {
//   user_id: user_id,
//       images:images,
//       first_name:first_name,
//       last_name:last_name,
//       city:city,
//       country:country,
//       native_language:native_language,
//       practicing_language:practicing_language

//     };
//     if (cart.some((elem) => elem.user_id !== id))
   
// {    favourites.push(item);}
    
//     localStorage.setItem("favourites", JSON.stringify(favourites));


//     }
//   }





    





  return (
    <div id="users">
      <section className="sidebar">
        <Sidebar></Sidebar>
      </section>
      <section className="main">
        <div id="usersmain">
          <div id="allusers">
            {users.map((element) => {
              const id = `${element.user_id}`;
              return (
                <div className="user flex-column" key={element.user_id}>
                  <div className="flex-row">
                    <div className="profileimg">
                      <img
                        src={`http://localhost:5000/api/images/${id}`}
                        alt={element.user_id}
                      ></img>
                    </div>
                    <div className="flex-column">
                      <div className="name">
                        {element.first_name} {element.last_name}
                      </div>
                      <div className="city">
                        {element.city}, {element.country}
                      </div>
                    </div>
                  </div>

                  <div className="flex-column language-flex">
                    <div className="language">
                      Native language: {element.native_language}
                    </div>
                    <div className="language">
                      Practicing: {element.practicing_language}
                    </div>
                  </div>
                  <div className="btnoptions">
                    <NavLink to={`/user/${id}`}>
                      <button className="chatbtn" id={id}>
                        Chat
                      </button>
                    </NavLink>
                    <div className="favicon">
                      <FontAwesomeIcon icon={regularStar} size="xl" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div id="filters">
            <Filters></Filters>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllUsers;
