const express = require("express");
const roomRouter = express.Router();
const {
  createRoomController,
  getAllRoomController,
} = require("../Controller/room.controller");
roomRouter.post("/createRoom", createRoomController);
roomRouter.get("/getAllRoom", getAllRoomController);
module.exports = roomRouter;
