  
import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../api";


  const Filters=()=>{

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


    //////
 
      let native_language = [];
      let practicing_language = [];
      

      users.forEach((element) => {
        if (!native_language.includes(element.native_language)) {
          native_language.push(element.native_language);
        }
      });
   

  
      
      users.forEach((element) => {
        if (!practicing_language.includes(element.practicing_language)) {
          practicing_language.push(element.practicing_language);
        }
      });
      
    
  
    
    
///////
return(
    <div className="filters">
    
    <div className="nativeFilter">
    <div><p>Search by their native language:</p></div>
  <ul className="ul">
    {native_language.map((element) => (
      <li key={element}>
        <label>
          <input type="checkbox" />
          {element}
        </label>
      </li>
    ))}
  </ul>
</div>

<div className="practicingFilter">
  <div><p>Search by the language they practice:</p></div>
  <ul className="ul">
    {practicing_language.map((element) => (
      <li key={element}>
        <label>
          <input type="checkbox" />
          {element}
        </label>
      </li>
    ))}
  </ul>
</div>

</div>
)
   
  }
  export default Filters