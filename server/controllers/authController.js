import User from "../models/userModel";
import { hashPassword, comparePassword } from "../utils/authUtils";
import jwt from "jsonwebtoken";

const register = async function (req, res) {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name) {
      return res.json({ message: "Name is required" });
    }
    if (!password || password.length < 6) {
      return res.json({
        message: "Password is required and should be min 6 characters long",
      });
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) {
      return res.json({ message: "Email address is already taken" });
    }

    // Hashing the password
    let hashedPassword = await hashPassword(password);

    // Register the User
    let newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    console.log(newUser);

    res.json({ message: "User has been successfully created", ok: true });
  } catch (err) {
    console.log("Error", err.message);
    res.json({ error: true, message: "Error Occured, Try again" });
  }
};

const login = async function (req, res) {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email }).exec();

    if (!userExist) return res.json({ error: true, message: "User not exist" });

    const checkPassword = await comparePassword(password, userExist.password);

    if (!checkPassword)
      return res.json({
        error: true,
        message: "Either password or email is incorrect",
      });

    userExist.password = undefined;

    const token = jwt.sign({ _id: userExist._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.json({
      user: userExist,
      message: "Successfully Logged in",
      error: false,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: true, message: "Error occured. Try again!" });
  }
};

const logout = function (req, res) {
  res.clearCookie("token");
  return res.json({ message: "Signout Success" });
};

module.exports = {
  register,
  login,
  logout,
};
