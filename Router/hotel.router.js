const express = require("express");
const {
  createHotelController,
  updateHotelController,

  getAllHotelController,
  deleteHotelController,
  countByType,
} = require("../Controller/hotel.controller");

const hotelRouter = express.Router();

hotelRouter.post("/createHotel", createHotelController);
hotelRouter.put("/updateHotel", updateHotelController);
hotelRouter.get("/getAllHotel", getAllHotelController);
hotelRouter.delete("/deleteHotel", deleteHotelController);
hotelRouter.get("/countHotel", countByType);
module.exports = hotelRouter;
