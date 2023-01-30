const { v4: uuidv4 } = require("uuid");
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
module.exports = {
  createCategories,
  getAllCategories,
};
