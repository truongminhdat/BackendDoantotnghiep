const express = require("express");
const { createUser, getAllUser } = require("../Controller/User.controllers");

const userRouter = express.Router();

userRouter.post("/createuser", createUser);

module.exports = userRouter;
