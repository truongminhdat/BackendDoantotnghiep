const { connection } = require("./connectDatabase");

const { Sequelize, DataTypes } = require("sequelize");
const RoomModel = require("../models/room.model");

const setAssociation = () => {
  connection.sync();
};

module.exports = setAssociation;
