const express = require("express");
const getAccessTokenController = require("../Controller/accessToken");
const forgotPwdController = require("../Controller/forgotPwd.controller");
const loginController = require("../Controller/login.controller");
const registrationController = require("../Controller/registration.controller");
const {
  updateProfileController,
} = require("../Controller/updateProfile.controller");

const userRouter = express.Router();

userRouter.post("/userupdate", updateProfileController);
userRouter.post("/forgotpassword", forgotPwdController);
module.exports = userRouter;
