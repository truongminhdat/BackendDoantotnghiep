const {Sequelize} = require("sequelize")
const rolesModel = require("../models/role.model");

const isAdmin = async (req, res, next) => {
  const {name} = req.query
  const roles = await rolesModel.findOne({where:{name:name}})
  console.log(roles);

  if (name === "admin") {
    next();
    return;
  }
  return res.status(403).json({ msg: "Only allowed Admin" });
};

const isUser = async (req, res, next) => {
  const {name} = req.query
  const roles = await rolesModel.findOne({where:{name:name}})
  console.log(roles);
  if (name === "user") {
    next();
    return;
  }
  return res.status(403).json({ msg: "You're not Admin or Staff" });
};

const isStaff = async (req, res, next) => {
  const {name} = req.query
  const roles = await rolesModel.findOne({where:{name:name}})
  console.log(roles);
  if (name === "staff") {
    next();
    return;
  }
  return res.status(403).json({ msg: "You're staff" });
};

module.exports = {
  isAdmin,
  isUser,
  isStaff
};
