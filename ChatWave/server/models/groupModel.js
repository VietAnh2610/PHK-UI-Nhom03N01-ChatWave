const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
  },
  description: {
    type: String,
    maxlength: 255,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  avatarImage: {
    type: String,
    default: "",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Group", groupSchema);
