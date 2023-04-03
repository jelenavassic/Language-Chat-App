import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import fs from "fs";


const JWT_SECRET = process.env.JWT_SECRET || "languagechat";

export const signup = async (req, res) => {
  const {
    first_name,
    last_name,
    city,
    country,
    email,
    password,
    native_language,
    practicing_language,
  } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        first_name,
        last_name,
        city,
        country,
        email,
        password,
        native_language,
        practicing_language,
      });
      const token = jwt.sign(
        { email: newUser.email, id: newUser.user_id },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      await newUser.save();

      return res.status(200).json({ result: newUser, token });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const singin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (password != user.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    console.log(password);
    console.log(user.password);

    const token = jwt.sign(
      { email: user.email, id: user.user_id },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ result: user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const allusers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getimg = async (req, res) => {
  try {
    const image = await User.findOne({ where: { user_id: req.params.id } });
    res.setHeader("Content-Type", "image/jpg");
    res.send(image.images);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { user_id: req.params.id } });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export const editUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      city,
      country,
      email,
      password,
      native_language,
      practicing_language,
    } = req.body;

    // // Validate the input data
    // const schema = Joi.object({
    //   first_name: Joi.string().max(255),
    //   last_name: Joi.string().max(255),
    //   city: Joi.string().max(255),
    //   country: Joi.string().max(255),
    //   email: Joi.string().email(),
    //   password: Joi.string().min(8).max(255),
    //   native_language: Joi.string().max(255),
    //   practicing_language: Joi.string().max(255),
    // });

    // const { error } = schema.validate(req.body);

    // if (error) {
    //   return res.status(400).json({ message: error.details[0].message });
    // }
    // const hashedPassword = await bcrypt.hash(password, 10);

    const [rows, updatedUser] = await User.update(
      {
        first_name,
        last_name,
        city,
        country,
        email,
        password,
        native_language,
        practicing_language,
      },
      { where: { user_id: req.params.id } }
    );

    // if (rowsUpdated === 0) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    return res.status(200).json({ message: "User updated successfully" });
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const postPhoto = async (req, res) => {
  const id = req.params.id;
  const image = req.file;
  console.log(image);  
  try {
    const user = await User.update(
      {
        images: image.buffer,
      },
      { where: { user_id: id } }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Photo uploaded successfully" });

   
  } catch (error) {
    console.error("Failed to upload photo:", error);
    res.status(500).json({ error: "Failed to upload photo" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  await User.destroy({
    where: { user_id: id },
  });
  res.status(200).json({ message: "Deleted successfully" });
}







//   try {
//     // Create a read stream from the uploaded file
//     const photoStream = fs.createReadStream(req.file.path);

//     // Handle the file stream
//     const user = await User.findOneAndUpdate(
//       { _id: id },
//       { images: photoStream },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Send response
//     res.status(200).json({ message: "Photo uploaded successfully" });
//   } catch (error) {
//     console.error("Failed to upload photo:", error);
//     res.status(500).json({ error: "Failed to upload photo" });
//   }
// };















// app.post('/photos/:id', upload.single('photo'), (req, res) => {
//   const photoFile = req.file;

// Find the row you want to update
//   User.findByPk(req.params.id)
//     .then((photo) => {
//       // Update the photo data column with the contents of the photo file
//       photo.update({ data: photoFile.buffer })
//         .then(() => {
//           res.redirect('/myprofile');
//         });
//     });
// });
