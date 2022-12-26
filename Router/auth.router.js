const express = require("express");
const { sendpasswordlink } = require("../Controller/resetpassword");

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
  verifyToken,
} = require("../Controller/User.controllers");
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
authRouter.post("/sendPassword", sendpasswordlink);
module.exports = authRouter;
