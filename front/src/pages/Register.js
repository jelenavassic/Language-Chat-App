import axios from "axios";
import { useState } from "react";
import API_URL from "../api";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    city: "",
    country: "",
    email: "",
    password: "",
    native_language: "",
    practicing_language: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const registrationSchema = Yup.object().shape({
    first_name: Yup.string()
      .matches(/^[A-Z][a-z]*$/, "Must start with an uppercase letter")
      .required("Required"),
    last_name: Yup.string()
      .matches(/^[A-Z][a-z]*$/, "Must start with an uppercase letter")
      .required("Required"),
    city: Yup.string()
      .matches(/^[A-Z][a-z]*$/, "Must start with an uppercase letter")
      .required("Required"),
    country: Yup.string()
      .matches(/^[A-Z][a-z]*$/, "Must start with an uppercase letter")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password is too short - should be 8 chars minimum.")
      .required("Required"),
    native_language: Yup.string()
      .matches(/^[A-Z][a-z]*$/, "Must start with an uppercase letter")
      .required("Required"),
    practicing_language: Yup.string()
      .matches(/^[A-Z][a-z]*$/, "Must start with an uppercase letter")
      .required("Required"),
  });
  //
  const history = useNavigate();

  const register = async (newUser) => {
    try {
      await axios.post(`${API_URL}/singup`, newUser).then(function (res) {
        if (res.status === 200) {
          history("/login");
        }
      });
    } catch (error) {
      console.log(error);

      let er = document.getElementById("errorReg");
      er.style.display = "block";
      setFormErrors({});
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registrationSchema.validate(formData, { abortEarly: false });
      register(formData);
    } catch (err) {
      const errors = {};

      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });

      setFormErrors(errors);
    }
  };

  return (
    <div id="register">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h2> REGISTER</h2>
          <p className="error" id="errorReg">
            Email already exists
          </p>
          <div className="inputAll">
            <div className="input">
              <div className="formDiv">
                <label htmlFor="first_name">Name:</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                ></input>
              </div>
              {formErrors.first_name && (
                <div className="errorM">{formErrors.first_name}</div>
              )}
              <div className="formDiv">
                <label htmlFor="last_name">Last Name:</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                ></input>
              </div>
              {formErrors.last_name && (
                <div className="errorM">{formErrors.last_name}</div>
              )}
              <div className="formDiv">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                ></input>
              </div>
              {formErrors.email && (
                <div className="errorM">{formErrors.email}</div>
              )}
              <div className="formDiv">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                ></input>
              </div>
              {formErrors.password && (
                <div className="errorM">{formErrors.password}</div>
              )}
            </div>

            <div className="input">
              <div className="formDiv">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                ></input>
              </div>
              {formErrors.city && (
                <div className="errorM">{formErrors.city}</div>
              )}
              <div className="formDiv">
                <label htmlFor="country">Country:</label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                ></input>
              </div>
              {formErrors.country && (
                <div className="errorM">{formErrors.country}</div>
              )}
              <div className="formDiv">
                <label htmlFor="native_language">My native language:</label>
                <input
                  type="text"
                  name="native_language"
                  id="native_language"
                  value={formData.native_language}
                  onChange={handleChange}
                ></input>
              </div>
              {formErrors.native_language && (
                <div className="errorM">{formErrors.native_language}</div>
              )}
              <div className="formDiv">
                <label htmlFor="practicing_language">
                  Language I want to practice:
                </label>
                <input
                  type="text"
                  name="practicing_language"
                  id="practicing_language"
                  value={formData.practicing_language}
                  onChange={handleChange}
                ></input>
              </div>
              {formErrors.practicing_language && (
                <div className="errorM">{formErrors.practicing_language}</div>
              )}
            </div>
          </div>
          <div>
            <button type="submit" className="submit">
              Register
            </button>
          </div>
          <NavLink to="/login">
            {" "}
            <span className="ch"> Already have an account? </span>
            <span className="l">Sign in</span>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Register;
