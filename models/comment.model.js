const { Sequelize, DataTypes } = require("sequelize");
const { connection } = require("./connectDatabase");

const commentModel = connection.define(
  "Comment",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = commentModel;
