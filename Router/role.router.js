const express = require("express");

const { postRoleController } = require("../Controller/role.controller");

const roleRouter = express.Router();

roleRouter.post("/createRole", postRoleController);

module.exports = { roleRouter };
