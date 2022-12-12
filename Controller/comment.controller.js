const commentModel = require("../models/comment.model");

const commentController = async (req, res) => {
  const { content } = req.body;

  try {
    await commentModel.create({
      content: content,
    });
    res.status(200).json({ msg: "User has commented: ", content });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = commentController;
