const RoomModel = require("../models/room.model");
const { v4: uuidv4 } = require("uuid");

let createRoom = async (req, res) => {
  try {
    let { title, price, maxPeople, desc, roomNumber, hotelId } = req.body;
    if (!title || !price || !maxPeople || !desc || !roomNumber || !hotelId) {
      return res.status(404).json({
        msg: "You have not entered the value",
      });
    } else {
      await RoomModel.create({
        id: uuidv4(),
        title,
        price,
        maxPeople,
        desc,
        roomNumber,
        hotelId,
      });
      return res.status(200).json({
        msg: "Create userfull success full",
      });
    }
  } catch (e) {
    return res.status(500).json({
      msg: "error from the server",
    });
  }
};
module.exports = {
  createRoom,
};
