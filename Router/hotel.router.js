const express = require("express");
const {
  createHotelController,
  updateHotelController,

  getAllHotelController,
  deleteHotelController,
  countByType,
  getLimitHotel,
  getDestinationHotel,
} = require("../Controller/hotel.controller");

const hotelRouter = express.Router();

hotelRouter.post("/createHotel", createHotelController);
hotelRouter.put("/updateHotel", updateHotelController);
hotelRouter.get("/getAllHotel", getAllHotelController);
hotelRouter.delete("/deleteHotel", deleteHotelController);
hotelRouter.get("/countHotel", countByType);
hotelRouter.get("/getlimithotel", getLimitHotel);
hotelRouter.get("/getcityHotel", getDestinationHotel);
module.exports = hotelRouter;
