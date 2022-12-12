const { Sequelize, DataTypes } = require("sequelize");

const { connection } = require("./connectDatabase");

const roomTypeModel = connection.define(
  "RoomType",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
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
