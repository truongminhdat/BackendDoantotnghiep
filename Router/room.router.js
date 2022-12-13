const express = require("express");
const roomRouter = express.Router();
const { createRoomController } = require("../Controller/room.controller");
roomRouter.post("/createRoom", createRoomController);
module.exports = roomRouter;
