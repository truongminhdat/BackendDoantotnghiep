const { Sequelize, DataTypes } = require("sequelize");
const { connection } = require("./connectDatabase");

const RatingModel = connection.define(
  "Rating",
  {
    id: {
      allowNull: false,

      primaryKey: true,
      type: DataTypes.STRING,
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
