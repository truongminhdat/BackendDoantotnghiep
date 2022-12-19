const express = require("express");
const HotelModel = require("../models/hotel.model");
const { v4: uuidv4 } = require("uuid");
const e = require("express");

let createHotelController = async (req, res) => {
  try {
    let { name, type, city, address, distance, title, desc, cheaperPrice } =
      req.body;
    let createHotel = await HotelModel.create({
      id: uuidv4(),
      name,
      type,
      city,
      address,
      distance,
      title,
      desc,
      cheaperPrice,
    });
    return res.status(200).json({
      msg: "Create success full",
      createHotel,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error from server",
    });
  }
};
let updateHotelController = async (req, res) => {
  try {
    let { id } = req.query;
    let { name, type, city, address, distance, title, desc, cheaperPrice } =
      req.body;
    let hotel = await HotelModel.findOne({
      where: {
        id: id,
      },
    });

    if (hotel) {
      (hotel.name = name),
        (hotel.type = type),
        (hotel.city = city),
        (hotel.address = address),
        (hotel.distance = distance),
        (hotel.title = title),
        (hotel.desc = desc),
        (hotel.cheaperPrice = cheaperPrice),
        await hotel.save();
      return res.status(200).json({
        msg: "Update hotels success",
      });
    } else {
      return res.status(404).json({
        msg: "Update hotels ",
      });
    }
  } catch (e) {
    return res.status(500).json({
      msg: "Error from the server",
    });
  }
};
let getAllHotelController = async (req, res) => {
  try {
    let hotels = await HotelModel.findAll();
    return res.status(200).json({
      msg: "Get All Hotel Success",
      hotels,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error from the server",
    });
  }
};
let deleteHotelController = async (req, res) => {
  let { hotelId } = req.query;
  let hotel = await HotelModel.findOne({
    where: {
      id: hotelId,
    },
  });
  console.log("check delete hotel", hotel);
  if (hotel) {
    await hotel.destroy();
    return res.status(200).json({
      msg: "Delete hotel success!",
    });
  } else {
    return res.status(404).json({
      msg: "Delete hotel error!",
    });
  }
};
module.exports = {
  createHotelController,
  updateHotelController,
  getAllHotelController,
  deleteHotelController,
};
