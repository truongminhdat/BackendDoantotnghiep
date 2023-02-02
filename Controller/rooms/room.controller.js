const RoomModel = require("../../models/room.model");
const path = require("path");
const md5 = require("md5");

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
        msg: "create user success",
      });
    } catch (e) {
      return res.status(404).json({
        msg: "User is not error",
      });
    }
  });
};

module.exports = {
  createRoom,
};
