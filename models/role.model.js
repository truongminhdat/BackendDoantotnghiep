const { Sequelize, DataTypes } = require("sequelize");
const { connection } = require("./connectDatabase");

const Role = connection.define(
  "Role",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Role;
