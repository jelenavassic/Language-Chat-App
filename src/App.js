import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Register from "./pages/Register";



function App() {
  
  const Home=()=>{



    return(
        <div>
            <h1>HOME</h1>
        </div>
    )
}
  return (<div>


    <BrowserRouter>
    <div className="nav">
      <div className="logo"></div>
      <div className="app-name"></div>
      <div className="navigation">
      <Navigation></Navigation>
      </div>
      <div>
        <Routes>
          <Route path='/'element={<Home></Home>}></Route>
          <Route path='/register'element={<Register></Register>}></Route>
          <Route path='/login'element={<Login></Login>}></Route>
        </Routes>
      </div>

      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
