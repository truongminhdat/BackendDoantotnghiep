const { connection } = require("./connectDatabase");
const UserModel = require("./user.model");
const RoleModel = require("./role.model");
const RoomModel = require("./room.model");
const RoomTypeModel = require("./room_type.model");
const RatingModel = require("./rating.model");
const CommentModel = require("./comment.model");
const BookingModel = require("./booking.model");
const TransactionModel = require("./transaction.model");
const { Sequelize, DataTypes } = require("sequelize");

const setAssociation = () => {
  RoleModel.hasOne(UserModel, {
    foreignKey: {
      name: "roleId",
      type: DataTypes.INTEGER,
    },
  });
  UserModel.belongsTo(RoleModel, {
    foreignKey: {
      name: "roleId",
      type: DataTypes.INTEGER,
    },
  });
  RoomTypeModel.hasOne(RoomModel, {
    foreignKey: {
      name: "roomTypeId",
      type: DataTypes.INTEGER,
    },
  });
  RoomModel.belongsTo(RoomTypeModel, {
    foreignKey: {
      name: "roomTypeId",
      type: DataTypes.INTEGER,
    },
  });
  RoomModel.hasMany(RatingModel, {
    foreignKey: {
      name: "roomId",
      type: DataTypes.INTEGER,
    },
  });
  RatingModel.belongsTo(RoomModel, {
    foreignKey: {
      name: "roomId",
      type: DataTypes.INTEGER,
    },
  });
  UserModel.hasMany(RatingModel, {
    foreignKey: {
      name: "userId",
      type: DataTypes.INTEGER,
    },
  });
  RatingModel.belongsTo(UserModel, {
    foreignKey: {
      name: "userId",
      type: DataTypes.INTEGER,
    },
  });
  RoomModel.hasMany(CommentModel, {
    foreignKey: {
      name: "roomId",
      type: DataTypes.INTEGER,
    },
  });
  CommentModel.belongsTo(RoomModel, {
    foreignKey: {
      name: "roomId",
      type: DataTypes.INTEGER,
    },
  });
  UserModel.hasMany(CommentModel, {
    foreignKey: {
      name: "userId",
      type: DataTypes.INTEGER,
    },
  });
  CommentModel.belongsTo(UserModel, {
    foreignKey: {
      name: "userId",
      type: DataTypes.INTEGER,
    },
  });
  UserModel.hasMany(TransactionModel, {
    foreignKey: {
      name: "userId",
      type: DataTypes.INTEGER,
    },
  });
  TransactionModel.belongsTo(UserModel, {
    foreignKey: {
      name: "userId",
      type: DataTypes.INTEGER,
    },
  });
  RoomModel.hasMany(TransactionModel, {
    foreignKey: {
      name: "roomId",
      type: DataTypes.INTEGER,
    },
  });
  TransactionModel.belongsTo(RoomModel, {
    foreignKey: {
      name: "roomId",
      type: DataTypes.INTEGER,
    },
  });
  TransactionModel.hasMany(BookingModel, {
    foreignKey: {
      name: "transactionId",
      type: DataTypes.INTEGER,
    },
  });
  BookingModel.belongsTo(TransactionModel, {
    foreignKey: {
      name: "transactionId",
      type: DataTypes.INTEGER,
    },
  });

  connection.sync({ force: true });
};

module.exports = setAssociation;
