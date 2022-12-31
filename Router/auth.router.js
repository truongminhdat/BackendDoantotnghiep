const express = require("express");
const { changePassword } = require("../Controller/changePassword");
const { sendpasswordlink } = require("../Controller/email");
const { forgotPasswordController } = require("../Controller/forgotpassword");
const { basicInfoController } = require("../Controller/profileController");

const {
  registrationController,
  loginController,
  resetPasswordController,
  updateProfileController,
  getAllUser,
  getAllUserById,
  deleteUser,
  refreshToken,
  getUsers,
  Authcontroller,
  forgotPassword,
} = require("../Controller/User.controllers");
const { validateToken } = require("../middlewares/AuthMidlewares");
const authRouter = express.Router();

authRouter.post("/signup", registrationController);
authRouter.post("/login", loginController);
authRouter.post("/resetPassword", resetPasswordController);
authRouter.put("/updateProfile", updateProfileController);
authRouter.get("/getAllUser", getAllUser);
authRouter.get("/getUserById", getAllUserById);
authRouter.delete("/deleteuser:id", deleteUser);
authRouter.get("/token", refreshToken);
authRouter.get("/getUser", getUsers);
authRouter.post("/sendPassword", forgotPasswordController);
authRouter.get("/auth", validateToken, Authcontroller);
authRouter.put("/changePassword", validateToken, changePassword);
authRouter.get("/basicInfo", basicInfoController);
module.exports = authRouter;
