const express = require("express");
const roomRouter = express.Router();
const { createRoom } = require("../Controller/rooms/room.controller");

roomRouter.post("/createRoom", createRoom);
// roomRouter.get("/getroom", getAllRoom);
// roomRouter.delete("/deleteroom", deleteRoom);
// roomRouter.put("/updateroom", updateRoom);
// roomRouter.get("/getRoomById", getRoomById);

module.exports = roomRouter;
