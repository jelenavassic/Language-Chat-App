import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import AllUsers from "./pages/AllUsers";
import Edit from "./pages/Edit";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <BrowserRouter>
        <div className="navigation">
          <Navigation></Navigation>
        </div>

        <div>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
          {user ? (
            <div>
              <Routes>
                <Route path="/myprofile" element={<Profile></Profile>}></Route>
                <Route path="/editProfile" element={<Edit></Edit>}></Route>
                <Route path="/AllUsers" element={<AllUsers></AllUsers>}></Route>
                <Route
                  path="/user/:id"
                  element={<UserProfile></UserProfile>}
                ></Route>
              </Routes>
            </div>
          ) : (
            <Routes>
            <Route path="/myprofile" element={<NotFound />}></Route>
            <Route path="/editProfile" element={<NotFound />}></Route>
            <Route path="/AllUsers" element={<NotFound />}></Route>
            <Route
              path="/user/:id"
              element={<UserProfile></UserProfile>}
            ></Route>
          </Routes>
          )}
        </div>

        <div className="footer">
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
