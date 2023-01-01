const express = require("express");
const roomRouter = express.Router();
const {
  createRoom,
  getAllRoom,
  deleteRoom,
  updateRoom,
  getRoomById,
} = require("../Controller/room.Controller");

roomRouter.post("/createRoom", createRoom);
roomRouter.get("/getroom", getAllRoom);
roomRouter.delete("/deleteroom", deleteRoom);
roomRouter.put("/updateroom", updateRoom);
roomRouter.get("/getRoomById", getRoomById);

module.exports = roomRouter;
