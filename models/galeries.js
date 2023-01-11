const { Sequelize, DataTypes } = require("sequelize");
const { connection } = require("./connectDatabase");

const GaleryModel = connection.define(
  "galeries",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = GaleryModel;
