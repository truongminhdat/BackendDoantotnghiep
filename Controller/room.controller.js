const sequelize = require("sequelize");
const RoomModel = require("../models/room.model");

require("dotenv").config();

const createRoomController = async (req, res) => {
  try {
    let { name, title, image, convenient, price, roomTypeId } = req.body;
    if (!name || !title || !image || !convenient) {
      return res.status(404).json({
        msg: "No enter value",
      });
    }
    await RoomModel.create({
      name: name,
      title: title,
      image: image,
      convenient: convenient,
      price: price,
      roomTypeId: roomTypeId,
    });

    return res.status(200).json({
      msg: "Create Room Success",
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error from the server",
    });
  }
};

module.exports = { createRoomController };
