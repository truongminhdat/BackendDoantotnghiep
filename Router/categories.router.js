const express = require("express");
const {
  createCategories,
  getAllCategories,
} = require("../Controller/categories/categories.controller");
const categoriesRouter = express.Router();

categoriesRouter.post("/createCategories", createCategories);
categoriesRouter.get("/getAllCategories", getAllCategories);

module.exports = categoriesRouter;
