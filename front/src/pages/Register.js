import axios from "axios";
import { useState } from "react";
import API_URL from "../api";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [newUser, registerUser] = useState({
    first_name: "",
    last_name: "",
    city: "",
    country: "",
    email: "",
    password: "",
    native_language: "",
    practicing_language: "",
  });
  const history = useNavigate();

  const register = async (newUser) => {
    try {
      await axios.post(`${API_URL}/singup`, newUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();

    if (
      newUser.first_name !== "" &&
      newUser.last_name !== "" &&
      newUser.city !== "" &&
      newUser.country !== "" &&
      newUser.email !== "" &&
      newUser.password !== "" &&
      newUser.native_language !== "" &&
      newUser.practicing_language !== ""
    ) {
      register(newUser);
      alert("Korisnik je kreiran!");
      history("/login");
    }
  };

  return (
    <div id="register">
      <div className="form">
        <form onSubmit={handleChange}>
          <h2> REGISTER</h2>
          <div className="inputAll">
            <div className="input">
              <div className="formDiv">
                <label for="first_name">Name:</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  onChange={(e) =>
                    registerUser({ ...newUser, first_name: e.target.value })
                  }
                ></input>
              </div>
              <div className="formDiv">
                <label for="last_name">Last Name:</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  onChange={(e) =>
                    registerUser({ ...newUser, last_name: e.target.value })
                  }
                ></input>
              </div>
              <div className="formDiv">
                <label for="email">Email:</label>
                <input
                  type="email"
                  name=""
                  id="email"
                  onChange={(e) =>
                    registerUser({ ...newUser, email: e.target.value })
                  }
                ></input>
              </div>
              <div className="formDiv">
                <label for="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) =>
                    registerUser({ ...newUser, password: e.target.value })
                  }
                ></input>
              </div>
            </div>
            <div className="input">
              <div className="formDiv">
                <label for="city">City:</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  onChange={(e) =>
                    registerUser({ ...newUser, city: e.target.value })
                  }
                ></input>
              </div>
              <div className="formDiv">
                <label for="country">Country:</label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  onChange={(e) =>
                    registerUser({ ...newUser, country: e.target.value })
                  }
                ></input>
              </div>
              <div className="formDiv">
                <label for="native_language">My native language:</label>
                <input
                  type="text"
                  name="native_language"
                  id="native_language"
                  onChange={(e) =>
                    registerUser({
                      ...newUser,
                      native_language: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div className="formDiv">
                <label for="practicing_language">
                  Language I want to practice:
                </label>
                <input
                  type="text"
                  name="practicing_language"
                  id="practicing_language"
                  onChange={(e) =>
                    registerUser({
                      ...newUser,
                      practicing_language: e.target.value,
                    })
                  }
                ></input>
              </div>
            </div>
          </div>
          <div>
            <button type="submit" className="submit">
              Register
            </button>
          </div>
          <a href="http://localhost:3000/login">
            <span className="ch"> Already have an account? </span>
            <span className="l">Sign in</span>
          </a>
        </form>
      </div>
    </div>
  );
};

export default Register;
