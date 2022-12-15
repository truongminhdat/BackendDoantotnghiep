const { Sequelize, DataTypes } = require("sequelize");

const { connection } = require("./connectDatabase");

const roomTypeModel = connection.define(
  "RoomType",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = roomTypeModel;
