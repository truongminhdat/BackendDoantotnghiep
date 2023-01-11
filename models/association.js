const { connection } = require("./connectDatabase");

const { Sequelize, DataTypes } = require("sequelize");
const RoomModel = require("../models/room.model");
const GaleryModel = require("../models/galeries");
const RoleModel = require("../models/role.model");
const OrderModel = require("../models/order");
const OrderDetail = require("../models/orderDetail");
const CategoryModel = require("../models/categories");
const UserModel = require("../models/user.model");

const setAssociation = () => {
  RoleModel.hasMany(UserModel, {
    foreignKey: {
      name: "roleId",
      type: DataTypes.STRING,
    },
  });
  UserModel.belongsTo(RoleModel, {
    foreignKey: {
      name: "roleId",
      type: DataTypes.STRING,
    },
  });
  CategoryModel.hasMany(RoomModel, {
    foreignKey: {
      name: "categoryId",
      type: DataTypes.STRING,
    },
  });
  RoomModel.belongsTo(CategoryModel, {
    foreignKey: {
      name: "categoryId",
      type: DataTypes.STRING,
    },
  });
  RoomModel.hasMany(GaleryModel, {
    foreignKey: {
      name: "roomId",
      type: DataTypes.STRING,
    },
  });
  GaleryModel.belongsTo(RoomModel, {
    foreignKey: {
      name: "roomId",
      type: DataTypes.STRING,
    },
  });
  UserModel.hasMany(OrderModel, {
    foreignKey: {
      name: "userId",
      type: DataTypes.STRING,
    },
  });
  OrderModel.belongsTo(UserModel, {
    foreignKey: {
      name: "userId",
      type: DataTypes.STRING,
    },
  });
  OrderModel.hasOne(OrderDetail, {
    foreignKey: {
      name: "orderId",
      type: DataTypes.STRING,
    },
  });
  OrderDetail.belongsTo(OrderModel, {
    foreignKey: {
      name: "orderId",
      type: DataTypes.STRING,
    },
  });
  connection.sync();
  // connection.sync();
};

module.exports = setAssociation;
