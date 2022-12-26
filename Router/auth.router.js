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
  Authcontroller,
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
authRouter.post("/sendPassword", sendpasswordlink);
authRouter.get("/auth", validateToken, Authcontroller);
module.exports = authRouter;
