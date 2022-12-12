const { Sequelize, DataTypes } = require("sequelize");
const { connection } = require("./connectDatabase");

const Role = connection.define(
  "Role",
  {
    username: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Role;
