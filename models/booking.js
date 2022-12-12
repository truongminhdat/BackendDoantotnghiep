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
    amount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qty: {
      type: DataTypes.STRING,
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

module.exports = bookingModel;
