const { Sequelize, DataTypes } = require("sequelize");

const { connection } = require("../config/connectDatabase");

const TransactionModel = connection.define(
  "Transaction",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payment_info: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    security: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = TransactionModel;
