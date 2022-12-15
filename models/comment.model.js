const { Sequelize, DataTypes } = require("sequelize");
const { connection } = require("./connectDatabase");

const commentModel = connection.define(
  "Comment",
  {
    id: {
      allowNull: false,

      primaryKey: true,
      type: DataTypes.STRING,
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
