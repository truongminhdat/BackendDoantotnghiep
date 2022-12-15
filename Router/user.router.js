const express = require("express");

const { createUser } = require("../Controller/User.controllers");

const userRouter = express.Router();

userRouter.post("/createUser", createUser);
module.exports = userRouter;
