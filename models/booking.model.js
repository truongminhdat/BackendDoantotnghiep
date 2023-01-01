const { Sequelize, DataTypes } = require("sequelize");
const { connection } = require("./connectDatabase");

const BookingModel = connection.define(
  "bookings",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    checkInDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    checkOutDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = BookingModel;
