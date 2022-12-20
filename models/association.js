const { connection } = require("./connectDatabase");

const { Sequelize, DataTypes } = require("sequelize");
const RoomModel = require("../models/room.model");
const HotelModel = require("../models/hotel.model");

const setAssociation = () => {
  HotelModel.hasMany(RoomModel, {
    foreignKey: {
      name: "hotelId",
      type: DataTypes.STRING,
    },
  });
  RoomModel.belongsTo(HotelModel, {
    foreignKey: {
      name: "hotelId",
      type: DataTypes.STRING,
    },
  });
  connection.sync();
};

module.exports = setAssociation;
