import User from "../models/user.js";
import bcrypt from "bcrypt";

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
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        first_name,
        last_name,
        city,
        country,
        email,
        password: hashedPassword,
        native_language,
        practicing_language,
      });

      await newUser.save();

      res.status(201).json(newUser.toJSON());
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

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return res.status(400).json({ message: "Invalid email or password" });

    // }
    // console.log(res)
    // console.log(user)

    return res.status(200).json({ message: "Logged in successfully" });
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


export const getUser= async (req, res) => {
  try {
    const user = await User.findOne({ where: { user_id: req.params.id  } });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};