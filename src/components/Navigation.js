import {NavLink} from  "react-router-dom"
    
    
    const Navigation=()=>{
    return(

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
    )
}

export default Navigation 