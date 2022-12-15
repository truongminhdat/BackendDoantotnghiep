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
      type: DataTypes.STRING,
    },
  });
  UserModel.belongsTo(RoleModel, {
    foreignKey: {
      name: "roleId",
      type: DataTypes.STRING,
    },
  });
  RoomTypeModel.hasOne(RoomModel, {
    foreignKey: {
      name: "roomTypeId",
      type: DataTypes.STRING,
    },
  });
  RoomModel.belongsTo(RoomTypeModel, {
    foreignKey: {
      name: "roomTypeId",
      type: DataTypes.STRING,
    },
  });
  RoomModel.hasMany(RatingModel, {
    foreignKey: {
      name: "roomId",
      type: DataTypes.STRING,
    },
  });
  RatingModel.belongsTo(RoomModel, {
    foreignKey: {
      name: "roomId",
      type: DataTypes.STRING,
    },
  });
  UserModel.hasMany(RatingModel, {
    foreignKey: {
      name: "userId",
      type: DataTypes.STRING,
    },
  });
  RatingModel.belongsTo(UserModel, {
    foreignKey: {
      name: "userId",
      type: DataTypes.STRING,
    },
  });
  RoomModel.hasMany(CommentModel, {
    foreignKey: {
      name: "roomId",
      type: DataTypes.STRING,
    },
  });
  CommentModel.belongsTo(RoomModel, {
    foreignKey: {
      name: "roomId",
      type: DataTypes.STRING,
    },
  });
  UserModel.hasMany(CommentModel, {
    foreignKey: {
      name: "userId",
      type: DataTypes.STRING,
    },
  });
  CommentModel.belongsTo(UserModel, {
    foreignKey: {
      name: "userId",
      type: DataTypes.STRING,
    },
  });
  UserModel.hasMany(TransactionModel, {
    foreignKey: {
      name: "userId",
      type: DataTypes.STRING,
    },
  });
  TransactionModel.belongsTo(UserModel, {
    foreignKey: {
      name: "userId",
      type: DataTypes.STRING,
    },
  });
  RoomModel.hasMany(TransactionModel, {
    foreignKey: {
      name: "roomId",
      type: DataTypes.STRING,
    },
  });
  TransactionModel.belongsTo(RoomModel, {
    foreignKey: {
      name: "roomId",
      type: DataTypes.STRING,
    },
  });
  TransactionModel.hasMany(BookingModel, {
    foreignKey: {
      name: "transactionId",
      type: DataTypes.STRING,
    },
  });
  BookingModel.belongsTo(TransactionModel, {
    foreignKey: {
      name: "transactionId",
      type: DataTypes.STRING,
    },
  });

  connection.sync({ force: true });
};

module.exports = setAssociation;
