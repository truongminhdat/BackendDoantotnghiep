const express = require("express");
const {
  postRoleController,
  getAllRoleController,
  updateRoleController,
} = require("../Controller/role.controller");

const roleRouter = express.Router();
roleRouter.post("/postRole", postRoleController);
roleRouter.get("/getAllRole", getAllRoleController);
roleRouter.put("/putUpdateRole", updateRoleController);
module.exports = {
  roleRouter,
};
