const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    default: "",
  },
  avatarImage: {
    type: String,
    default: "",
  },
  nickname: {
    type: String,
    default: "",
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  groupInvitations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }] 
});

module.exports = mongoose.model("User", userSchema);
