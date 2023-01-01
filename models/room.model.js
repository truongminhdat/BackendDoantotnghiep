const { Sequelize, DataTypes } = require("sequelize");
const { connection } = require("./connectDatabase");

const RoomModel = connection.define(
  "Room",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: true,
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
      allowNull: true,
    },
    adult: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    children: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numberRoom: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    acreages: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = RoomModel;
