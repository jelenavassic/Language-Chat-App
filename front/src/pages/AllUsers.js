// import { useState, useEffect } from "react";
// import axios from "axios";
// import API_URL from "../api";
 
import Sidebar from "../components/Sidebar";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import ReactDOM from "react-dom";
import React from "react";

const AllUsers = ({ users, setUsers }) => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const localId = localUser.user_id;
  const localStorageFav = localStorage.getItem(`favourites${localId}`);
  const favourites = localStorageFav ? JSON.parse(localStorageFav) : [];
  let native_languageArr = [];
  let practicing_languageArr = [];

  function renderFilters() {
    users.forEach((element) => {
      if (!native_languageArr.includes(element.native_language)) {
        native_languageArr.push(element.native_language);
      }
    });

    users.forEach((element) => {
      if (!practicing_languageArr.includes(element.practicing_language)) {
        practicing_languageArr.push(element.practicing_language);
      }
    });
  }

  function handleFilterChangeNative(e) {
    const language = e.target.value;
    let filteredUsers = users.filter(
      (user) => user.native_language === language
    );
    setUsers(filteredUsers);
    console.log(filteredUsers);
  }

  function handleFilterChangePracticing(e) {
    const language = e.target.value;
    let filteredUsers = users.filter(
      (user) => user.practicing_language === language
    );
    setUsers(filteredUsers);
    console.log(filteredUsers);
  }

  function addToFavourites(id) {
    const newIcon = (
      <div>
        <FontAwesomeIcon icon={solidStar} size="xl" bounce title="Added!" />
      </div>
    );
    const iconNode = ReactDOM.render(newIcon, document.createElement("div"));
    const iconElement = document.getElementById(`favicon-${id}`);
    iconElement.innerHTML = "";
    iconElement.appendChild(iconNode);

    let user = users.find((elem) => elem.user_id == id); // ostaviti 2 ==  jer je id koji stize string

    if (!favourites.some((elem) => elem == user.user_id)) {
      favourites.push(user.user_id);
    }
    localStorage.setItem(`favourites${localId}`, JSON.stringify(favourites));
  }
  renderFilters();

  return (
    <div id="users">
      <section className="sidebar">
        <Sidebar></Sidebar>
      </section>
      <section className="main">
        <div id="usersmain">
          <div id="allusers">
            {users.length < 1 ? (
              <div id="notFound">
                <div>No users found.</div>
              </div>
            ) : (
              users.map((element) => {
                const id = `${element.user_id}`;
                const username = `${element.first_name}`;

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
                        <button
                          title={
                            localId == id
                              ? "You can't chat with yourself"
                              : `Chat with ${username}`
                          }
                          className="chatbtn"
                          id={id}
                          {...(localId == id && { disabled: true })}
                        >
                          Chat
                        </button>
                      </NavLink>
                      <div
                        className="favicon"
                        id={`favicon-${id}`}
                        title={
                          localId == id
                            ? "You can't add yourself"
                            : "Add to favourites"
                        }
                      >
                        {favourites.some((elem) => elem == id) ? (
                          <FontAwesomeIcon
                            icon={solidStar}
                            size="xl"
                            bounce
                            title="Added!"
                          />
                        ) : localId == id ? (
                          <FontAwesomeIcon icon={regularStar} size="xl" />
                        ) : (
                          <FontAwesomeIcon
                            icon={regularStar}
                            size="xl"
                            onClick={() => addToFavourites(id)}
                            title="Add to favourites"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div id="filters">
            <div className="filters">
              <div className="nativeFilter">
                <div>
                  <p>Search by their native language:</p>
                </div>
                <ul className="ul">
                  {native_languageArr.map((element) => (
                    <li key={element}>
                      <label>
                        <input
                          type="checkbox"
                          value={element}
                          onChange={handleFilterChangeNative}
                        />
                        {element}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="practicingFilter">
                <div>
                  <p>Search by the language they practice:</p>
                </div>
                <ul className="ul">
                  {practicing_languageArr.map((element) => (
                    <li key={element}>
                      <label>
                        <input
                          type="checkbox"
                          value={element}
                          onChange={handleFilterChangePracticing}
                        />
                        {element}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllUsers;
