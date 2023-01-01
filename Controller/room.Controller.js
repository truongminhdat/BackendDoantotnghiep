const RoomModel = require("../models/room.model");

const { v4: uuidv4 } = require("uuid");

var path = require("path");
const fs = require("fs");

let createRoom = async (req, res) => {
  const { title, price, adult, children, numberRoom, aceages } = req.body;
  const { file } = req.files;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];
  if (!allowedType.includes(ext.toLowerCase())) {
    return res.status(422).json({
      msg: "Invalid Images",
    });
  }
  if (fileSize > 5000000) {
    return res.status(422).json({
      msg: "Image must be lest than 5MB",
    });
  }
  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err)
      return res.status(500).json({
        msg: "Not image ",
      });
    try {
      if (!title || !price || !adult || !children || !aceages) {
        return res.status(200).json({ msg: "Please insert values" });
      } else {
        await RoomModel.create({
          id: uuidv4(),
          title,
          price,
          numberRoom,
          adult,
          children,
          photos: fileName,
          url: url,
          aceages,
        });
        return res.status(200).json({
          msg: "Create room successfully",
        });
      }
    } catch (error) {
      res.status(500).json({ msg: "create user error", error });
    }
  });
};
const getAllRoom = async (req, res) => {
  try {
    const rooms = await RoomModel.findAll();
    return res.json(rooms);
  } catch (error) {
    return res.status(500).json({ msg: "error getting all rooms" });
    console.log(error);
  }
};

const deleteRoom = async (req, res) => {
  const roomId = req.query.id;
  try {
    await RoomModel.destroy({ where: { id: roomId } });
    return res.status(200).json({ msg: "Room deleted successfully" });
  } catch (error) {
    error;
  }
};

const updateRoom = async (req, res) => {
  const room = await RoomModel.findOne({
    where: {
      id: req.query.id,
    },
  });
  if (!room) {
    return res.status(404).json({
      msg: "No Data Found!",
    });
  }
  let fileName = "";
  if (req.files === null) {
    fileName = RoomModel.photos;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];
    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({
        msg: "Invalid Images",
      });
    }
    if (fileSize > 5000000) {
      return res.status(422).json({
        msg: "Image must be lest than 5MB",
      });
    }
    const filepath = `./public/images/${room.photos}`;
    fs.unlinkSync(filepath);
    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) {
        return res.status(500).json({
          msg: err.message,
        });
      }
    });
  }
  const { title, price, adult, children, numberRoom, aceages } = req.body;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  room.title = title;
  room.price = price;
  room.adult = adult;
  room.children = children;
  room.numberRoom = numberRoom;
  room.aceages = aceages;
  room.photos = fileName;
  room.url = url;
  await room.save();
  return res.status(200).json({
    msg: "Update Room Success!",
  });
};

const getRoomById = async (req, res) => {
  try {
    let { id } = req.query;
    let response = await RoomModel.findOne({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      response,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error from the server",
    });
  }
};

module.exports = {
  createRoom,
  getAllRoom,
  deleteRoom,
  updateRoom,
  getRoomById,
};
