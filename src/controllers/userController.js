const bcrypt = require("bcrypt");

const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

const SECRET_KEY = require("bcrypt");
// const PasswordFun = async (password) => {
//   const hashedPassword = await SECRET_KEY.hash(password, 10);
//   return hashedPassword.toString();
// };

const signup = async (req, res) => {
  const { username, email, password, phone, countrycode } = req.body;
  console.log(req.body);

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // console.log("password", password);

    const hashedPassword = await SECRET_KEY.hash(password, 10);
    // let x = PasswordFun(password);

    // // console.log(hashedPassword);
    const result = await userModel.create({
      email: email,
      password: hashedPassword.toString(),
      username: username,
      phone: phone,
      countrycode: countrycode,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      SECRET_KEY.toString()
    );
    res.status(200).json(req.body);
  } catch (error) {
    console.log(error);
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY.toString()
    );
    res.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { signup, signin };
