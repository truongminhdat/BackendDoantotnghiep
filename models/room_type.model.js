const { Sequelize, DataTypes } = require("sequelize");

const { connection } = require("../config/connectDatabase");

const Room_Type = connection.define(
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
      allowNull: true,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Room_Type;
