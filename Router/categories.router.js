const express = require("express");
const {
  createCategories,
  getAllCategories,
  editCategories,
  deleteCategory
} = require("../Controller/categories/categories.controller");
const categoriesRouter = express.Router();

categoriesRouter.post("/createCategories", createCategories);
categoriesRouter.get("/getAllCategories", getAllCategories);
categoriesRouter.put("/editCategory",editCategories)
categoriesRouter.delete("/deleteCategory",deleteCategory)

module.exports = categoriesRouter;
