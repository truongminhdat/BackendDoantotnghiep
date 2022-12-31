const express = require("express");
const roomRouter = express.Router();
const {
  createRoom,
  getAllRoom,
  deleteRoom,
  updateRoom,
} = require("../Controller/room.Controller");

roomRouter.post("/createRoom", createRoom);
roomRouter.get("/getroom", getAllRoom);
roomRouter.delete("/deleteroom", deleteRoom);
roomRouter.put("/updateroom",updateRoom)

module.exports = roomRouter;
