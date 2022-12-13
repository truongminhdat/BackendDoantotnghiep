const roomTypeModel = require("../models/room_type.model");

let createRoomType = async (req, res) => {
  try {
    let { name } = req.body;
    if (!name) {
      return res.status(404).json({
        msg: "No value entered",
      });
    }
    await roomTypeModel.create({
      name,
    });
    return res.status(200).json({
      msg: "Successfully added room type",
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error from the server",
    });
  }
};
let getAllRoomTypeController = async (req, res) => {
  try {
    let getAllRoomType = await roomTypeModel.findAll();
    return res.status(200).json({
      msg: "get All Room Type",
      getAllRoomType,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error from the server",
    });
  }
};
module.exports = {
  createRoomType,
  getAllRoomTypeController,
};
