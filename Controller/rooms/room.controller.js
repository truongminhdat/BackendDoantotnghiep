const RoomModel = require("../../models/room.model");
const { v4: uuidv4 } = require("uuid");
var path = require("path");
const { Op, where } = require("sequelize");
const CategoryModel = require("../../models/categories");
const fs = require("fs");

const createRoom = async (req, res) => {
  // try {
  const { title, price, discount, desc, categoryId } = req.body;

  const { file } = req.files;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];
  if (!allowedType.includes(ext.toLowerCase())) {
    return res.status(422).json({
      msg: "Invalid Images",
    });
  }
  if (fileSize > 5000000) {
    return res.status(422).json({
      msg: "Image must be lest than 5MB",
    });
  }
  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err)
      return res.status(500).json({
        msg: "Not image ",
      });
    try {
      await RoomModel.create({
        id: uuidv4(),
        title,
        price,
        discount,
        desc,
        categoryId,
        photos: fileName,
        url: url,
      });
      return res.status(200).json({
        msg: "create room success",
      });
    } catch (e) {
      return res.status(404).json({
        msg: "Room is not error",
      });
    }
  });
};
const getAllRoom = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const offset = limit * page;
  const search = req.query.search;
  const totalRows = await RoomModel.count({
    where: {
      [Op.or]: [
        {
          price: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });
  const totalPage = Math.ceil(totalRows / limit);
  let getAllRoom = await RoomModel.findAll({
    where: {
      [Op.or]: [
        {
          price: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
    include: [
      {
        model: CategoryModel,
        as: "category",
        attributes: ["name"],
      },
    ],
    raw: true,
    nest: true,
    offset: offset,
    limit: limit,
    order: [["id", "DESC"]],
  });
  return res.status(200).json({
    msg: "get all room",
    getAllRoom,
    page,
    limit,
    totalRows,
    totalPage,
  });
};

const getAllRoomById = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await RoomModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: CategoryModel,
          as: "category",
          attributes: ["name"],
        },
      ],
      raw: true,
      nest: true,
    });
    return res.json(response);
  } catch (error) {
    return res.status(500).json({
      msg: "Error from the server",
    });
  }
};
const updateRoom = async (req, res) => {
  const room = await RoomModel.findOne({
    where: {
      id: req.query.id,
    },
    raw: true,
  });

  if (!room) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = room.photos;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${room.photos}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const { title, price, discount, desc, categoryId } = req.body;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await RoomModel.update(
      {
        title: title,
        price: price,
        discount: discount,
        desc: desc,
        categoryId: categoryId,
        photos: fileName,
        url: url,
      },
      {
        where: {
          id: req.query.id,
        },
      }
    );
    res.status(200).json({ msg: "Product Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
const deleteRoom = async (req, res) => {
  const product = await RoomModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!product) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./public/images/${product.photos}`;
    fs.unlinkSync(filepath);
    await RoomModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Product Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createRoom,
  getAllRoom,
  updateRoom,
  getAllRoomById,
  deleteRoom,
};
