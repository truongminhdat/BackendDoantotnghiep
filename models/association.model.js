const { connection } = require("../config/connectDatabase");
const UserModel = require("./user");
const RoleModel = require("./role");
const RoomModel = require("./room");
const Room_TypeModel = require("./room_type");
const RatingModel = require("./rating");
const CommentModel = require("./comment");
const BookingModel = require("./booking");
const { DataTypes } = require("sequelize");

const setAssociation = () => {
  const option = {
    foreignKey: {
      name: "roleId",
      type: DataTypes.INTEGER,
    },
  };
  UserModel.belongsTo(RoleModel, option);
  RoleModel.hasOne(UserModel, option);

  Room_TypeModel.hasOne(RoomModel, {
    foreignKey: { name: "room_typeId", type: DataTypes.INTEGER },
  });
  RoomModel.belongsTo(Room_TypeModel, {
    foreignKey: { name: "room_typeId", type: DataTypes.INTEGER },
  });

  UserModel.hasMany(RatingModel, {
    foreignKey: {
      name: "user_id",
      type: DataTypes.INTEGER,
    },
  });
  RatingModel.belongsTo(UserModel, {
    foreignKey: {
      name: "user_id",
      type: DataTypes.INTEGER,
    },
  });
  RoomModel.hasMany(RatingModel, {
    foreignKey: {
      name: "room_id",
      type: DataTypes.INTEGER,
    },
  });
  RatingModel.belongsTo(RoomModel, {
    foreignKey: {
      name: "room_id",
      type: DataTypes.INTEGER,
    },
  });
  UserModel.hasMany(CommentModel, {
    foreignKey: {
      name: "user_id",
      type: DataTypes.INTEGER,
    },
  });
  CommentModel.belongsTo(UserModel, {
    foreignKey: {
      name: "user_id",
      type: DataTypes.INTEGER,
    },
  });
  RoomModel.hasMany(CommentModel, {
    foreignKey: {
      name: "room_id",
      type: DataTypes.INTEGER,
    },
  });
  CommentModel.belongsTo(RoomModel, {
    foreignKey: {
      name: "room_id",
      type: DataTypes.INTEGER,
    },
  });
  UserModel.hasMany(BookingModel, {
    foreignKey: {
      name: "user_id",
      type: DataTypes.INTEGER,
    },
  });
  BookingModel.belongsTo(UserModel, {
    foreignKey: {
      name: "user_id",
      type: DataTypes.INTEGER,
    },
  });
  RoomModel.hasOne(BookingModel, {
    foreignKey: {
      name: "room_id",
      type: DataTypes.INTEGER,
    },
  });
  BookingModel.belongsTo(RoomModel, {
    foreignKey: {
      name: "room_id",
      type: DataTypes.INTEGER,
    },
  });

  connection.sync();
};

module.exports = setAssociation;
