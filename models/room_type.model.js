const { Sequelize, DataTypes } = require("sequelize");
const { connection } = require("./connectDatabase");

const RoomTypeModel = connection.define(
  "Room_Type",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
      },
      allowNull: true,
    },
    price: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
      },
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = RoomTypeModel;
