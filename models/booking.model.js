const { Sequelize, DataTypes } = require("sequelize");
const { connection } = require("./connectDatabase");

const bookingModel = connection.define(
  "Booking",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    checkInDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    checkOutDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = bookingModel;
