const { Sequelize, DataTypes } = require("sequelize");
const { connection } = require("./connectDatabase");

const RatingModel = connection.define(
  "Rating",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = RatingModel;
