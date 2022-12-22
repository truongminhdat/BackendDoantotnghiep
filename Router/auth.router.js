const express = require("express");

const {
  registrationController,
  loginController,
  resetPasswordController,
  updateProfileController,
  getAllUser,
  getAllUserById,
  deleteUser,
} = require("../Controller/User.controllers");
const authRouter = express.Router();

authRouter.post("/signup", registrationController);
authRouter.post("/login", loginController);
authRouter.post("/resetPassword", resetPasswordController);
authRouter.put("/updateProfile", updateProfileController);
authRouter.get("/getAllUser", getAllUser);
authRouter.get("/getUserById", getAllUserById);
authRouter.delete("/deleteuser:id", deleteUser);
module.exports = authRouter;
