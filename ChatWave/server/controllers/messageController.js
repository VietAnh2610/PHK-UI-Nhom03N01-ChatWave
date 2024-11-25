const mongoose = require("mongoose");
const Messages = require("../models/messageModel");
const upload = require('../upload'); // Import Multer middleware

// Lấy tin nhắn giữa 2 người
module.exports.getMessages = async (req, res) => {
  try {
    const { from, to } = req.query;
    console.log("Query parameters:", { from, to });

    // Kiểm tra giá trị của from và to có hợp lệ hay không
    if (!mongoose.Types.ObjectId.isValid(from) || !mongoose.Types.ObjectId.isValid(to)) {
      return res.status(400).json({ message: "Invalid 'from' or 'to' ObjectId" });
    }

    const messages = await Messages.find({
      $or: [
        { from, to },
        { from: to, to: from }
      ]
    }).sort({ createdAt: 1 });

    console.log("Messages found:", messages);
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.from.toString() === from,
        message: msg.message,
      };
    });

    res.json(projectedMessages);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ message: "Error retrieving messages", error });
  }
};

// Thêm tin nhắn
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, text, media } = req.body; // Thêm trường media
    const data = await Messages.create({
      message: { text: text, media: media }, // Cập nhật thêm trường media
      from: from,
      to: to,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    console.error("Error adding message:", ex);
    next(ex);
  }
};

// Upload file media
module.exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Không có file nào được tải lên." });
    }

    // Đường dẫn đến file đã tải lên
    const fileUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({ fileUrl: fileUrl });
  } catch (error) {
    console.error("Error uploading media:", error);
    res.status(500).json({ message: "Error uploading media", error });
  }
};
