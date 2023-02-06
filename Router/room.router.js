const express = require("express");
const roomRouter = express.Router();
const {
  createRoom,
  getAllRoom,
  getAllRoomById,
  updateRoom,
} = require("../Controller/rooms/room.controller");

roomRouter.post("/createRoom", createRoom);
roomRouter.get("/getAllRoom", getAllRoom);
roomRouter.get("/getRoomById", getAllRoomById);
roomRouter.patch("/updateRoom", updateRoom);
// roomRouter.get("/getroom", getAllRoom);
// roomRouter.delete("/deleteroom", deleteRoom);
// roomRouter.put("/updateroom", updateRoom);
// roomRouter.get("/getRoomById", getRoomById);

module.exports = roomRouter;
