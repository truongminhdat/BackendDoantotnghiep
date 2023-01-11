const { Sequelize, DataTypes } = require("sequelize");
const { connection } = require("./connectDatabase");

const RoomModel = connection.define(
  "rooms",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    photos: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.STRING,
    },
    maxPeople: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    desc: {
      type: DataTypes.STRING,
    },
    roomNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = RoomModel;
