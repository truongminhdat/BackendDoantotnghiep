const nodemailer = require("nodemailer");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "truongminhdat789@gmail.com",
    password: "truongminhdat2708",
  },
});
const sendpasswordlink = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(401).json({
      msg: "Enter your email",
    });
  }
  try {
    const userFind = await UserModel.findOne({
      email: email,
    });
    const token = jwt.sign({ id: userFind.id }, process.env.JWT_SECRET, {
      expiresIn: "5s",
    });
    console.log("token", token);

    return res.status(200).json({
      userFind,
    });
  } catch (error) {}
};
module.exports = {
  sendpasswordlink,
};
