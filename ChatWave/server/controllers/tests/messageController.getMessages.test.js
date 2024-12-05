const request = require("supertest");
const express = require("express");
const messageRouter = require("../../routes/messages"); // Đảm bảo đường dẫn đúng
const mongoose = require("mongoose");
const Messages = require("../../models/messageModel"); // Đảm bảo import Messages từ đúng model

const app = express();
app.use(express.json());
app.use("/api/messages", messageRouter); // Đảm bảo đúng route

describe("Message Controller - getMessages", () => {
  it("should return error if 'from' or 'to' are invalid ObjectIds", async () => {
    const res = await request(app)
      .get("/api/messages/getmsg") // Đảm bảo đúng URL
      .query({ from: "invalidId", to: "invalidId" });

    expect(res.status).toBe(400); // Kiểm tra mã lỗi là 400
    expect(res.body.message).toBe("Invalid 'from' or 'to' ObjectId");
  });

  it("should return messages between two users", async () => {
    const mockMessages = [
      { from: "user1Id", to: "user2Id", message: "Hello" },
      { from: "user2Id", to: "user1Id", message: "Hi" },
    ];

    // Mock Messages.find() trả về tin nhắn mẫu với phương thức sort()
    mongoose.Types.ObjectId.isValid = jest.fn(() => true); // Giả lập hàm isValid của ObjectId

    // Mock Messages.find() trả về một query object có thể gọi .sort()
    Messages.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockMessages), // Giả lập sort() trả về mockMessages
    });

    const res = await request(app)
      .get("/api/messages/getmsg") // Đảm bảo đúng URL
      .query({ from: "user1Id", to: "user2Id" });

    console.log(res.body); // In ra kết quả trả về để kiểm tra dữ liệu

    expect(res.status).toBe(200); // Kiểm tra mã lỗi là 200
    expect(res.body).toEqual([
      { fromSelf: true, message: "Hello" },
      { fromSelf: false, message: "Hi" },
    ]);
  });

  it("should return empty array if no messages found", async () => {
    // Mock Messages.find() trả về mảng rỗng
    Messages.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue([]), // Giả lập sort() trả về mảng rỗng
    });

    const res = await request(app)
      .get("/api/messages/getmsg") // Đảm bảo đúng URL
      .query({ from: "user1Id", to: "user2Id" });

    expect(res.status).toBe(200); // Kiểm tra mã lỗi là 200
    expect(res.body).toEqual([]); // Trả về mảng rỗng
  });

});
