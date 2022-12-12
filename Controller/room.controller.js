const sequelize = require("sequelize");
const RatingModel = require("../models/rating.model");
const RoomModel = require("../models/room.model");
const RoomTypeModel = require("../models/room_type.model");
const UserModel = require("../models/user.model");
require("dotenv").config();

const createRoomController = async (req, res) => {
  const { name, title, status, image, convenient } = req.body;
  try {
    await RoomModel.create({
      name: name,
      title: title,
      status: status,
      image: image,
      convenient: convenient,
    });
    res.status(200).json({ msg: "Successfully create room" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const createRoomTypeController = async (req, res) => {
  const { name, price } = req.body;
  try {
    await RoomTypeModel.create({
      name: name,
      price: price,
    });
    res.status(200).json({ msg: "Successfully create room type" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};


module.exports = { createRoomController, createRoomTypeController };
