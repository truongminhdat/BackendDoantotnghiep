const { Sequelize, DataTypes } = require("sequelize");
const { connection } = require("./connectDatabase");

const bookingModel = connection.define(
  "Booking",
  {
    id: {
      allowNull: false,

      primaryKey: true,
      type: DataTypes.STRING,
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
