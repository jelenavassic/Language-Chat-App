import User from "../models/user.js"
// const bcrypt = require('bcrypt');



export const signup = async (req, res) => {
    try {
      const { first_name, last_name,city, country, email, password, native_language, practicing_language } = req.body;
  
      const newUser = new User({
        first_name,
        last_name,
        city, 
        country,
        email,
        password,
        native_language,
        practicing_language
      });
  
      await newUser.save();
  
      res.status(201).json(newUser.toJSON());
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user' });
    }
  };



  export const singin= async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // const isPasswordValid = await bcrypt.compare(password, user.password);
      // if (!isPasswordValid) {
      //   return res.status(400).json({ message: 'Invalid email or password' });
      // }
  
      // Create a session or token to log in the user
      // ...
      
      return res.status(200).json({ message: 'Logged in successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }


// export const signup = async (req, res) => {

//   try {
   
//     const { first_name, last_name, email, password, native_language, practicing_language } = req.body;
//     console.log(req.body)

    
//     const newUser = await User.build({
//       first_name,
//       last_name,
//       email,
//       password,
//       native_language,
//       practicing_language
//     });
//     await newUser.save();

//     res.status(201).json(newUser.toJSON());
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ message: 'Error creating user' });
//   }
// }

// export default User;
