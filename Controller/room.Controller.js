const RoomModel = require("../models/room.model");
const { Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { request } = require("express");

let createRoom = async (req, res) => {
  const { title, price, maxPeople, desc, roomNumber } = req.body;
  try {
    if ({ title, price, maxPeople, desc, roomNumber } === null) {
      return res.status(400).json({
        error: "Please fill all the fields",
      });
    } else {
      await RoomModel.create({
        id: uuidv4(),
        title,
        price,
        maxPeople,
        desc,
        roomNumber,
      });
      res.status(200).json({ msg: "Room created successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: "server error", error });
  }
};

const getAllRoom = async (req, res) => {
  try {
    const rooms = await RoomModel.findAll({
      attributes: ["id", "title", "price", "roomNumber", "desc", "maxPeople"],
    });
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
  try {
    const room = await RoomModel.findOne({ where: { id: req.query.id } });
    console.log(room);
    const { title, price, maxPeople, desc, roomNumber } = req.body;
    if (room) {
      (room.title = title),
        (room.price = price),
        (room.maxPeople = maxPeople),
        (room.desc = desc),
        (room.roomNumber = roomNumber),
        await room.save();
      return res.status(200).json({ msg: "Room updated successfully" });
    }
    return res.status(404).json({ msg: "Room not found" });
  } catch (error) {
    return res.status(error);
  }
};

module.exports = {
  createRoom,
  getAllRoom,
  deleteRoom,
  updateRoom,
};
