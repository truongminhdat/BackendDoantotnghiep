const md5 = require("md5");
const { v4: uuidv4 } = require("uuid");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const { UUIDV4, UUID } = require("sequelize");
const bcrypt = require("bcrypt");
const RoomModel = require("../models/room.model");
const saltRounds = 10;
require("dotenv").config();
var path = require("path");
const RoleModel = require("../models/role.model");
const { Op } = require("sequelize");

const registrationController = async (req, res) => {
  // try {
  const {
    username,
    firstName,
    lastName,
    email,
    address,
    phoneNumber,
    selectedDate,
    gender,
    password,
  } = req.body;
  const hash = bcrypt.hashSync(password, saltRounds);
  const { file } = req.files;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];
  if (!allowedType.includes(ext.toLowerCase())) {
    return res.status(422).json({
      msg: "Invalid Images",
    });
  }
  if (fileSize > 5000000) {
    return res.status(422).json({
      msg: "Image must be lest than 5MB",
    });
  }
  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err)
      return res.status(500).json({
        msg: "Not image ",
      });
    try {
      await UserModel.create({
        id: uuidv4(),
        username,
        firstName,
        lastName,
        password: hash,
        email,
        address,
        phoneNumber,
        dayOfBirth: selectedDate,
        gender,
        roleId: "8c7f9543-78a4-4522-a74b-fa25daf230d8",
        avatar: fileName,
        url: url,
      });
      return res.status(200).json({
        msg: "create user success",
      });
    } catch (e) {
      return res.status(404).json({
        msg: "User is not error",
      });
    }
  });
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

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
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
    const user = await UserModel.findByPk({
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
      firstname,
      lastname,
      email,
      address,
      phonenumber,
      gender,
      avatar,
    } = req.body;
    if (user) {
      (user.username = username),
        (user.firstName = firstname),
        (user.lastName = lastname),
        (user.email = email),
        (user.address = address),
        (user.phoneNumber = phonenumber),
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
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const offset = limit * page;
  const search = req.query.search;
  const totalRows = await UserModel.count({
    where: {
      [Op.or]: [
        {
          username: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          email: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });
  const totalPage = Math.ceil(totalRows / limit);
  let getAllUser = await UserModel.findAll({
    where: {
      [Op.or]: [
        {
          username: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          email: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          gender: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
    include: [
      {
        model: RoleModel,
        as: "role",
        attributes: ["name"],
      },
    ],
    raw: true,
    nest: true,
    offset: offset,
    limit: limit,
    order: [["id", "DESC"]],
  });
  console.log("check user hello word", getAllUser);
  return res.status(200).json({
    msg: "get all user",
    getAllUser,
    page,
    limit,
    totalRows,
    totalPage,
  });
  // } catch (e) {
  //   return res.status(500).json({
  //     msg: "Error from the server",
  //   });
  // }
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
    const userId = req.params.id;
    await UserModel.destroy({ where: { id: userId } });
    return res.status(200).json({
      msg: "Delete user success",
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error from the server",
    });
  }
};

const createUser = async (req, res) => {
  const {
    username,
    firstname,
    lastname,
    email,
    address,
    phonenumber,
    dayofbirth,
    gender,
    role,
  } = req.body;
  const hash = bcrypt.hashSync(password, saltRounds);
  const { file } = req.files;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];
  if (!allowedType.includes(ext.toLowerCase())) {
    return res.status(422).json({
      msg: "Invalid Images",
    });
  }
  if (fileSize > 5000000) {
    return res.status(422).json({
      msg: "Image must be lest than 5MB",
    });
  }
  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err)
      return res.status(500).json({
        msg: "Not image ",
      });
    try {
      if (
        !username ||
        !firstname ||
        !lastname ||
        !email ||
        !address ||
        !phonenumber ||
        !dayofbirth ||
        !gender ||
        !role ||
        !avatar
      ) {
        return res.status(200).json({ msg: "Please insert values" });
      } else {
        await UserModel.create({
          id: uuidv4(),
          username,
          firstName: firstname,
          lastName: lastname,
          email,
          address,
          phoneNumber: phonenumber,
          dayOfBirth: dayofbirth,
          gender,
          role,
          avatar,
          url: url,
        });
        return res.status(200).json({
          msg: "create user success",
        });
      }
    } catch (error) {
      res.status(500).json({ msg: "create user error", error });
    }
  });
};
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.email = decoded.email;
      next();
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error from server",
    });
  }
};
const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      msg: "No token",
    });
  }
  const checktoken = jwt.verify(refreshToken, process.env.JWT_SECRET);
  const user = await UserModel.findAll({
    where: {
      id: checktoken.id,
    },
  });
  if (!user) {
    return res.status(404).json({
      msg: "User refresh token is error",
    });
  }
  const userId = user.id;
  const userName = user.username;
  const email = user.email;
  const accessToken = jwt.sign(
    { userId, userName, email },
    process.env.JWT_SECRET,
    {
      expiresIn: "15s",
    }
  );
  return res.status(200).json({
    accessToken,
  });
};
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: ["id", "username", "email"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};
const Authcontroller = (req, res) => {
  return res.json(req.user);
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      msg: "Please provide a vilid email!",
    });
  }
  const user = await UserModel.findOne({
    email,
  });
  if (!user) {
    return res.status(404).json({
      msg: "User not found, invalid request",
    });
  } else {
    await sendEmail({
      email,
    });
    return res.status(200).json({
      msg: "Send mail success",
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
  createUser,
  verifyToken,
  refreshToken,
  getUsers,
  Authcontroller,
  forgotPassword,
};
