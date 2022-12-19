const md5 = require("md5");
const { v4: uuidv4 } = require("uuid");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const sendMailController = require("./sendmail.Controllers");
const { UUIDV4 } = require("sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();

const registrationController = async (req, res) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      address,
      phoneNumber,
      gender,
      avatar,
      roleId,
      dayOfBirth,
    } = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    if (
      !username ||
      !firstName ||
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !gender ||
      !avatar
    ) {
      return res.status(400).json({
        msg: "invalid input from user",
      });
    }
    const existedUser = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (existedUser) {
      return res.status(400).json({
        msg: "Email already existed",
      });
    }
    // create and save into database
    await UserModel.create({
      id: uuidv4(),
      username: username,
      password: hash,
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      phoneNumber: phoneNumber,
      gender: gender,
      avatar: avatar,
      roleId: roleId,
      dayOfBirth: dayOfBirth,
    });
    return res.status(201).json({ msg: "successfully registered!" });
  } catch (e) {
    return res.status(500).json({
      msg: "Error from server",
    });
  }
  // check if existed email or phone
};

const loginController = async (req, res) => {
  const { email: inputEmail, password: pwd } = req.body;
  if (!inputEmail || !pwd) {
    return res.status(400).json({
      msg: "Please insert email or password",
    });
  }

  const user = await UserModel.findOne({
    where: {
      email: inputEmail,
    },
    raw: true,
  });
  console.log("check user", user);
  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }
  const isPassword = await bcrypt.compare(pwd, user.password);

  if (!isPassword) {
    return res.status(400).json({
      msg: "Wrong password or username",
    });
  }
  if (user) {
    const accessToken = jwt.sign(
      JSON.stringify({
        email: user.email,
        id: user.id,
      }),
      process.env.JWT_SECRET
    );

    const refreshToken = jwt.sign(
      JSON.stringify({
        id: user.id,
      }),
      process.env.JWT_SECRET
    );
    return res
      .cookie("access_token", accessToken, {
        httpOnly: true,
      })
      .status(200)
      .json({
        msg: "login successfully!",
        accessToken,
        refreshToken,
      });
  }
  return res.status(400).json({ msg: "data is not valid!" });
};

const resetPasswordController = async (req, res) => {
  try {
    const checkToken = jwt.verify(
      req.headers.accesstoken,
      process.env.JWT_SECRET
    );
    const user = await UserModel.findOne({
      where: {
        email: checkToken.email,
      },
    });
    if (user) {
      const { newPassword } = req.body;
      const encrypted = md5(newPassword);
      user.password = encrypted;
      await user.save();
      return res.status(200).json({
        msg: "password reset successfully.",
      });
    } else {
      return res.status(400).json({
        msg: "password reset failed",
      });
    }
  } catch (e) {
    return res.status(500).json({
      msg: "Error from the server",
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const checkToken = jwt.verify(
      req.headers.accesstoken,
      process.env.JWT_SECRET
    );
    const user = await UserModel.findOne({
      where: {
        id: checkToken.id,
      },
    });
    const {
      username,
      firstName,
      lastName,
      email,
      address,
      phoneNumber,
      gender,
      avatar,
    } = req.body;
    if (user) {
      (user.username = username),
        (user.firstName = firstName),
        (user.lastName = lastName),
        (user.email = email),
        (user.address = address),
        (user.phoneNumber = phoneNumber),
        (user.gender = gender),
        (user.avatar = avatar),
        await user.save();
      return res.status(200).json({
        msg: "user profile is updated",
      });
    } else {
      return res.status(400).json({
        msg: "user profile update error",
      });
    }
  } catch (e) {
    return res.status(500).json({
      msg: "Error from the server",
    });
  }
};
const getAllUser = async (req, res) => {
  try {
    let getAllUser = await UserModel.findAll();
    return res.status(200).json({
      msg: "get all user",
      getAllUser,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error from the server",
    });
  }
};
const getAllUserById = async (req, res) => {
  try {
    let { userId } = req.query;
    let user = await UserModel.findOne({
      where: {
        id: userId,
      },
    });
    if (user) {
      return res.status(200).json({
        msg: "get user by id",
        user,
      });
    } else {
      return res.status(404).json({
        msg: "get user error",
      });
    }
  } catch (e) {
    return res.status(500).json({
      msg: "Error from the server",
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    let { userId } = req.query;
    let user = await UserModel.findOne({
      where: {
        id: userId,
      },
    });
    if (user) {
      await user.destroy();
      return res.status(200).json({
        msg: "Delete user success",
      });
    }
  } catch (e) {
    return res.status(500).json({
      msg: "Error from the server",
    });
  }
};

module.exports = {
  registrationController,
  loginController,
  resetPasswordController,
  updateProfileController,
  getAllUser,

  getAllUserById,
  deleteUser,
};
