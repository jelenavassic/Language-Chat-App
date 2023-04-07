import Sidebar from "../components/Sidebar";

import { useState } from "react";

import * as Yup from "yup";
import axios from "axios";
 import API_URL from "../api";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const id = user.user_id;

 

  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    city: user.city,
    country: user.country,
    email: user.email,
    password: user.password,
    native_language: user.native_language,
    practicing_language: user.practicing_language,
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

  const edit = async (newUser) => {
    try {
      await axios.put(`${API_URL}/edit/${id}`, newUser).then(function (res) {
        if (res.status === 200) {
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
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registrationSchema.validate(formData, { abortEarly: false });
      edit(formData);
      history("/myprofile");
      window.location.reload(false);
    } catch (err) {
      const errors = {};

      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });

      setFormErrors(errors);
    }
  };

  const [photoFile, setPhotoFile] = useState(null);

  const handlePhotoChange = (event) => {
    setPhotoFile(event.target.files[0]);
  };

  const upload = async (photoFile) => {
    try {
      const formData = new FormData();
      formData.append("file", photoFile);
      console.log(formData);
      const response = await axios.post(`${API_URL}/photos/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        // alert("ok");
      }
    } catch (error) {
      console.log(error);
      // alert(error);
    }
  };

  const handlePhotoSubmit = (event) => {
    event.preventDefault();

    console.log(photoFile);
    upload(photoFile);
    history("/myprofile");
    window.location.reload(false);
  };

  const deleteAcc = async () => {
    if (window.confirm("Are you sure? :(")) {
      try {
        await axios.delete(`${API_URL}/user/${id}`).then(function (res) {
          if (res.status === 200) {
            localStorage.removeItem("user");
            history("/");
            window.location.reload(false);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div id="edit">
      <section className="sidebar">
        <Sidebar></Sidebar>
      </section>
      <section>
        <div className="mainEdit">
          <div className="uploadPhoto">
            <div className="editPhoto">
              <img
                src={`http://localhost:5000/api/images/${id}`}
                alt={user.user_id}
              ></img>
              <form onSubmit={handlePhotoSubmit}>
                <input
                  type="file"
                  name="newPhoto"
                  onChange={handlePhotoChange}
                ></input>
                <button type="submit">Upload photo</button>
              </form>
            </div>
            <button className="button" onClick={deleteAcc}>
              Delete account
            </button>
          </div>
          <form className="editData" onSubmit={handleSubmit}>
            <div className="formDiv">
              <label htmlFor="first_name">Name: </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                defaultValue={formData.first_name}
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
                defaultValue={formData.last_name}
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
                defaultValue={formData.email}
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
                defaultValue={formData.password}
                onChange={handleChange}
              ></input>
            </div>
            {formErrors.password && (
              <div className="errorM">{formErrors.password}</div>
            )}

            <div className="formDiv">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                name="city"
                id="city"
                defaultValue={formData.city}
                onChange={handleChange}
              ></input>
            </div>
            {formErrors.city && <div className="errorM">{formErrors.city}</div>}
            <div className="formDiv">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                name="country"
                id="country"
                defaultValue={formData.country}
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
                defaultValue={formData.native_language}
                onChange={handleChange}
              ></input>
            </div>
            {formErrors.native_language && (
              <div className="errorM">{formErrors.native_language}</div>
            )}
            <div className="formDiv">
              <label htmlFor="practicing_language">Language I practice:</label>
              <input
                type="text"
                name="practicing_language"
                id="practicing_language"
                defaultValue={formData.practicing_language}
                onChange={handleChange}
              ></input>
            </div>
            {formErrors.practicing_language && (
              <div className="errorM">{formErrors.practicing_language}</div>
            )}
            <div>
              <button type="submit" className="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Edit;
