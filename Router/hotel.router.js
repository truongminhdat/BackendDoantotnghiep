const express = require("express");
const {
  createHotelController,
  updateHotelController,

  getAllHotelController,
  deleteHotelController,
} = require("../Controller/hotel.controller");

const hotelRouter = express.Router();

hotelRouter.post("/createHotel", createHotelController);
hotelRouter.put("/updateHotel", updateHotelController);
hotelRouter.get("/getAllHotel", getAllHotelController);
hotelRouter.delete("/deleteHotel", deleteHotelController);
module.exports = hotelRouter;
