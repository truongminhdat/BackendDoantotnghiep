const { connection } = require("./connectDatabase");

const { Sequelize, DataTypes } = require("sequelize");
const RoomModel = require("../models/room.model");
const HotelModel = require("../models/hotel.model");
const BookingModel = require("../models/booking.model");
const UserModel = require("./user.model");

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
  RoomModel.hasMany(BookingModel, {
    foreignKey: {
      name: "roomId",
      type: DataTypes.STRING,
    },
  });
  BookingModel.belongsTo(RoomModel, {
    foreignKey: {
      name: "roomId",
      type: DataTypes.STRING,
    },
  });
  UserModel.hasMany(BookingModel, {
    foreignKey: {
      name: "userId",
      type: DataTypes.STRING,
    },
  });
  BookingModel.belongsTo(UserModel, {
    foreignKey: {
      name: "userId",
      type: DataTypes.STRING,
    },
  });

  connection.sync();
};

module.exports = setAssociation;
