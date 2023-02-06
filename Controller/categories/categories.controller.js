const { v4: uuidv4 } = require("uuid");
const { Sequelize } = require("sequelize");
const CategoriesModel = require("../../models/categories");

const createCategories = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(404).json({
        msg: "You not enter data",
      });
    }
    await CategoriesModel.create({
      id: uuidv4(),
      name,
    });
    return res.status(200).json({
      msg: "Create Categories success!",
    });
  } catch (e) {
    return res.status(500).json({
      msg: " Error from the server",
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    let getAllCategories = await CategoriesModel.findAll();
    return res.status(200).json({
      msg: "Get All Categories",
      getAllCategories,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error from the server",
    });
  }
};

const editCategories = async (req, res) => {
  try {
    const category = await CategoriesModel.findOne({
      where: { id: req.query.id },
    });
    const { name } = req.body;
    if (category) {
      (category.name = name), await category.save();
      return res.status(200).json({ msg: "Categories updated successfully" });
    }
    return res.status(400).json({ msg: "Categories not found" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.query.id;
    await CategoriesModel.destroy({ where: { id: id } });
    return res.status(200).json({ msg: "Delete successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  createCategories,
  getAllCategories,
  editCategories,
  deleteCategory,
};
