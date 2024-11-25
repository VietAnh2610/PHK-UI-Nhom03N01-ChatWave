const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
      media: { type: String, default: "" } 
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent"
    }
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
