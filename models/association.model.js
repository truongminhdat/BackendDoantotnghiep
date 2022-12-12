const { connection } = require("./connectDatabase");
const UserModel = require("./user.model");
const RoleModel = require("./role.model");
const RoomModel = require("./room.model");
const Room_TypeModel = require("./room_type.model");
const RatingModel = require("./rating.model");
const CommentModel = require("./comment.model");
const BookingModel = require("./booking.model");
const { Sequelize, DataTypes } = require("sequelize");

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
      type: DataTypes.STRING,
    },
  });
  RatingModel.belongsTo(UserModel, {
    foreignKey: {
      name: "user_id",
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
    },
  });
  CommentModel.belongsTo(UserModel, {
    foreignKey: {
      name: "user_id",
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
    },
  });
  BookingModel.belongsTo(UserModel, {
    foreignKey: {
      name: "user_id",
      type: DataTypes.STRING,
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
