const express = require("express");
const {
  createRoomType,
  getAllRoomTypeController,
} = require("../Controller/roomType.controller");
const roomTypeRouter = express.Router();
roomTypeRouter.post("/createRoomType", createRoomType);
roomTypeRouter.get("/getAllRoomType", getAllRoomTypeController);

module.exports = roomTypeRouter;
