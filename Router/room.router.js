const express = require("express");
const roomRouter = express.Router();
const { createRoom } = require("../Controller/room.Controller");

roomRouter.post("/createRoom", createRoom);

module.exports = roomRouter;
